-- Create tables for ForSeenIt

-- 1. Movies Table
create table if not exists movies (
  id uuid default gen_random_uuid() primary key,
  tmdb_id int unique not null,
  title text not null,
  release_year int,
  poster_path text,
  backdrop_path text,
  runtime int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Collections Table (Curated, User, Editorial)
create table if not exists collections (
  id uuid default gen_random_uuid() primary key,
  slug text unique, -- Nullable for user collections
  title text not null,
  description text,
  type text check (type in ('suggested', 'awards', 'editorial', 'user')) not null,
  user_id uuid references auth.users(id) on delete cascade, -- Nullable for system collections
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Collection Items (Join Table)
create table if not exists collection_items (
  collection_id uuid references collections(id) on delete cascade not null,
  movie_id uuid references movies(id) on delete cascade not null,
  rank int not null default 0,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(collection_id, movie_id)
);

-- 4. User Profiles
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  region text default 'US',
  preferred_services jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table movies enable row level security;
alter table collections enable row level security;
alter table collection_items enable row level security;
alter table profiles enable row level security;

-- Policies

-- Movies: Everyone can read, Service Role writes (or authenticated if we auto-add movies)
-- Let's allow authenticated users to insert movies (e.g. when adding to watchlist if not exists)
create policy "Movies are public"
  on movies for select
  using ( true );

create policy "Authenticated users can insert movies"
  on movies for insert
  to authenticated
  with check ( true );

-- Collections: 
-- Read: Public if system type, or Owner if user type
create policy "Public collections are viewable by everyone"
  on collections for select
  using ( type in ('suggested', 'awards', 'editorial') );

create policy "Users can view own collections"
  on collections for select
  using ( auth.uid() = user_id );

-- Write: Users can CRUD their own collections
create policy "Users can insert own collections"
  on collections for insert
  to authenticated
  with check ( auth.uid() = user_id );

create policy "Users can update own collections"
  on collections for update
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can delete own collections"
  on collections for delete
  to authenticated
  using ( auth.uid() = user_id );

-- Collection Items:
-- Read: If you can see the collection, you can see the items
create policy "Collection items are viewable if collection is viewable"
  on collection_items for select
  using (
    exists (
      select 1 from collections
      where collections.id = collection_items.collection_id
      and (collections.type in ('suggested', 'awards', 'editorial') or collections.user_id = auth.uid())
    )
  );

-- Write: If you own the collection, you can add/remove items
create policy "Users can insert items to own collections"
  on collection_items for insert
  to authenticated
  with check (
    exists (
      select 1 from collections
      where collections.id = collection_items.collection_id
      and collections.user_id = auth.uid()
    )
  );

create policy "Users can delete items from own collections"
  on collection_items for delete
  to authenticated
  using (
    exists (
      select 1 from collections
      where collections.id = collection_items.collection_id
      and collections.user_id = auth.uid()
    )
  );

-- Profiles: Public read, owner update
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can insert own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Triggers for User Profile Creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  
  -- Optionally create a default "Watchlist" for the user
  insert into public.collections (title, type, user_id)
  values ('Watchlist', 'user', new.id);
  
  return new;
end;
$$;

-- Drop trigger if exists to avoid duplication errors on re-run
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
