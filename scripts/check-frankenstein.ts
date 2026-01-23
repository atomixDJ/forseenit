
const TMDB_API_KEY = "37a7f47493df530ff04257125345695a"; // I'll use the one from .env if I can, but I'll hardcode for a second or just read it.

async function check(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(`ID: ${id}`);
    console.log(`Title: ${data.title}`);
    console.log(`Release: ${data.release_date}`);
    console.log(`Overview: ${data.overview}`);
    console.log('---');
}

async function main() {
    await check(1062722);
    await check(1550678);
    await check(1561850);
}

main();
