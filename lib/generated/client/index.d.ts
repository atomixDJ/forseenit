
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model WatchlistMovie
 * 
 */
export type WatchlistMovie = $Result.DefaultSelection<Prisma.$WatchlistMoviePayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>
/**
 * Model Ballot
 * 
 */
export type Ballot = $Result.DefaultSelection<Prisma.$BallotPayload>
/**
 * Model AwardEvent
 * 
 */
export type AwardEvent = $Result.DefaultSelection<Prisma.$AwardEventPayload>
/**
 * Model AwardSeason
 * 
 */
export type AwardSeason = $Result.DefaultSelection<Prisma.$AwardSeasonPayload>
/**
 * Model Movie
 * 
 */
export type Movie = $Result.DefaultSelection<Prisma.$MoviePayload>
/**
 * Model AwardWinner
 * 
 */
export type AwardWinner = $Result.DefaultSelection<Prisma.$AwardWinnerPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs>;

  /**
   * `prisma.watchlistMovie`: Exposes CRUD operations for the **WatchlistMovie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchlistMovies
    * const watchlistMovies = await prisma.watchlistMovie.findMany()
    * ```
    */
  get watchlistMovie(): Prisma.WatchlistMovieDelegate<ExtArgs>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs>;

  /**
   * `prisma.ballot`: Exposes CRUD operations for the **Ballot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ballots
    * const ballots = await prisma.ballot.findMany()
    * ```
    */
  get ballot(): Prisma.BallotDelegate<ExtArgs>;

  /**
   * `prisma.awardEvent`: Exposes CRUD operations for the **AwardEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardEvents
    * const awardEvents = await prisma.awardEvent.findMany()
    * ```
    */
  get awardEvent(): Prisma.AwardEventDelegate<ExtArgs>;

  /**
   * `prisma.awardSeason`: Exposes CRUD operations for the **AwardSeason** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardSeasons
    * const awardSeasons = await prisma.awardSeason.findMany()
    * ```
    */
  get awardSeason(): Prisma.AwardSeasonDelegate<ExtArgs>;

  /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<ExtArgs>;

  /**
   * `prisma.awardWinner`: Exposes CRUD operations for the **AwardWinner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AwardWinners
    * const awardWinners = await prisma.awardWinner.findMany()
    * ```
    */
  get awardWinner(): Prisma.AwardWinnerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.0.0
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    WatchlistMovie: 'WatchlistMovie',
    Rating: 'Rating',
    Ballot: 'Ballot',
    AwardEvent: 'AwardEvent',
    AwardSeason: 'AwardSeason',
    Movie: 'Movie',
    AwardWinner: 'AwardWinner'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "watchlistMovie" | "rating" | "ballot" | "awardEvent" | "awardSeason" | "movie" | "awardWinner"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      WatchlistMovie: {
        payload: Prisma.$WatchlistMoviePayload<ExtArgs>
        fields: Prisma.WatchlistMovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchlistMovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchlistMovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          findFirst: {
            args: Prisma.WatchlistMovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchlistMovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          findMany: {
            args: Prisma.WatchlistMovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>[]
          }
          create: {
            args: Prisma.WatchlistMovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          createMany: {
            args: Prisma.WatchlistMovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchlistMovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>[]
          }
          delete: {
            args: Prisma.WatchlistMovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          update: {
            args: Prisma.WatchlistMovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          deleteMany: {
            args: Prisma.WatchlistMovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchlistMovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WatchlistMovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistMoviePayload>
          }
          aggregate: {
            args: Prisma.WatchlistMovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchlistMovie>
          }
          groupBy: {
            args: Prisma.WatchlistMovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchlistMovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchlistMovieCountArgs<ExtArgs>
            result: $Utils.Optional<WatchlistMovieCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
          }
        }
      }
      Ballot: {
        payload: Prisma.$BallotPayload<ExtArgs>
        fields: Prisma.BallotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BallotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BallotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          findFirst: {
            args: Prisma.BallotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BallotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          findMany: {
            args: Prisma.BallotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>[]
          }
          create: {
            args: Prisma.BallotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          createMany: {
            args: Prisma.BallotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BallotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>[]
          }
          delete: {
            args: Prisma.BallotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          update: {
            args: Prisma.BallotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          deleteMany: {
            args: Prisma.BallotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BallotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BallotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BallotPayload>
          }
          aggregate: {
            args: Prisma.BallotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBallot>
          }
          groupBy: {
            args: Prisma.BallotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BallotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BallotCountArgs<ExtArgs>
            result: $Utils.Optional<BallotCountAggregateOutputType> | number
          }
        }
      }
      AwardEvent: {
        payload: Prisma.$AwardEventPayload<ExtArgs>
        fields: Prisma.AwardEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AwardEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AwardEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          findFirst: {
            args: Prisma.AwardEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AwardEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          findMany: {
            args: Prisma.AwardEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>[]
          }
          create: {
            args: Prisma.AwardEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          createMany: {
            args: Prisma.AwardEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AwardEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>[]
          }
          delete: {
            args: Prisma.AwardEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          update: {
            args: Prisma.AwardEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          deleteMany: {
            args: Prisma.AwardEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AwardEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AwardEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardEventPayload>
          }
          aggregate: {
            args: Prisma.AwardEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAwardEvent>
          }
          groupBy: {
            args: Prisma.AwardEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AwardEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AwardEventCountArgs<ExtArgs>
            result: $Utils.Optional<AwardEventCountAggregateOutputType> | number
          }
        }
      }
      AwardSeason: {
        payload: Prisma.$AwardSeasonPayload<ExtArgs>
        fields: Prisma.AwardSeasonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AwardSeasonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AwardSeasonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          findFirst: {
            args: Prisma.AwardSeasonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AwardSeasonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          findMany: {
            args: Prisma.AwardSeasonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>[]
          }
          create: {
            args: Prisma.AwardSeasonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          createMany: {
            args: Prisma.AwardSeasonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AwardSeasonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>[]
          }
          delete: {
            args: Prisma.AwardSeasonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          update: {
            args: Prisma.AwardSeasonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          deleteMany: {
            args: Prisma.AwardSeasonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AwardSeasonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AwardSeasonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardSeasonPayload>
          }
          aggregate: {
            args: Prisma.AwardSeasonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAwardSeason>
          }
          groupBy: {
            args: Prisma.AwardSeasonGroupByArgs<ExtArgs>
            result: $Utils.Optional<AwardSeasonGroupByOutputType>[]
          }
          count: {
            args: Prisma.AwardSeasonCountArgs<ExtArgs>
            result: $Utils.Optional<AwardSeasonCountAggregateOutputType> | number
          }
        }
      }
      Movie: {
        payload: Prisma.$MoviePayload<ExtArgs>
        fields: Prisma.MovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findFirst: {
            args: Prisma.MovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findMany: {
            args: Prisma.MovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          create: {
            args: Prisma.MovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          createMany: {
            args: Prisma.MovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          delete: {
            args: Prisma.MovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          update: {
            args: Prisma.MovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          deleteMany: {
            args: Prisma.MovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          aggregate: {
            args: Prisma.MovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovie>
          }
          groupBy: {
            args: Prisma.MovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieCountArgs<ExtArgs>
            result: $Utils.Optional<MovieCountAggregateOutputType> | number
          }
        }
      }
      AwardWinner: {
        payload: Prisma.$AwardWinnerPayload<ExtArgs>
        fields: Prisma.AwardWinnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AwardWinnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AwardWinnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          findFirst: {
            args: Prisma.AwardWinnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AwardWinnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          findMany: {
            args: Prisma.AwardWinnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>[]
          }
          create: {
            args: Prisma.AwardWinnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          createMany: {
            args: Prisma.AwardWinnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AwardWinnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>[]
          }
          delete: {
            args: Prisma.AwardWinnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          update: {
            args: Prisma.AwardWinnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          deleteMany: {
            args: Prisma.AwardWinnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AwardWinnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AwardWinnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AwardWinnerPayload>
          }
          aggregate: {
            args: Prisma.AwardWinnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAwardWinner>
          }
          groupBy: {
            args: Prisma.AwardWinnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AwardWinnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AwardWinnerCountArgs<ExtArgs>
            result: $Utils.Optional<AwardWinnerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    watchlist: number
    ratings: number
    ballots: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    watchlist?: boolean | UserCountOutputTypeCountWatchlistArgs
    ratings?: boolean | UserCountOutputTypeCountRatingsArgs
    ballots?: boolean | UserCountOutputTypeCountBallotsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistMovieWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBallotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BallotWhereInput
  }


  /**
   * Count Type AwardEventCountOutputType
   */

  export type AwardEventCountOutputType = {
    seasons: number
  }

  export type AwardEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seasons?: boolean | AwardEventCountOutputTypeCountSeasonsArgs
  }

  // Custom InputTypes
  /**
   * AwardEventCountOutputType without action
   */
  export type AwardEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEventCountOutputType
     */
    select?: AwardEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AwardEventCountOutputType without action
   */
  export type AwardEventCountOutputTypeCountSeasonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardSeasonWhereInput
  }


  /**
   * Count Type AwardSeasonCountOutputType
   */

  export type AwardSeasonCountOutputType = {
    winners: number
  }

  export type AwardSeasonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winners?: boolean | AwardSeasonCountOutputTypeCountWinnersArgs
  }

  // Custom InputTypes
  /**
   * AwardSeasonCountOutputType without action
   */
  export type AwardSeasonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeasonCountOutputType
     */
    select?: AwardSeasonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AwardSeasonCountOutputType without action
   */
  export type AwardSeasonCountOutputTypeCountWinnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardWinnerWhereInput
  }


  /**
   * Count Type MovieCountOutputType
   */

  export type MovieCountOutputType = {
    winners: number
  }

  export type MovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winners?: boolean | MovieCountOutputTypeCountWinnersArgs
  }

  // Custom InputTypes
  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieCountOutputType
     */
    select?: MovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountWinnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardWinnerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    ballots?: boolean | User$ballotsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    ballots?: boolean | User$ballotsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      watchlist: Prisma.$WatchlistMoviePayload<ExtArgs>[]
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      ballots: Prisma.$BallotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    watchlist<T extends User$watchlistArgs<ExtArgs> = {}>(args?: Subset<T, User$watchlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findMany"> | Null>
    ratings<T extends User$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany"> | Null>
    ballots<T extends User$ballotsArgs<ExtArgs> = {}>(args?: Subset<T, User$ballotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.watchlist
   */
  export type User$watchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    where?: WatchlistMovieWhereInput
    orderBy?: WatchlistMovieOrderByWithRelationInput | WatchlistMovieOrderByWithRelationInput[]
    cursor?: WatchlistMovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistMovieScalarFieldEnum | WatchlistMovieScalarFieldEnum[]
  }

  /**
   * User.ratings
   */
  export type User$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User.ballots
   */
  export type User$ballotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    where?: BallotWhereInput
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    cursor?: BallotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({ 
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */ 
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
  }


  /**
   * Model WatchlistMovie
   */

  export type AggregateWatchlistMovie = {
    _count: WatchlistMovieCountAggregateOutputType | null
    _avg: WatchlistMovieAvgAggregateOutputType | null
    _sum: WatchlistMovieSumAggregateOutputType | null
    _min: WatchlistMovieMinAggregateOutputType | null
    _max: WatchlistMovieMaxAggregateOutputType | null
  }

  export type WatchlistMovieAvgAggregateOutputType = {
    movieId: number | null
  }

  export type WatchlistMovieSumAggregateOutputType = {
    movieId: number | null
  }

  export type WatchlistMovieMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    title: string | null
    posterPath: string | null
    backdropPath: string | null
    addedAt: Date | null
  }

  export type WatchlistMovieMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    title: string | null
    posterPath: string | null
    backdropPath: string | null
    addedAt: Date | null
  }

  export type WatchlistMovieCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    title: number
    posterPath: number
    backdropPath: number
    addedAt: number
    _all: number
  }


  export type WatchlistMovieAvgAggregateInputType = {
    movieId?: true
  }

  export type WatchlistMovieSumAggregateInputType = {
    movieId?: true
  }

  export type WatchlistMovieMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    title?: true
    posterPath?: true
    backdropPath?: true
    addedAt?: true
  }

  export type WatchlistMovieMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    title?: true
    posterPath?: true
    backdropPath?: true
    addedAt?: true
  }

  export type WatchlistMovieCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    title?: true
    posterPath?: true
    backdropPath?: true
    addedAt?: true
    _all?: true
  }

  export type WatchlistMovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchlistMovie to aggregate.
     */
    where?: WatchlistMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistMovies to fetch.
     */
    orderBy?: WatchlistMovieOrderByWithRelationInput | WatchlistMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchlistMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchlistMovies
    **/
    _count?: true | WatchlistMovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchlistMovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchlistMovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchlistMovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchlistMovieMaxAggregateInputType
  }

  export type GetWatchlistMovieAggregateType<T extends WatchlistMovieAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchlistMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlistMovie[P]>
      : GetScalarType<T[P], AggregateWatchlistMovie[P]>
  }




  export type WatchlistMovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistMovieWhereInput
    orderBy?: WatchlistMovieOrderByWithAggregationInput | WatchlistMovieOrderByWithAggregationInput[]
    by: WatchlistMovieScalarFieldEnum[] | WatchlistMovieScalarFieldEnum
    having?: WatchlistMovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchlistMovieCountAggregateInputType | true
    _avg?: WatchlistMovieAvgAggregateInputType
    _sum?: WatchlistMovieSumAggregateInputType
    _min?: WatchlistMovieMinAggregateInputType
    _max?: WatchlistMovieMaxAggregateInputType
  }

  export type WatchlistMovieGroupByOutputType = {
    id: string
    userId: string
    movieId: number
    title: string
    posterPath: string | null
    backdropPath: string | null
    addedAt: Date
    _count: WatchlistMovieCountAggregateOutputType | null
    _avg: WatchlistMovieAvgAggregateOutputType | null
    _sum: WatchlistMovieSumAggregateOutputType | null
    _min: WatchlistMovieMinAggregateOutputType | null
    _max: WatchlistMovieMaxAggregateOutputType | null
  }

  type GetWatchlistMovieGroupByPayload<T extends WatchlistMovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchlistMovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchlistMovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistMovieGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistMovieGroupByOutputType[P]>
        }
      >
    >


  export type WatchlistMovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    title?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    addedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlistMovie"]>

  export type WatchlistMovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    title?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    addedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlistMovie"]>

  export type WatchlistMovieSelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    title?: boolean
    posterPath?: boolean
    backdropPath?: boolean
    addedAt?: boolean
  }

  export type WatchlistMovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchlistMovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WatchlistMoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchlistMovie"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: number
      title: string
      posterPath: string | null
      backdropPath: string | null
      addedAt: Date
    }, ExtArgs["result"]["watchlistMovie"]>
    composites: {}
  }

  type WatchlistMovieGetPayload<S extends boolean | null | undefined | WatchlistMovieDefaultArgs> = $Result.GetResult<Prisma.$WatchlistMoviePayload, S>

  type WatchlistMovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WatchlistMovieFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WatchlistMovieCountAggregateInputType | true
    }

  export interface WatchlistMovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchlistMovie'], meta: { name: 'WatchlistMovie' } }
    /**
     * Find zero or one WatchlistMovie that matches the filter.
     * @param {WatchlistMovieFindUniqueArgs} args - Arguments to find a WatchlistMovie
     * @example
     * // Get one WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistMovieFindUniqueArgs>(args: SelectSubset<T, WatchlistMovieFindUniqueArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WatchlistMovie that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WatchlistMovieFindUniqueOrThrowArgs} args - Arguments to find a WatchlistMovie
     * @example
     * // Get one WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistMovieFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchlistMovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WatchlistMovie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieFindFirstArgs} args - Arguments to find a WatchlistMovie
     * @example
     * // Get one WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistMovieFindFirstArgs>(args?: SelectSubset<T, WatchlistMovieFindFirstArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WatchlistMovie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieFindFirstOrThrowArgs} args - Arguments to find a WatchlistMovie
     * @example
     * // Get one WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistMovieFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchlistMovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WatchlistMovies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchlistMovies
     * const watchlistMovies = await prisma.watchlistMovie.findMany()
     * 
     * // Get first 10 WatchlistMovies
     * const watchlistMovies = await prisma.watchlistMovie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchlistMovieWithIdOnly = await prisma.watchlistMovie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchlistMovieFindManyArgs>(args?: SelectSubset<T, WatchlistMovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WatchlistMovie.
     * @param {WatchlistMovieCreateArgs} args - Arguments to create a WatchlistMovie.
     * @example
     * // Create one WatchlistMovie
     * const WatchlistMovie = await prisma.watchlistMovie.create({
     *   data: {
     *     // ... data to create a WatchlistMovie
     *   }
     * })
     * 
     */
    create<T extends WatchlistMovieCreateArgs>(args: SelectSubset<T, WatchlistMovieCreateArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WatchlistMovies.
     * @param {WatchlistMovieCreateManyArgs} args - Arguments to create many WatchlistMovies.
     * @example
     * // Create many WatchlistMovies
     * const watchlistMovie = await prisma.watchlistMovie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchlistMovieCreateManyArgs>(args?: SelectSubset<T, WatchlistMovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchlistMovies and returns the data saved in the database.
     * @param {WatchlistMovieCreateManyAndReturnArgs} args - Arguments to create many WatchlistMovies.
     * @example
     * // Create many WatchlistMovies
     * const watchlistMovie = await prisma.watchlistMovie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchlistMovies and only return the `id`
     * const watchlistMovieWithIdOnly = await prisma.watchlistMovie.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchlistMovieCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchlistMovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WatchlistMovie.
     * @param {WatchlistMovieDeleteArgs} args - Arguments to delete one WatchlistMovie.
     * @example
     * // Delete one WatchlistMovie
     * const WatchlistMovie = await prisma.watchlistMovie.delete({
     *   where: {
     *     // ... filter to delete one WatchlistMovie
     *   }
     * })
     * 
     */
    delete<T extends WatchlistMovieDeleteArgs>(args: SelectSubset<T, WatchlistMovieDeleteArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WatchlistMovie.
     * @param {WatchlistMovieUpdateArgs} args - Arguments to update one WatchlistMovie.
     * @example
     * // Update one WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchlistMovieUpdateArgs>(args: SelectSubset<T, WatchlistMovieUpdateArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WatchlistMovies.
     * @param {WatchlistMovieDeleteManyArgs} args - Arguments to filter WatchlistMovies to delete.
     * @example
     * // Delete a few WatchlistMovies
     * const { count } = await prisma.watchlistMovie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchlistMovieDeleteManyArgs>(args?: SelectSubset<T, WatchlistMovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchlistMovies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchlistMovies
     * const watchlistMovie = await prisma.watchlistMovie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchlistMovieUpdateManyArgs>(args: SelectSubset<T, WatchlistMovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WatchlistMovie.
     * @param {WatchlistMovieUpsertArgs} args - Arguments to update or create a WatchlistMovie.
     * @example
     * // Update or create a WatchlistMovie
     * const watchlistMovie = await prisma.watchlistMovie.upsert({
     *   create: {
     *     // ... data to create a WatchlistMovie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchlistMovie we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistMovieUpsertArgs>(args: SelectSubset<T, WatchlistMovieUpsertArgs<ExtArgs>>): Prisma__WatchlistMovieClient<$Result.GetResult<Prisma.$WatchlistMoviePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WatchlistMovies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieCountArgs} args - Arguments to filter WatchlistMovies to count.
     * @example
     * // Count the number of WatchlistMovies
     * const count = await prisma.watchlistMovie.count({
     *   where: {
     *     // ... the filter for the WatchlistMovies we want to count
     *   }
     * })
    **/
    count<T extends WatchlistMovieCountArgs>(
      args?: Subset<T, WatchlistMovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistMovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchlistMovie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchlistMovieAggregateArgs>(args: Subset<T, WatchlistMovieAggregateArgs>): Prisma.PrismaPromise<GetWatchlistMovieAggregateType<T>>

    /**
     * Group by WatchlistMovie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistMovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchlistMovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistMovieGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistMovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchlistMovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchlistMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchlistMovie model
   */
  readonly fields: WatchlistMovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchlistMovie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistMovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchlistMovie model
   */ 
  interface WatchlistMovieFieldRefs {
    readonly id: FieldRef<"WatchlistMovie", 'String'>
    readonly userId: FieldRef<"WatchlistMovie", 'String'>
    readonly movieId: FieldRef<"WatchlistMovie", 'Int'>
    readonly title: FieldRef<"WatchlistMovie", 'String'>
    readonly posterPath: FieldRef<"WatchlistMovie", 'String'>
    readonly backdropPath: FieldRef<"WatchlistMovie", 'String'>
    readonly addedAt: FieldRef<"WatchlistMovie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WatchlistMovie findUnique
   */
  export type WatchlistMovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistMovie to fetch.
     */
    where: WatchlistMovieWhereUniqueInput
  }

  /**
   * WatchlistMovie findUniqueOrThrow
   */
  export type WatchlistMovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistMovie to fetch.
     */
    where: WatchlistMovieWhereUniqueInput
  }

  /**
   * WatchlistMovie findFirst
   */
  export type WatchlistMovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistMovie to fetch.
     */
    where?: WatchlistMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistMovies to fetch.
     */
    orderBy?: WatchlistMovieOrderByWithRelationInput | WatchlistMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchlistMovies.
     */
    cursor?: WatchlistMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchlistMovies.
     */
    distinct?: WatchlistMovieScalarFieldEnum | WatchlistMovieScalarFieldEnum[]
  }

  /**
   * WatchlistMovie findFirstOrThrow
   */
  export type WatchlistMovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistMovie to fetch.
     */
    where?: WatchlistMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistMovies to fetch.
     */
    orderBy?: WatchlistMovieOrderByWithRelationInput | WatchlistMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchlistMovies.
     */
    cursor?: WatchlistMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistMovies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchlistMovies.
     */
    distinct?: WatchlistMovieScalarFieldEnum | WatchlistMovieScalarFieldEnum[]
  }

  /**
   * WatchlistMovie findMany
   */
  export type WatchlistMovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter, which WatchlistMovies to fetch.
     */
    where?: WatchlistMovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchlistMovies to fetch.
     */
    orderBy?: WatchlistMovieOrderByWithRelationInput | WatchlistMovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchlistMovies.
     */
    cursor?: WatchlistMovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchlistMovies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchlistMovies.
     */
    skip?: number
    distinct?: WatchlistMovieScalarFieldEnum | WatchlistMovieScalarFieldEnum[]
  }

  /**
   * WatchlistMovie create
   */
  export type WatchlistMovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchlistMovie.
     */
    data: XOR<WatchlistMovieCreateInput, WatchlistMovieUncheckedCreateInput>
  }

  /**
   * WatchlistMovie createMany
   */
  export type WatchlistMovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchlistMovies.
     */
    data: WatchlistMovieCreateManyInput | WatchlistMovieCreateManyInput[]
  }

  /**
   * WatchlistMovie createManyAndReturn
   */
  export type WatchlistMovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WatchlistMovies.
     */
    data: WatchlistMovieCreateManyInput | WatchlistMovieCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchlistMovie update
   */
  export type WatchlistMovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchlistMovie.
     */
    data: XOR<WatchlistMovieUpdateInput, WatchlistMovieUncheckedUpdateInput>
    /**
     * Choose, which WatchlistMovie to update.
     */
    where: WatchlistMovieWhereUniqueInput
  }

  /**
   * WatchlistMovie updateMany
   */
  export type WatchlistMovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchlistMovies.
     */
    data: XOR<WatchlistMovieUpdateManyMutationInput, WatchlistMovieUncheckedUpdateManyInput>
    /**
     * Filter which WatchlistMovies to update
     */
    where?: WatchlistMovieWhereInput
  }

  /**
   * WatchlistMovie upsert
   */
  export type WatchlistMovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchlistMovie to update in case it exists.
     */
    where: WatchlistMovieWhereUniqueInput
    /**
     * In case the WatchlistMovie found by the `where` argument doesn't exist, create a new WatchlistMovie with this data.
     */
    create: XOR<WatchlistMovieCreateInput, WatchlistMovieUncheckedCreateInput>
    /**
     * In case the WatchlistMovie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistMovieUpdateInput, WatchlistMovieUncheckedUpdateInput>
  }

  /**
   * WatchlistMovie delete
   */
  export type WatchlistMovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
    /**
     * Filter which WatchlistMovie to delete.
     */
    where: WatchlistMovieWhereUniqueInput
  }

  /**
   * WatchlistMovie deleteMany
   */
  export type WatchlistMovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchlistMovies to delete
     */
    where?: WatchlistMovieWhereInput
  }

  /**
   * WatchlistMovie without action
   */
  export type WatchlistMovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchlistMovie
     */
    select?: WatchlistMovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistMovieInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    movieId: number | null
    value: number | null
  }

  export type RatingSumAggregateOutputType = {
    movieId: number | null
    value: number | null
  }

  export type RatingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    value: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    value: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    movieId?: true
    value?: true
  }

  export type RatingSumAggregateInputType = {
    movieId?: true
    value?: true
  }

  export type RatingMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatingMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatingCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id: string
    userId: string
    movieId: number
    value: number
    createdAt: Date
    updatedAt: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: number
      value: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratingWithIdOnly = await prisma.rating.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rating model
   */ 
  interface RatingFieldRefs {
    readonly id: FieldRef<"Rating", 'String'>
    readonly userId: FieldRef<"Rating", 'String'>
    readonly movieId: FieldRef<"Rating", 'Int'>
    readonly value: FieldRef<"Rating", 'Float'>
    readonly createdAt: FieldRef<"Rating", 'DateTime'>
    readonly updatedAt: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
  }


  /**
   * Model Ballot
   */

  export type AggregateBallot = {
    _count: BallotCountAggregateOutputType | null
    _avg: BallotAvgAggregateOutputType | null
    _sum: BallotSumAggregateOutputType | null
    _min: BallotMinAggregateOutputType | null
    _max: BallotMaxAggregateOutputType | null
  }

  export type BallotAvgAggregateOutputType = {
    eventYear: number | null
  }

  export type BallotSumAggregateOutputType = {
    eventYear: number | null
  }

  export type BallotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    eventYear: number | null
    category: string | null
    nomineeId: string | null
    nomineeName: string | null
    isWinner: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BallotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    eventYear: number | null
    category: string | null
    nomineeId: string | null
    nomineeName: string | null
    isWinner: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BallotCountAggregateOutputType = {
    id: number
    userId: number
    eventYear: number
    category: number
    nomineeId: number
    nomineeName: number
    isWinner: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BallotAvgAggregateInputType = {
    eventYear?: true
  }

  export type BallotSumAggregateInputType = {
    eventYear?: true
  }

  export type BallotMinAggregateInputType = {
    id?: true
    userId?: true
    eventYear?: true
    category?: true
    nomineeId?: true
    nomineeName?: true
    isWinner?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BallotMaxAggregateInputType = {
    id?: true
    userId?: true
    eventYear?: true
    category?: true
    nomineeId?: true
    nomineeName?: true
    isWinner?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BallotCountAggregateInputType = {
    id?: true
    userId?: true
    eventYear?: true
    category?: true
    nomineeId?: true
    nomineeName?: true
    isWinner?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BallotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ballot to aggregate.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ballots
    **/
    _count?: true | BallotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BallotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BallotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BallotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BallotMaxAggregateInputType
  }

  export type GetBallotAggregateType<T extends BallotAggregateArgs> = {
        [P in keyof T & keyof AggregateBallot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBallot[P]>
      : GetScalarType<T[P], AggregateBallot[P]>
  }




  export type BallotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BallotWhereInput
    orderBy?: BallotOrderByWithAggregationInput | BallotOrderByWithAggregationInput[]
    by: BallotScalarFieldEnum[] | BallotScalarFieldEnum
    having?: BallotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BallotCountAggregateInputType | true
    _avg?: BallotAvgAggregateInputType
    _sum?: BallotSumAggregateInputType
    _min?: BallotMinAggregateInputType
    _max?: BallotMaxAggregateInputType
  }

  export type BallotGroupByOutputType = {
    id: string
    userId: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner: boolean
    createdAt: Date
    updatedAt: Date
    _count: BallotCountAggregateOutputType | null
    _avg: BallotAvgAggregateOutputType | null
    _sum: BallotSumAggregateOutputType | null
    _min: BallotMinAggregateOutputType | null
    _max: BallotMaxAggregateOutputType | null
  }

  type GetBallotGroupByPayload<T extends BallotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BallotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BallotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BallotGroupByOutputType[P]>
            : GetScalarType<T[P], BallotGroupByOutputType[P]>
        }
      >
    >


  export type BallotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventYear?: boolean
    category?: boolean
    nomineeId?: boolean
    nomineeName?: boolean
    isWinner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ballot"]>

  export type BallotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventYear?: boolean
    category?: boolean
    nomineeId?: boolean
    nomineeName?: boolean
    isWinner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ballot"]>

  export type BallotSelectScalar = {
    id?: boolean
    userId?: boolean
    eventYear?: boolean
    category?: boolean
    nomineeId?: boolean
    nomineeName?: boolean
    isWinner?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BallotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BallotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BallotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ballot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      eventYear: number
      category: string
      nomineeId: string
      nomineeName: string
      isWinner: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ballot"]>
    composites: {}
  }

  type BallotGetPayload<S extends boolean | null | undefined | BallotDefaultArgs> = $Result.GetResult<Prisma.$BallotPayload, S>

  type BallotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BallotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BallotCountAggregateInputType | true
    }

  export interface BallotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ballot'], meta: { name: 'Ballot' } }
    /**
     * Find zero or one Ballot that matches the filter.
     * @param {BallotFindUniqueArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BallotFindUniqueArgs>(args: SelectSubset<T, BallotFindUniqueArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Ballot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BallotFindUniqueOrThrowArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BallotFindUniqueOrThrowArgs>(args: SelectSubset<T, BallotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Ballot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindFirstArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BallotFindFirstArgs>(args?: SelectSubset<T, BallotFindFirstArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Ballot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindFirstOrThrowArgs} args - Arguments to find a Ballot
     * @example
     * // Get one Ballot
     * const ballot = await prisma.ballot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BallotFindFirstOrThrowArgs>(args?: SelectSubset<T, BallotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Ballots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ballots
     * const ballots = await prisma.ballot.findMany()
     * 
     * // Get first 10 Ballots
     * const ballots = await prisma.ballot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ballotWithIdOnly = await prisma.ballot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BallotFindManyArgs>(args?: SelectSubset<T, BallotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Ballot.
     * @param {BallotCreateArgs} args - Arguments to create a Ballot.
     * @example
     * // Create one Ballot
     * const Ballot = await prisma.ballot.create({
     *   data: {
     *     // ... data to create a Ballot
     *   }
     * })
     * 
     */
    create<T extends BallotCreateArgs>(args: SelectSubset<T, BallotCreateArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Ballots.
     * @param {BallotCreateManyArgs} args - Arguments to create many Ballots.
     * @example
     * // Create many Ballots
     * const ballot = await prisma.ballot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BallotCreateManyArgs>(args?: SelectSubset<T, BallotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ballots and returns the data saved in the database.
     * @param {BallotCreateManyAndReturnArgs} args - Arguments to create many Ballots.
     * @example
     * // Create many Ballots
     * const ballot = await prisma.ballot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ballots and only return the `id`
     * const ballotWithIdOnly = await prisma.ballot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BallotCreateManyAndReturnArgs>(args?: SelectSubset<T, BallotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Ballot.
     * @param {BallotDeleteArgs} args - Arguments to delete one Ballot.
     * @example
     * // Delete one Ballot
     * const Ballot = await prisma.ballot.delete({
     *   where: {
     *     // ... filter to delete one Ballot
     *   }
     * })
     * 
     */
    delete<T extends BallotDeleteArgs>(args: SelectSubset<T, BallotDeleteArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Ballot.
     * @param {BallotUpdateArgs} args - Arguments to update one Ballot.
     * @example
     * // Update one Ballot
     * const ballot = await prisma.ballot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BallotUpdateArgs>(args: SelectSubset<T, BallotUpdateArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Ballots.
     * @param {BallotDeleteManyArgs} args - Arguments to filter Ballots to delete.
     * @example
     * // Delete a few Ballots
     * const { count } = await prisma.ballot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BallotDeleteManyArgs>(args?: SelectSubset<T, BallotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ballots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ballots
     * const ballot = await prisma.ballot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BallotUpdateManyArgs>(args: SelectSubset<T, BallotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ballot.
     * @param {BallotUpsertArgs} args - Arguments to update or create a Ballot.
     * @example
     * // Update or create a Ballot
     * const ballot = await prisma.ballot.upsert({
     *   create: {
     *     // ... data to create a Ballot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ballot we want to update
     *   }
     * })
     */
    upsert<T extends BallotUpsertArgs>(args: SelectSubset<T, BallotUpsertArgs<ExtArgs>>): Prisma__BallotClient<$Result.GetResult<Prisma.$BallotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Ballots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotCountArgs} args - Arguments to filter Ballots to count.
     * @example
     * // Count the number of Ballots
     * const count = await prisma.ballot.count({
     *   where: {
     *     // ... the filter for the Ballots we want to count
     *   }
     * })
    **/
    count<T extends BallotCountArgs>(
      args?: Subset<T, BallotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BallotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ballot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BallotAggregateArgs>(args: Subset<T, BallotAggregateArgs>): Prisma.PrismaPromise<GetBallotAggregateType<T>>

    /**
     * Group by Ballot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BallotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BallotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BallotGroupByArgs['orderBy'] }
        : { orderBy?: BallotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BallotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBallotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ballot model
   */
  readonly fields: BallotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ballot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BallotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ballot model
   */ 
  interface BallotFieldRefs {
    readonly id: FieldRef<"Ballot", 'String'>
    readonly userId: FieldRef<"Ballot", 'String'>
    readonly eventYear: FieldRef<"Ballot", 'Int'>
    readonly category: FieldRef<"Ballot", 'String'>
    readonly nomineeId: FieldRef<"Ballot", 'String'>
    readonly nomineeName: FieldRef<"Ballot", 'String'>
    readonly isWinner: FieldRef<"Ballot", 'Boolean'>
    readonly createdAt: FieldRef<"Ballot", 'DateTime'>
    readonly updatedAt: FieldRef<"Ballot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ballot findUnique
   */
  export type BallotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot findUniqueOrThrow
   */
  export type BallotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot findFirst
   */
  export type BallotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ballots.
     */
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot findFirstOrThrow
   */
  export type BallotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter, which Ballot to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ballots.
     */
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot findMany
   */
  export type BallotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter, which Ballots to fetch.
     */
    where?: BallotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ballots to fetch.
     */
    orderBy?: BallotOrderByWithRelationInput | BallotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ballots.
     */
    cursor?: BallotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ballots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ballots.
     */
    skip?: number
    distinct?: BallotScalarFieldEnum | BallotScalarFieldEnum[]
  }

  /**
   * Ballot create
   */
  export type BallotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * The data needed to create a Ballot.
     */
    data: XOR<BallotCreateInput, BallotUncheckedCreateInput>
  }

  /**
   * Ballot createMany
   */
  export type BallotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ballots.
     */
    data: BallotCreateManyInput | BallotCreateManyInput[]
  }

  /**
   * Ballot createManyAndReturn
   */
  export type BallotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Ballots.
     */
    data: BallotCreateManyInput | BallotCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ballot update
   */
  export type BallotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * The data needed to update a Ballot.
     */
    data: XOR<BallotUpdateInput, BallotUncheckedUpdateInput>
    /**
     * Choose, which Ballot to update.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot updateMany
   */
  export type BallotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ballots.
     */
    data: XOR<BallotUpdateManyMutationInput, BallotUncheckedUpdateManyInput>
    /**
     * Filter which Ballots to update
     */
    where?: BallotWhereInput
  }

  /**
   * Ballot upsert
   */
  export type BallotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * The filter to search for the Ballot to update in case it exists.
     */
    where: BallotWhereUniqueInput
    /**
     * In case the Ballot found by the `where` argument doesn't exist, create a new Ballot with this data.
     */
    create: XOR<BallotCreateInput, BallotUncheckedCreateInput>
    /**
     * In case the Ballot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BallotUpdateInput, BallotUncheckedUpdateInput>
  }

  /**
   * Ballot delete
   */
  export type BallotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
    /**
     * Filter which Ballot to delete.
     */
    where: BallotWhereUniqueInput
  }

  /**
   * Ballot deleteMany
   */
  export type BallotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ballots to delete
     */
    where?: BallotWhereInput
  }

  /**
   * Ballot without action
   */
  export type BallotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ballot
     */
    select?: BallotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BallotInclude<ExtArgs> | null
  }


  /**
   * Model AwardEvent
   */

  export type AggregateAwardEvent = {
    _count: AwardEventCountAggregateOutputType | null
    _min: AwardEventMinAggregateOutputType | null
    _max: AwardEventMaxAggregateOutputType | null
  }

  export type AwardEventMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
  }

  export type AwardEventMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    type: string | null
  }

  export type AwardEventCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    type: number
    _all: number
  }


  export type AwardEventMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
  }

  export type AwardEventMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
  }

  export type AwardEventCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    type?: true
    _all?: true
  }

  export type AwardEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardEvent to aggregate.
     */
    where?: AwardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardEvents to fetch.
     */
    orderBy?: AwardEventOrderByWithRelationInput | AwardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AwardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardEvents
    **/
    _count?: true | AwardEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardEventMaxAggregateInputType
  }

  export type GetAwardEventAggregateType<T extends AwardEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardEvent[P]>
      : GetScalarType<T[P], AggregateAwardEvent[P]>
  }




  export type AwardEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardEventWhereInput
    orderBy?: AwardEventOrderByWithAggregationInput | AwardEventOrderByWithAggregationInput[]
    by: AwardEventScalarFieldEnum[] | AwardEventScalarFieldEnum
    having?: AwardEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardEventCountAggregateInputType | true
    _min?: AwardEventMinAggregateInputType
    _max?: AwardEventMaxAggregateInputType
  }

  export type AwardEventGroupByOutputType = {
    id: string
    name: string
    slug: string
    type: string
    _count: AwardEventCountAggregateOutputType | null
    _min: AwardEventMinAggregateOutputType | null
    _max: AwardEventMaxAggregateOutputType | null
  }

  type GetAwardEventGroupByPayload<T extends AwardEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AwardEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AwardEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AwardEventGroupByOutputType[P]>
            : GetScalarType<T[P], AwardEventGroupByOutputType[P]>
        }
      >
    >


  export type AwardEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
    seasons?: boolean | AwardEvent$seasonsArgs<ExtArgs>
    _count?: boolean | AwardEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardEvent"]>

  export type AwardEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
  }, ExtArgs["result"]["awardEvent"]>

  export type AwardEventSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    type?: boolean
  }

  export type AwardEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seasons?: boolean | AwardEvent$seasonsArgs<ExtArgs>
    _count?: boolean | AwardEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AwardEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AwardEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AwardEvent"
    objects: {
      seasons: Prisma.$AwardSeasonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      type: string
    }, ExtArgs["result"]["awardEvent"]>
    composites: {}
  }

  type AwardEventGetPayload<S extends boolean | null | undefined | AwardEventDefaultArgs> = $Result.GetResult<Prisma.$AwardEventPayload, S>

  type AwardEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AwardEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AwardEventCountAggregateInputType | true
    }

  export interface AwardEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AwardEvent'], meta: { name: 'AwardEvent' } }
    /**
     * Find zero or one AwardEvent that matches the filter.
     * @param {AwardEventFindUniqueArgs} args - Arguments to find a AwardEvent
     * @example
     * // Get one AwardEvent
     * const awardEvent = await prisma.awardEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AwardEventFindUniqueArgs>(args: SelectSubset<T, AwardEventFindUniqueArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AwardEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AwardEventFindUniqueOrThrowArgs} args - Arguments to find a AwardEvent
     * @example
     * // Get one AwardEvent
     * const awardEvent = await prisma.awardEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AwardEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AwardEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AwardEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventFindFirstArgs} args - Arguments to find a AwardEvent
     * @example
     * // Get one AwardEvent
     * const awardEvent = await prisma.awardEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AwardEventFindFirstArgs>(args?: SelectSubset<T, AwardEventFindFirstArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AwardEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventFindFirstOrThrowArgs} args - Arguments to find a AwardEvent
     * @example
     * // Get one AwardEvent
     * const awardEvent = await prisma.awardEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AwardEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AwardEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AwardEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardEvents
     * const awardEvents = await prisma.awardEvent.findMany()
     * 
     * // Get first 10 AwardEvents
     * const awardEvents = await prisma.awardEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardEventWithIdOnly = await prisma.awardEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AwardEventFindManyArgs>(args?: SelectSubset<T, AwardEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AwardEvent.
     * @param {AwardEventCreateArgs} args - Arguments to create a AwardEvent.
     * @example
     * // Create one AwardEvent
     * const AwardEvent = await prisma.awardEvent.create({
     *   data: {
     *     // ... data to create a AwardEvent
     *   }
     * })
     * 
     */
    create<T extends AwardEventCreateArgs>(args: SelectSubset<T, AwardEventCreateArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AwardEvents.
     * @param {AwardEventCreateManyArgs} args - Arguments to create many AwardEvents.
     * @example
     * // Create many AwardEvents
     * const awardEvent = await prisma.awardEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AwardEventCreateManyArgs>(args?: SelectSubset<T, AwardEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AwardEvents and returns the data saved in the database.
     * @param {AwardEventCreateManyAndReturnArgs} args - Arguments to create many AwardEvents.
     * @example
     * // Create many AwardEvents
     * const awardEvent = await prisma.awardEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AwardEvents and only return the `id`
     * const awardEventWithIdOnly = await prisma.awardEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AwardEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AwardEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AwardEvent.
     * @param {AwardEventDeleteArgs} args - Arguments to delete one AwardEvent.
     * @example
     * // Delete one AwardEvent
     * const AwardEvent = await prisma.awardEvent.delete({
     *   where: {
     *     // ... filter to delete one AwardEvent
     *   }
     * })
     * 
     */
    delete<T extends AwardEventDeleteArgs>(args: SelectSubset<T, AwardEventDeleteArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AwardEvent.
     * @param {AwardEventUpdateArgs} args - Arguments to update one AwardEvent.
     * @example
     * // Update one AwardEvent
     * const awardEvent = await prisma.awardEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AwardEventUpdateArgs>(args: SelectSubset<T, AwardEventUpdateArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AwardEvents.
     * @param {AwardEventDeleteManyArgs} args - Arguments to filter AwardEvents to delete.
     * @example
     * // Delete a few AwardEvents
     * const { count } = await prisma.awardEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AwardEventDeleteManyArgs>(args?: SelectSubset<T, AwardEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardEvents
     * const awardEvent = await prisma.awardEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AwardEventUpdateManyArgs>(args: SelectSubset<T, AwardEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AwardEvent.
     * @param {AwardEventUpsertArgs} args - Arguments to update or create a AwardEvent.
     * @example
     * // Update or create a AwardEvent
     * const awardEvent = await prisma.awardEvent.upsert({
     *   create: {
     *     // ... data to create a AwardEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardEvent we want to update
     *   }
     * })
     */
    upsert<T extends AwardEventUpsertArgs>(args: SelectSubset<T, AwardEventUpsertArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AwardEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventCountArgs} args - Arguments to filter AwardEvents to count.
     * @example
     * // Count the number of AwardEvents
     * const count = await prisma.awardEvent.count({
     *   where: {
     *     // ... the filter for the AwardEvents we want to count
     *   }
     * })
    **/
    count<T extends AwardEventCountArgs>(
      args?: Subset<T, AwardEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AwardEventAggregateArgs>(args: Subset<T, AwardEventAggregateArgs>): Prisma.PrismaPromise<GetAwardEventAggregateType<T>>

    /**
     * Group by AwardEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AwardEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardEventGroupByArgs['orderBy'] }
        : { orderBy?: AwardEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AwardEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AwardEvent model
   */
  readonly fields: AwardEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AwardEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seasons<T extends AwardEvent$seasonsArgs<ExtArgs> = {}>(args?: Subset<T, AwardEvent$seasonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AwardEvent model
   */ 
  interface AwardEventFieldRefs {
    readonly id: FieldRef<"AwardEvent", 'String'>
    readonly name: FieldRef<"AwardEvent", 'String'>
    readonly slug: FieldRef<"AwardEvent", 'String'>
    readonly type: FieldRef<"AwardEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AwardEvent findUnique
   */
  export type AwardEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter, which AwardEvent to fetch.
     */
    where: AwardEventWhereUniqueInput
  }

  /**
   * AwardEvent findUniqueOrThrow
   */
  export type AwardEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter, which AwardEvent to fetch.
     */
    where: AwardEventWhereUniqueInput
  }

  /**
   * AwardEvent findFirst
   */
  export type AwardEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter, which AwardEvent to fetch.
     */
    where?: AwardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardEvents to fetch.
     */
    orderBy?: AwardEventOrderByWithRelationInput | AwardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardEvents.
     */
    cursor?: AwardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardEvents.
     */
    distinct?: AwardEventScalarFieldEnum | AwardEventScalarFieldEnum[]
  }

  /**
   * AwardEvent findFirstOrThrow
   */
  export type AwardEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter, which AwardEvent to fetch.
     */
    where?: AwardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardEvents to fetch.
     */
    orderBy?: AwardEventOrderByWithRelationInput | AwardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardEvents.
     */
    cursor?: AwardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardEvents.
     */
    distinct?: AwardEventScalarFieldEnum | AwardEventScalarFieldEnum[]
  }

  /**
   * AwardEvent findMany
   */
  export type AwardEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter, which AwardEvents to fetch.
     */
    where?: AwardEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardEvents to fetch.
     */
    orderBy?: AwardEventOrderByWithRelationInput | AwardEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardEvents.
     */
    cursor?: AwardEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardEvents.
     */
    skip?: number
    distinct?: AwardEventScalarFieldEnum | AwardEventScalarFieldEnum[]
  }

  /**
   * AwardEvent create
   */
  export type AwardEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AwardEvent.
     */
    data: XOR<AwardEventCreateInput, AwardEventUncheckedCreateInput>
  }

  /**
   * AwardEvent createMany
   */
  export type AwardEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AwardEvents.
     */
    data: AwardEventCreateManyInput | AwardEventCreateManyInput[]
  }

  /**
   * AwardEvent createManyAndReturn
   */
  export type AwardEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AwardEvents.
     */
    data: AwardEventCreateManyInput | AwardEventCreateManyInput[]
  }

  /**
   * AwardEvent update
   */
  export type AwardEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AwardEvent.
     */
    data: XOR<AwardEventUpdateInput, AwardEventUncheckedUpdateInput>
    /**
     * Choose, which AwardEvent to update.
     */
    where: AwardEventWhereUniqueInput
  }

  /**
   * AwardEvent updateMany
   */
  export type AwardEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AwardEvents.
     */
    data: XOR<AwardEventUpdateManyMutationInput, AwardEventUncheckedUpdateManyInput>
    /**
     * Filter which AwardEvents to update
     */
    where?: AwardEventWhereInput
  }

  /**
   * AwardEvent upsert
   */
  export type AwardEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AwardEvent to update in case it exists.
     */
    where: AwardEventWhereUniqueInput
    /**
     * In case the AwardEvent found by the `where` argument doesn't exist, create a new AwardEvent with this data.
     */
    create: XOR<AwardEventCreateInput, AwardEventUncheckedCreateInput>
    /**
     * In case the AwardEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AwardEventUpdateInput, AwardEventUncheckedUpdateInput>
  }

  /**
   * AwardEvent delete
   */
  export type AwardEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
    /**
     * Filter which AwardEvent to delete.
     */
    where: AwardEventWhereUniqueInput
  }

  /**
   * AwardEvent deleteMany
   */
  export type AwardEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardEvents to delete
     */
    where?: AwardEventWhereInput
  }

  /**
   * AwardEvent.seasons
   */
  export type AwardEvent$seasonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    where?: AwardSeasonWhereInput
    orderBy?: AwardSeasonOrderByWithRelationInput | AwardSeasonOrderByWithRelationInput[]
    cursor?: AwardSeasonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AwardSeasonScalarFieldEnum | AwardSeasonScalarFieldEnum[]
  }

  /**
   * AwardEvent without action
   */
  export type AwardEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardEvent
     */
    select?: AwardEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardEventInclude<ExtArgs> | null
  }


  /**
   * Model AwardSeason
   */

  export type AggregateAwardSeason = {
    _count: AwardSeasonCountAggregateOutputType | null
    _avg: AwardSeasonAvgAggregateOutputType | null
    _sum: AwardSeasonSumAggregateOutputType | null
    _min: AwardSeasonMinAggregateOutputType | null
    _max: AwardSeasonMaxAggregateOutputType | null
  }

  export type AwardSeasonAvgAggregateOutputType = {
    year: number | null
  }

  export type AwardSeasonSumAggregateOutputType = {
    year: number | null
  }

  export type AwardSeasonMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    year: number | null
    season: string | null
    phase: string | null
    date: Date | null
  }

  export type AwardSeasonMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    year: number | null
    season: string | null
    phase: string | null
    date: Date | null
  }

  export type AwardSeasonCountAggregateOutputType = {
    id: number
    eventId: number
    year: number
    season: number
    phase: number
    date: number
    _all: number
  }


  export type AwardSeasonAvgAggregateInputType = {
    year?: true
  }

  export type AwardSeasonSumAggregateInputType = {
    year?: true
  }

  export type AwardSeasonMinAggregateInputType = {
    id?: true
    eventId?: true
    year?: true
    season?: true
    phase?: true
    date?: true
  }

  export type AwardSeasonMaxAggregateInputType = {
    id?: true
    eventId?: true
    year?: true
    season?: true
    phase?: true
    date?: true
  }

  export type AwardSeasonCountAggregateInputType = {
    id?: true
    eventId?: true
    year?: true
    season?: true
    phase?: true
    date?: true
    _all?: true
  }

  export type AwardSeasonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardSeason to aggregate.
     */
    where?: AwardSeasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardSeasons to fetch.
     */
    orderBy?: AwardSeasonOrderByWithRelationInput | AwardSeasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AwardSeasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardSeasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardSeasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardSeasons
    **/
    _count?: true | AwardSeasonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AwardSeasonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AwardSeasonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardSeasonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardSeasonMaxAggregateInputType
  }

  export type GetAwardSeasonAggregateType<T extends AwardSeasonAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardSeason]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardSeason[P]>
      : GetScalarType<T[P], AggregateAwardSeason[P]>
  }




  export type AwardSeasonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardSeasonWhereInput
    orderBy?: AwardSeasonOrderByWithAggregationInput | AwardSeasonOrderByWithAggregationInput[]
    by: AwardSeasonScalarFieldEnum[] | AwardSeasonScalarFieldEnum
    having?: AwardSeasonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardSeasonCountAggregateInputType | true
    _avg?: AwardSeasonAvgAggregateInputType
    _sum?: AwardSeasonSumAggregateInputType
    _min?: AwardSeasonMinAggregateInputType
    _max?: AwardSeasonMaxAggregateInputType
  }

  export type AwardSeasonGroupByOutputType = {
    id: string
    eventId: string
    year: number
    season: string
    phase: string
    date: Date | null
    _count: AwardSeasonCountAggregateOutputType | null
    _avg: AwardSeasonAvgAggregateOutputType | null
    _sum: AwardSeasonSumAggregateOutputType | null
    _min: AwardSeasonMinAggregateOutputType | null
    _max: AwardSeasonMaxAggregateOutputType | null
  }

  type GetAwardSeasonGroupByPayload<T extends AwardSeasonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AwardSeasonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AwardSeasonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AwardSeasonGroupByOutputType[P]>
            : GetScalarType<T[P], AwardSeasonGroupByOutputType[P]>
        }
      >
    >


  export type AwardSeasonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    year?: boolean
    season?: boolean
    phase?: boolean
    date?: boolean
    event?: boolean | AwardEventDefaultArgs<ExtArgs>
    winners?: boolean | AwardSeason$winnersArgs<ExtArgs>
    _count?: boolean | AwardSeasonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardSeason"]>

  export type AwardSeasonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    year?: boolean
    season?: boolean
    phase?: boolean
    date?: boolean
    event?: boolean | AwardEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardSeason"]>

  export type AwardSeasonSelectScalar = {
    id?: boolean
    eventId?: boolean
    year?: boolean
    season?: boolean
    phase?: boolean
    date?: boolean
  }

  export type AwardSeasonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | AwardEventDefaultArgs<ExtArgs>
    winners?: boolean | AwardSeason$winnersArgs<ExtArgs>
    _count?: boolean | AwardSeasonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AwardSeasonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | AwardEventDefaultArgs<ExtArgs>
  }

  export type $AwardSeasonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AwardSeason"
    objects: {
      event: Prisma.$AwardEventPayload<ExtArgs>
      winners: Prisma.$AwardWinnerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      year: number
      season: string
      phase: string
      date: Date | null
    }, ExtArgs["result"]["awardSeason"]>
    composites: {}
  }

  type AwardSeasonGetPayload<S extends boolean | null | undefined | AwardSeasonDefaultArgs> = $Result.GetResult<Prisma.$AwardSeasonPayload, S>

  type AwardSeasonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AwardSeasonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AwardSeasonCountAggregateInputType | true
    }

  export interface AwardSeasonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AwardSeason'], meta: { name: 'AwardSeason' } }
    /**
     * Find zero or one AwardSeason that matches the filter.
     * @param {AwardSeasonFindUniqueArgs} args - Arguments to find a AwardSeason
     * @example
     * // Get one AwardSeason
     * const awardSeason = await prisma.awardSeason.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AwardSeasonFindUniqueArgs>(args: SelectSubset<T, AwardSeasonFindUniqueArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AwardSeason that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AwardSeasonFindUniqueOrThrowArgs} args - Arguments to find a AwardSeason
     * @example
     * // Get one AwardSeason
     * const awardSeason = await prisma.awardSeason.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AwardSeasonFindUniqueOrThrowArgs>(args: SelectSubset<T, AwardSeasonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AwardSeason that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonFindFirstArgs} args - Arguments to find a AwardSeason
     * @example
     * // Get one AwardSeason
     * const awardSeason = await prisma.awardSeason.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AwardSeasonFindFirstArgs>(args?: SelectSubset<T, AwardSeasonFindFirstArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AwardSeason that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonFindFirstOrThrowArgs} args - Arguments to find a AwardSeason
     * @example
     * // Get one AwardSeason
     * const awardSeason = await prisma.awardSeason.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AwardSeasonFindFirstOrThrowArgs>(args?: SelectSubset<T, AwardSeasonFindFirstOrThrowArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AwardSeasons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardSeasons
     * const awardSeasons = await prisma.awardSeason.findMany()
     * 
     * // Get first 10 AwardSeasons
     * const awardSeasons = await prisma.awardSeason.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardSeasonWithIdOnly = await prisma.awardSeason.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AwardSeasonFindManyArgs>(args?: SelectSubset<T, AwardSeasonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AwardSeason.
     * @param {AwardSeasonCreateArgs} args - Arguments to create a AwardSeason.
     * @example
     * // Create one AwardSeason
     * const AwardSeason = await prisma.awardSeason.create({
     *   data: {
     *     // ... data to create a AwardSeason
     *   }
     * })
     * 
     */
    create<T extends AwardSeasonCreateArgs>(args: SelectSubset<T, AwardSeasonCreateArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AwardSeasons.
     * @param {AwardSeasonCreateManyArgs} args - Arguments to create many AwardSeasons.
     * @example
     * // Create many AwardSeasons
     * const awardSeason = await prisma.awardSeason.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AwardSeasonCreateManyArgs>(args?: SelectSubset<T, AwardSeasonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AwardSeasons and returns the data saved in the database.
     * @param {AwardSeasonCreateManyAndReturnArgs} args - Arguments to create many AwardSeasons.
     * @example
     * // Create many AwardSeasons
     * const awardSeason = await prisma.awardSeason.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AwardSeasons and only return the `id`
     * const awardSeasonWithIdOnly = await prisma.awardSeason.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AwardSeasonCreateManyAndReturnArgs>(args?: SelectSubset<T, AwardSeasonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AwardSeason.
     * @param {AwardSeasonDeleteArgs} args - Arguments to delete one AwardSeason.
     * @example
     * // Delete one AwardSeason
     * const AwardSeason = await prisma.awardSeason.delete({
     *   where: {
     *     // ... filter to delete one AwardSeason
     *   }
     * })
     * 
     */
    delete<T extends AwardSeasonDeleteArgs>(args: SelectSubset<T, AwardSeasonDeleteArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AwardSeason.
     * @param {AwardSeasonUpdateArgs} args - Arguments to update one AwardSeason.
     * @example
     * // Update one AwardSeason
     * const awardSeason = await prisma.awardSeason.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AwardSeasonUpdateArgs>(args: SelectSubset<T, AwardSeasonUpdateArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AwardSeasons.
     * @param {AwardSeasonDeleteManyArgs} args - Arguments to filter AwardSeasons to delete.
     * @example
     * // Delete a few AwardSeasons
     * const { count } = await prisma.awardSeason.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AwardSeasonDeleteManyArgs>(args?: SelectSubset<T, AwardSeasonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardSeasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardSeasons
     * const awardSeason = await prisma.awardSeason.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AwardSeasonUpdateManyArgs>(args: SelectSubset<T, AwardSeasonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AwardSeason.
     * @param {AwardSeasonUpsertArgs} args - Arguments to update or create a AwardSeason.
     * @example
     * // Update or create a AwardSeason
     * const awardSeason = await prisma.awardSeason.upsert({
     *   create: {
     *     // ... data to create a AwardSeason
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardSeason we want to update
     *   }
     * })
     */
    upsert<T extends AwardSeasonUpsertArgs>(args: SelectSubset<T, AwardSeasonUpsertArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AwardSeasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonCountArgs} args - Arguments to filter AwardSeasons to count.
     * @example
     * // Count the number of AwardSeasons
     * const count = await prisma.awardSeason.count({
     *   where: {
     *     // ... the filter for the AwardSeasons we want to count
     *   }
     * })
    **/
    count<T extends AwardSeasonCountArgs>(
      args?: Subset<T, AwardSeasonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardSeasonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardSeason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AwardSeasonAggregateArgs>(args: Subset<T, AwardSeasonAggregateArgs>): Prisma.PrismaPromise<GetAwardSeasonAggregateType<T>>

    /**
     * Group by AwardSeason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardSeasonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AwardSeasonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardSeasonGroupByArgs['orderBy'] }
        : { orderBy?: AwardSeasonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AwardSeasonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardSeasonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AwardSeason model
   */
  readonly fields: AwardSeasonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardSeason.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AwardSeasonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends AwardEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AwardEventDefaultArgs<ExtArgs>>): Prisma__AwardEventClient<$Result.GetResult<Prisma.$AwardEventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    winners<T extends AwardSeason$winnersArgs<ExtArgs> = {}>(args?: Subset<T, AwardSeason$winnersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AwardSeason model
   */ 
  interface AwardSeasonFieldRefs {
    readonly id: FieldRef<"AwardSeason", 'String'>
    readonly eventId: FieldRef<"AwardSeason", 'String'>
    readonly year: FieldRef<"AwardSeason", 'Int'>
    readonly season: FieldRef<"AwardSeason", 'String'>
    readonly phase: FieldRef<"AwardSeason", 'String'>
    readonly date: FieldRef<"AwardSeason", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AwardSeason findUnique
   */
  export type AwardSeasonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter, which AwardSeason to fetch.
     */
    where: AwardSeasonWhereUniqueInput
  }

  /**
   * AwardSeason findUniqueOrThrow
   */
  export type AwardSeasonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter, which AwardSeason to fetch.
     */
    where: AwardSeasonWhereUniqueInput
  }

  /**
   * AwardSeason findFirst
   */
  export type AwardSeasonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter, which AwardSeason to fetch.
     */
    where?: AwardSeasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardSeasons to fetch.
     */
    orderBy?: AwardSeasonOrderByWithRelationInput | AwardSeasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardSeasons.
     */
    cursor?: AwardSeasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardSeasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardSeasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardSeasons.
     */
    distinct?: AwardSeasonScalarFieldEnum | AwardSeasonScalarFieldEnum[]
  }

  /**
   * AwardSeason findFirstOrThrow
   */
  export type AwardSeasonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter, which AwardSeason to fetch.
     */
    where?: AwardSeasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardSeasons to fetch.
     */
    orderBy?: AwardSeasonOrderByWithRelationInput | AwardSeasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardSeasons.
     */
    cursor?: AwardSeasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardSeasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardSeasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardSeasons.
     */
    distinct?: AwardSeasonScalarFieldEnum | AwardSeasonScalarFieldEnum[]
  }

  /**
   * AwardSeason findMany
   */
  export type AwardSeasonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter, which AwardSeasons to fetch.
     */
    where?: AwardSeasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardSeasons to fetch.
     */
    orderBy?: AwardSeasonOrderByWithRelationInput | AwardSeasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardSeasons.
     */
    cursor?: AwardSeasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardSeasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardSeasons.
     */
    skip?: number
    distinct?: AwardSeasonScalarFieldEnum | AwardSeasonScalarFieldEnum[]
  }

  /**
   * AwardSeason create
   */
  export type AwardSeasonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * The data needed to create a AwardSeason.
     */
    data: XOR<AwardSeasonCreateInput, AwardSeasonUncheckedCreateInput>
  }

  /**
   * AwardSeason createMany
   */
  export type AwardSeasonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AwardSeasons.
     */
    data: AwardSeasonCreateManyInput | AwardSeasonCreateManyInput[]
  }

  /**
   * AwardSeason createManyAndReturn
   */
  export type AwardSeasonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AwardSeasons.
     */
    data: AwardSeasonCreateManyInput | AwardSeasonCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AwardSeason update
   */
  export type AwardSeasonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * The data needed to update a AwardSeason.
     */
    data: XOR<AwardSeasonUpdateInput, AwardSeasonUncheckedUpdateInput>
    /**
     * Choose, which AwardSeason to update.
     */
    where: AwardSeasonWhereUniqueInput
  }

  /**
   * AwardSeason updateMany
   */
  export type AwardSeasonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AwardSeasons.
     */
    data: XOR<AwardSeasonUpdateManyMutationInput, AwardSeasonUncheckedUpdateManyInput>
    /**
     * Filter which AwardSeasons to update
     */
    where?: AwardSeasonWhereInput
  }

  /**
   * AwardSeason upsert
   */
  export type AwardSeasonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * The filter to search for the AwardSeason to update in case it exists.
     */
    where: AwardSeasonWhereUniqueInput
    /**
     * In case the AwardSeason found by the `where` argument doesn't exist, create a new AwardSeason with this data.
     */
    create: XOR<AwardSeasonCreateInput, AwardSeasonUncheckedCreateInput>
    /**
     * In case the AwardSeason was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AwardSeasonUpdateInput, AwardSeasonUncheckedUpdateInput>
  }

  /**
   * AwardSeason delete
   */
  export type AwardSeasonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
    /**
     * Filter which AwardSeason to delete.
     */
    where: AwardSeasonWhereUniqueInput
  }

  /**
   * AwardSeason deleteMany
   */
  export type AwardSeasonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardSeasons to delete
     */
    where?: AwardSeasonWhereInput
  }

  /**
   * AwardSeason.winners
   */
  export type AwardSeason$winnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    where?: AwardWinnerWhereInput
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    cursor?: AwardWinnerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AwardWinnerScalarFieldEnum | AwardWinnerScalarFieldEnum[]
  }

  /**
   * AwardSeason without action
   */
  export type AwardSeasonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardSeason
     */
    select?: AwardSeasonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardSeasonInclude<ExtArgs> | null
  }


  /**
   * Model Movie
   */

  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    tmdbId: number | null
    eligibilityYear: number | null
  }

  export type MovieSumAggregateOutputType = {
    tmdbId: number | null
    eligibilityYear: number | null
  }

  export type MovieMinAggregateOutputType = {
    tmdbId: number | null
    title: string | null
    posterPath: string | null
    eligibleDate: Date | null
    eligibilityYear: number | null
    seasonKey: string | null
  }

  export type MovieMaxAggregateOutputType = {
    tmdbId: number | null
    title: string | null
    posterPath: string | null
    eligibleDate: Date | null
    eligibilityYear: number | null
    seasonKey: string | null
  }

  export type MovieCountAggregateOutputType = {
    tmdbId: number
    title: number
    posterPath: number
    eligibleDate: number
    eligibilityYear: number
    seasonKey: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    tmdbId?: true
    eligibilityYear?: true
  }

  export type MovieSumAggregateInputType = {
    tmdbId?: true
    eligibilityYear?: true
  }

  export type MovieMinAggregateInputType = {
    tmdbId?: true
    title?: true
    posterPath?: true
    eligibleDate?: true
    eligibilityYear?: true
    seasonKey?: true
  }

  export type MovieMaxAggregateInputType = {
    tmdbId?: true
    title?: true
    posterPath?: true
    eligibleDate?: true
    eligibilityYear?: true
    seasonKey?: true
  }

  export type MovieCountAggregateInputType = {
    tmdbId?: true
    title?: true
    posterPath?: true
    eligibleDate?: true
    eligibilityYear?: true
    seasonKey?: true
    _all?: true
  }

  export type MovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movie to aggregate.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }




  export type MovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithAggregationInput | MovieOrderByWithAggregationInput[]
    by: MovieScalarFieldEnum[] | MovieScalarFieldEnum
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }

  export type MovieGroupByOutputType = {
    tmdbId: number
    title: string
    posterPath: string | null
    eligibleDate: Date
    eligibilityYear: number
    seasonKey: string
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      >
    >


  export type MovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tmdbId?: boolean
    title?: boolean
    posterPath?: boolean
    eligibleDate?: boolean
    eligibilityYear?: boolean
    seasonKey?: boolean
    winners?: boolean | Movie$winnersArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tmdbId?: boolean
    title?: boolean
    posterPath?: boolean
    eligibleDate?: boolean
    eligibilityYear?: boolean
    seasonKey?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectScalar = {
    tmdbId?: boolean
    title?: boolean
    posterPath?: boolean
    eligibleDate?: boolean
    eligibilityYear?: boolean
    seasonKey?: boolean
  }

  export type MovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    winners?: boolean | Movie$winnersArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movie"
    objects: {
      winners: Prisma.$AwardWinnerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tmdbId: number
      title: string
      posterPath: string | null
      eligibleDate: Date
      eligibilityYear: number
      seasonKey: string
    }, ExtArgs["result"]["movie"]>
    composites: {}
  }

  type MovieGetPayload<S extends boolean | null | undefined | MovieDefaultArgs> = $Result.GetResult<Prisma.$MoviePayload, S>

  type MovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MovieFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MovieCountAggregateInputType | true
    }

  export interface MovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movie'], meta: { name: 'Movie' } }
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieFindUniqueArgs>(args: SelectSubset<T, MovieFindUniqueArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Movie that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MovieFindUniqueOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieFindFirstArgs>(args?: SelectSubset<T, MovieFindFirstArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Movie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `tmdbId`
     * const movieWithTmdbIdOnly = await prisma.movie.findMany({ select: { tmdbId: true } })
     * 
     */
    findMany<T extends MovieFindManyArgs>(args?: SelectSubset<T, MovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
     */
    create<T extends MovieCreateArgs>(args: SelectSubset<T, MovieCreateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Movies.
     * @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieCreateManyArgs>(args?: SelectSubset<T, MovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movies and returns the data saved in the database.
     * @param {MovieCreateManyAndReturnArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movies and only return the `tmdbId`
     * const movieWithTmdbIdOnly = await prisma.movie.createManyAndReturn({ 
     *   select: { tmdbId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
     */
    delete<T extends MovieDeleteArgs>(args: SelectSubset<T, MovieDeleteArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieUpdateArgs>(args: SelectSubset<T, MovieUpdateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDeleteManyArgs>(args?: SelectSubset<T, MovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieUpdateManyArgs>(args: SelectSubset<T, MovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
     */
    upsert<T extends MovieUpsertArgs>(args: SelectSubset<T, MovieUpsertArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): Prisma.PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movie model
   */
  readonly fields: MovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    winners<T extends Movie$winnersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$winnersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movie model
   */ 
  interface MovieFieldRefs {
    readonly tmdbId: FieldRef<"Movie", 'Int'>
    readonly title: FieldRef<"Movie", 'String'>
    readonly posterPath: FieldRef<"Movie", 'String'>
    readonly eligibleDate: FieldRef<"Movie", 'DateTime'>
    readonly eligibilityYear: FieldRef<"Movie", 'Int'>
    readonly seasonKey: FieldRef<"Movie", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findUniqueOrThrow
   */
  export type MovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findFirstOrThrow
   */
  export type MovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findMany
   */
  export type MovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movies to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie create
   */
  export type MovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to create a Movie.
     */
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }

  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
  }

  /**
   * Movie createManyAndReturn
   */
  export type MovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
  }

  /**
   * Movie update
   */
  export type MovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to update a Movie.
     */
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
  }

  /**
   * Movie upsert
   */
  export type MovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The filter to search for the Movie to update in case it exists.
     */
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     */
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }

  /**
   * Movie delete
   */
  export type MovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter which Movie to delete.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movies to delete
     */
    where?: MovieWhereInput
  }

  /**
   * Movie.winners
   */
  export type Movie$winnersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    where?: AwardWinnerWhereInput
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    cursor?: AwardWinnerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AwardWinnerScalarFieldEnum | AwardWinnerScalarFieldEnum[]
  }

  /**
   * Movie without action
   */
  export type MovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
  }


  /**
   * Model AwardWinner
   */

  export type AggregateAwardWinner = {
    _count: AwardWinnerCountAggregateOutputType | null
    _avg: AwardWinnerAvgAggregateOutputType | null
    _sum: AwardWinnerSumAggregateOutputType | null
    _min: AwardWinnerMinAggregateOutputType | null
    _max: AwardWinnerMaxAggregateOutputType | null
  }

  export type AwardWinnerAvgAggregateOutputType = {
    movieId: number | null
  }

  export type AwardWinnerSumAggregateOutputType = {
    movieId: number | null
  }

  export type AwardWinnerMinAggregateOutputType = {
    id: string | null
    seasonId: string | null
    prizeName: string | null
    movieId: number | null
    movieTitle: string | null
    posterPath: string | null
    personName: string | null
    personPath: string | null
    isWinner: boolean | null
    sourceUrl: string | null
    createdAt: Date | null
  }

  export type AwardWinnerMaxAggregateOutputType = {
    id: string | null
    seasonId: string | null
    prizeName: string | null
    movieId: number | null
    movieTitle: string | null
    posterPath: string | null
    personName: string | null
    personPath: string | null
    isWinner: boolean | null
    sourceUrl: string | null
    createdAt: Date | null
  }

  export type AwardWinnerCountAggregateOutputType = {
    id: number
    seasonId: number
    prizeName: number
    movieId: number
    movieTitle: number
    posterPath: number
    personName: number
    personPath: number
    isWinner: number
    sourceUrl: number
    createdAt: number
    _all: number
  }


  export type AwardWinnerAvgAggregateInputType = {
    movieId?: true
  }

  export type AwardWinnerSumAggregateInputType = {
    movieId?: true
  }

  export type AwardWinnerMinAggregateInputType = {
    id?: true
    seasonId?: true
    prizeName?: true
    movieId?: true
    movieTitle?: true
    posterPath?: true
    personName?: true
    personPath?: true
    isWinner?: true
    sourceUrl?: true
    createdAt?: true
  }

  export type AwardWinnerMaxAggregateInputType = {
    id?: true
    seasonId?: true
    prizeName?: true
    movieId?: true
    movieTitle?: true
    posterPath?: true
    personName?: true
    personPath?: true
    isWinner?: true
    sourceUrl?: true
    createdAt?: true
  }

  export type AwardWinnerCountAggregateInputType = {
    id?: true
    seasonId?: true
    prizeName?: true
    movieId?: true
    movieTitle?: true
    posterPath?: true
    personName?: true
    personPath?: true
    isWinner?: true
    sourceUrl?: true
    createdAt?: true
    _all?: true
  }

  export type AwardWinnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardWinner to aggregate.
     */
    where?: AwardWinnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardWinners to fetch.
     */
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AwardWinnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardWinners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardWinners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AwardWinners
    **/
    _count?: true | AwardWinnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AwardWinnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AwardWinnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AwardWinnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AwardWinnerMaxAggregateInputType
  }

  export type GetAwardWinnerAggregateType<T extends AwardWinnerAggregateArgs> = {
        [P in keyof T & keyof AggregateAwardWinner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAwardWinner[P]>
      : GetScalarType<T[P], AggregateAwardWinner[P]>
  }




  export type AwardWinnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AwardWinnerWhereInput
    orderBy?: AwardWinnerOrderByWithAggregationInput | AwardWinnerOrderByWithAggregationInput[]
    by: AwardWinnerScalarFieldEnum[] | AwardWinnerScalarFieldEnum
    having?: AwardWinnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AwardWinnerCountAggregateInputType | true
    _avg?: AwardWinnerAvgAggregateInputType
    _sum?: AwardWinnerSumAggregateInputType
    _min?: AwardWinnerMinAggregateInputType
    _max?: AwardWinnerMaxAggregateInputType
  }

  export type AwardWinnerGroupByOutputType = {
    id: string
    seasonId: string
    prizeName: string
    movieId: number
    movieTitle: string
    posterPath: string | null
    personName: string | null
    personPath: string | null
    isWinner: boolean
    sourceUrl: string | null
    createdAt: Date
    _count: AwardWinnerCountAggregateOutputType | null
    _avg: AwardWinnerAvgAggregateOutputType | null
    _sum: AwardWinnerSumAggregateOutputType | null
    _min: AwardWinnerMinAggregateOutputType | null
    _max: AwardWinnerMaxAggregateOutputType | null
  }

  type GetAwardWinnerGroupByPayload<T extends AwardWinnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AwardWinnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AwardWinnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AwardWinnerGroupByOutputType[P]>
            : GetScalarType<T[P], AwardWinnerGroupByOutputType[P]>
        }
      >
    >


  export type AwardWinnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seasonId?: boolean
    prizeName?: boolean
    movieId?: boolean
    movieTitle?: boolean
    posterPath?: boolean
    personName?: boolean
    personPath?: boolean
    isWinner?: boolean
    sourceUrl?: boolean
    createdAt?: boolean
    seasonRel?: boolean | AwardSeasonDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardWinner"]>

  export type AwardWinnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seasonId?: boolean
    prizeName?: boolean
    movieId?: boolean
    movieTitle?: boolean
    posterPath?: boolean
    personName?: boolean
    personPath?: boolean
    isWinner?: boolean
    sourceUrl?: boolean
    createdAt?: boolean
    seasonRel?: boolean | AwardSeasonDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["awardWinner"]>

  export type AwardWinnerSelectScalar = {
    id?: boolean
    seasonId?: boolean
    prizeName?: boolean
    movieId?: boolean
    movieTitle?: boolean
    posterPath?: boolean
    personName?: boolean
    personPath?: boolean
    isWinner?: boolean
    sourceUrl?: boolean
    createdAt?: boolean
  }

  export type AwardWinnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seasonRel?: boolean | AwardSeasonDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }
  export type AwardWinnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seasonRel?: boolean | AwardSeasonDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }

  export type $AwardWinnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AwardWinner"
    objects: {
      seasonRel: Prisma.$AwardSeasonPayload<ExtArgs>
      movie: Prisma.$MoviePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      seasonId: string
      prizeName: string
      movieId: number
      movieTitle: string
      posterPath: string | null
      personName: string | null
      personPath: string | null
      isWinner: boolean
      sourceUrl: string | null
      createdAt: Date
    }, ExtArgs["result"]["awardWinner"]>
    composites: {}
  }

  type AwardWinnerGetPayload<S extends boolean | null | undefined | AwardWinnerDefaultArgs> = $Result.GetResult<Prisma.$AwardWinnerPayload, S>

  type AwardWinnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AwardWinnerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AwardWinnerCountAggregateInputType | true
    }

  export interface AwardWinnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AwardWinner'], meta: { name: 'AwardWinner' } }
    /**
     * Find zero or one AwardWinner that matches the filter.
     * @param {AwardWinnerFindUniqueArgs} args - Arguments to find a AwardWinner
     * @example
     * // Get one AwardWinner
     * const awardWinner = await prisma.awardWinner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AwardWinnerFindUniqueArgs>(args: SelectSubset<T, AwardWinnerFindUniqueArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AwardWinner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AwardWinnerFindUniqueOrThrowArgs} args - Arguments to find a AwardWinner
     * @example
     * // Get one AwardWinner
     * const awardWinner = await prisma.awardWinner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AwardWinnerFindUniqueOrThrowArgs>(args: SelectSubset<T, AwardWinnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AwardWinner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerFindFirstArgs} args - Arguments to find a AwardWinner
     * @example
     * // Get one AwardWinner
     * const awardWinner = await prisma.awardWinner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AwardWinnerFindFirstArgs>(args?: SelectSubset<T, AwardWinnerFindFirstArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AwardWinner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerFindFirstOrThrowArgs} args - Arguments to find a AwardWinner
     * @example
     * // Get one AwardWinner
     * const awardWinner = await prisma.awardWinner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AwardWinnerFindFirstOrThrowArgs>(args?: SelectSubset<T, AwardWinnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AwardWinners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AwardWinners
     * const awardWinners = await prisma.awardWinner.findMany()
     * 
     * // Get first 10 AwardWinners
     * const awardWinners = await prisma.awardWinner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const awardWinnerWithIdOnly = await prisma.awardWinner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AwardWinnerFindManyArgs>(args?: SelectSubset<T, AwardWinnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AwardWinner.
     * @param {AwardWinnerCreateArgs} args - Arguments to create a AwardWinner.
     * @example
     * // Create one AwardWinner
     * const AwardWinner = await prisma.awardWinner.create({
     *   data: {
     *     // ... data to create a AwardWinner
     *   }
     * })
     * 
     */
    create<T extends AwardWinnerCreateArgs>(args: SelectSubset<T, AwardWinnerCreateArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AwardWinners.
     * @param {AwardWinnerCreateManyArgs} args - Arguments to create many AwardWinners.
     * @example
     * // Create many AwardWinners
     * const awardWinner = await prisma.awardWinner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AwardWinnerCreateManyArgs>(args?: SelectSubset<T, AwardWinnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AwardWinners and returns the data saved in the database.
     * @param {AwardWinnerCreateManyAndReturnArgs} args - Arguments to create many AwardWinners.
     * @example
     * // Create many AwardWinners
     * const awardWinner = await prisma.awardWinner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AwardWinners and only return the `id`
     * const awardWinnerWithIdOnly = await prisma.awardWinner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AwardWinnerCreateManyAndReturnArgs>(args?: SelectSubset<T, AwardWinnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AwardWinner.
     * @param {AwardWinnerDeleteArgs} args - Arguments to delete one AwardWinner.
     * @example
     * // Delete one AwardWinner
     * const AwardWinner = await prisma.awardWinner.delete({
     *   where: {
     *     // ... filter to delete one AwardWinner
     *   }
     * })
     * 
     */
    delete<T extends AwardWinnerDeleteArgs>(args: SelectSubset<T, AwardWinnerDeleteArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AwardWinner.
     * @param {AwardWinnerUpdateArgs} args - Arguments to update one AwardWinner.
     * @example
     * // Update one AwardWinner
     * const awardWinner = await prisma.awardWinner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AwardWinnerUpdateArgs>(args: SelectSubset<T, AwardWinnerUpdateArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AwardWinners.
     * @param {AwardWinnerDeleteManyArgs} args - Arguments to filter AwardWinners to delete.
     * @example
     * // Delete a few AwardWinners
     * const { count } = await prisma.awardWinner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AwardWinnerDeleteManyArgs>(args?: SelectSubset<T, AwardWinnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AwardWinners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AwardWinners
     * const awardWinner = await prisma.awardWinner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AwardWinnerUpdateManyArgs>(args: SelectSubset<T, AwardWinnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AwardWinner.
     * @param {AwardWinnerUpsertArgs} args - Arguments to update or create a AwardWinner.
     * @example
     * // Update or create a AwardWinner
     * const awardWinner = await prisma.awardWinner.upsert({
     *   create: {
     *     // ... data to create a AwardWinner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AwardWinner we want to update
     *   }
     * })
     */
    upsert<T extends AwardWinnerUpsertArgs>(args: SelectSubset<T, AwardWinnerUpsertArgs<ExtArgs>>): Prisma__AwardWinnerClient<$Result.GetResult<Prisma.$AwardWinnerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AwardWinners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerCountArgs} args - Arguments to filter AwardWinners to count.
     * @example
     * // Count the number of AwardWinners
     * const count = await prisma.awardWinner.count({
     *   where: {
     *     // ... the filter for the AwardWinners we want to count
     *   }
     * })
    **/
    count<T extends AwardWinnerCountArgs>(
      args?: Subset<T, AwardWinnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AwardWinnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AwardWinner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AwardWinnerAggregateArgs>(args: Subset<T, AwardWinnerAggregateArgs>): Prisma.PrismaPromise<GetAwardWinnerAggregateType<T>>

    /**
     * Group by AwardWinner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AwardWinnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AwardWinnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AwardWinnerGroupByArgs['orderBy'] }
        : { orderBy?: AwardWinnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AwardWinnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAwardWinnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AwardWinner model
   */
  readonly fields: AwardWinnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AwardWinner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AwardWinnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seasonRel<T extends AwardSeasonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AwardSeasonDefaultArgs<ExtArgs>>): Prisma__AwardSeasonClient<$Result.GetResult<Prisma.$AwardSeasonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AwardWinner model
   */ 
  interface AwardWinnerFieldRefs {
    readonly id: FieldRef<"AwardWinner", 'String'>
    readonly seasonId: FieldRef<"AwardWinner", 'String'>
    readonly prizeName: FieldRef<"AwardWinner", 'String'>
    readonly movieId: FieldRef<"AwardWinner", 'Int'>
    readonly movieTitle: FieldRef<"AwardWinner", 'String'>
    readonly posterPath: FieldRef<"AwardWinner", 'String'>
    readonly personName: FieldRef<"AwardWinner", 'String'>
    readonly personPath: FieldRef<"AwardWinner", 'String'>
    readonly isWinner: FieldRef<"AwardWinner", 'Boolean'>
    readonly sourceUrl: FieldRef<"AwardWinner", 'String'>
    readonly createdAt: FieldRef<"AwardWinner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AwardWinner findUnique
   */
  export type AwardWinnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter, which AwardWinner to fetch.
     */
    where: AwardWinnerWhereUniqueInput
  }

  /**
   * AwardWinner findUniqueOrThrow
   */
  export type AwardWinnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter, which AwardWinner to fetch.
     */
    where: AwardWinnerWhereUniqueInput
  }

  /**
   * AwardWinner findFirst
   */
  export type AwardWinnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter, which AwardWinner to fetch.
     */
    where?: AwardWinnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardWinners to fetch.
     */
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardWinners.
     */
    cursor?: AwardWinnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardWinners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardWinners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardWinners.
     */
    distinct?: AwardWinnerScalarFieldEnum | AwardWinnerScalarFieldEnum[]
  }

  /**
   * AwardWinner findFirstOrThrow
   */
  export type AwardWinnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter, which AwardWinner to fetch.
     */
    where?: AwardWinnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardWinners to fetch.
     */
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AwardWinners.
     */
    cursor?: AwardWinnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardWinners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardWinners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AwardWinners.
     */
    distinct?: AwardWinnerScalarFieldEnum | AwardWinnerScalarFieldEnum[]
  }

  /**
   * AwardWinner findMany
   */
  export type AwardWinnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter, which AwardWinners to fetch.
     */
    where?: AwardWinnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AwardWinners to fetch.
     */
    orderBy?: AwardWinnerOrderByWithRelationInput | AwardWinnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AwardWinners.
     */
    cursor?: AwardWinnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AwardWinners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AwardWinners.
     */
    skip?: number
    distinct?: AwardWinnerScalarFieldEnum | AwardWinnerScalarFieldEnum[]
  }

  /**
   * AwardWinner create
   */
  export type AwardWinnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * The data needed to create a AwardWinner.
     */
    data: XOR<AwardWinnerCreateInput, AwardWinnerUncheckedCreateInput>
  }

  /**
   * AwardWinner createMany
   */
  export type AwardWinnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AwardWinners.
     */
    data: AwardWinnerCreateManyInput | AwardWinnerCreateManyInput[]
  }

  /**
   * AwardWinner createManyAndReturn
   */
  export type AwardWinnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AwardWinners.
     */
    data: AwardWinnerCreateManyInput | AwardWinnerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AwardWinner update
   */
  export type AwardWinnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * The data needed to update a AwardWinner.
     */
    data: XOR<AwardWinnerUpdateInput, AwardWinnerUncheckedUpdateInput>
    /**
     * Choose, which AwardWinner to update.
     */
    where: AwardWinnerWhereUniqueInput
  }

  /**
   * AwardWinner updateMany
   */
  export type AwardWinnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AwardWinners.
     */
    data: XOR<AwardWinnerUpdateManyMutationInput, AwardWinnerUncheckedUpdateManyInput>
    /**
     * Filter which AwardWinners to update
     */
    where?: AwardWinnerWhereInput
  }

  /**
   * AwardWinner upsert
   */
  export type AwardWinnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * The filter to search for the AwardWinner to update in case it exists.
     */
    where: AwardWinnerWhereUniqueInput
    /**
     * In case the AwardWinner found by the `where` argument doesn't exist, create a new AwardWinner with this data.
     */
    create: XOR<AwardWinnerCreateInput, AwardWinnerUncheckedCreateInput>
    /**
     * In case the AwardWinner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AwardWinnerUpdateInput, AwardWinnerUncheckedUpdateInput>
  }

  /**
   * AwardWinner delete
   */
  export type AwardWinnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
    /**
     * Filter which AwardWinner to delete.
     */
    where: AwardWinnerWhereUniqueInput
  }

  /**
   * AwardWinner deleteMany
   */
  export type AwardWinnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AwardWinners to delete
     */
    where?: AwardWinnerWhereInput
  }

  /**
   * AwardWinner without action
   */
  export type AwardWinnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AwardWinner
     */
    select?: AwardWinnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AwardWinnerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const WatchlistMovieScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    title: 'title',
    posterPath: 'posterPath',
    backdropPath: 'backdropPath',
    addedAt: 'addedAt'
  };

  export type WatchlistMovieScalarFieldEnum = (typeof WatchlistMovieScalarFieldEnum)[keyof typeof WatchlistMovieScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


  export const BallotScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    eventYear: 'eventYear',
    category: 'category',
    nomineeId: 'nomineeId',
    nomineeName: 'nomineeName',
    isWinner: 'isWinner',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BallotScalarFieldEnum = (typeof BallotScalarFieldEnum)[keyof typeof BallotScalarFieldEnum]


  export const AwardEventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    type: 'type'
  };

  export type AwardEventScalarFieldEnum = (typeof AwardEventScalarFieldEnum)[keyof typeof AwardEventScalarFieldEnum]


  export const AwardSeasonScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    year: 'year',
    season: 'season',
    phase: 'phase',
    date: 'date'
  };

  export type AwardSeasonScalarFieldEnum = (typeof AwardSeasonScalarFieldEnum)[keyof typeof AwardSeasonScalarFieldEnum]


  export const MovieScalarFieldEnum: {
    tmdbId: 'tmdbId',
    title: 'title',
    posterPath: 'posterPath',
    eligibleDate: 'eligibleDate',
    eligibilityYear: 'eligibilityYear',
    seasonKey: 'seasonKey'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const AwardWinnerScalarFieldEnum: {
    id: 'id',
    seasonId: 'seasonId',
    prizeName: 'prizeName',
    movieId: 'movieId',
    movieTitle: 'movieTitle',
    posterPath: 'posterPath',
    personName: 'personName',
    personPath: 'personPath',
    isWinner: 'isWinner',
    sourceUrl: 'sourceUrl',
    createdAt: 'createdAt'
  };

  export type AwardWinnerScalarFieldEnum = (typeof AwardWinnerScalarFieldEnum)[keyof typeof AwardWinnerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    watchlist?: WatchlistMovieListRelationFilter
    ratings?: RatingListRelationFilter
    ballots?: BallotListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    watchlist?: WatchlistMovieOrderByRelationAggregateInput
    ratings?: RatingOrderByRelationAggregateInput
    ballots?: BallotOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    watchlist?: WatchlistMovieListRelationFilter
    ratings?: RatingListRelationFilter
    ballots?: BallotListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type WatchlistMovieWhereInput = {
    AND?: WatchlistMovieWhereInput | WatchlistMovieWhereInput[]
    OR?: WatchlistMovieWhereInput[]
    NOT?: WatchlistMovieWhereInput | WatchlistMovieWhereInput[]
    id?: StringFilter<"WatchlistMovie"> | string
    userId?: StringFilter<"WatchlistMovie"> | string
    movieId?: IntFilter<"WatchlistMovie"> | number
    title?: StringFilter<"WatchlistMovie"> | string
    posterPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    backdropPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    addedAt?: DateTimeFilter<"WatchlistMovie"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WatchlistMovieOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    backdropPath?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WatchlistMovieWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_movieId?: WatchlistMovieUserIdMovieIdCompoundUniqueInput
    AND?: WatchlistMovieWhereInput | WatchlistMovieWhereInput[]
    OR?: WatchlistMovieWhereInput[]
    NOT?: WatchlistMovieWhereInput | WatchlistMovieWhereInput[]
    userId?: StringFilter<"WatchlistMovie"> | string
    movieId?: IntFilter<"WatchlistMovie"> | number
    title?: StringFilter<"WatchlistMovie"> | string
    posterPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    backdropPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    addedAt?: DateTimeFilter<"WatchlistMovie"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_movieId">

  export type WatchlistMovieOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    backdropPath?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    _count?: WatchlistMovieCountOrderByAggregateInput
    _avg?: WatchlistMovieAvgOrderByAggregateInput
    _max?: WatchlistMovieMaxOrderByAggregateInput
    _min?: WatchlistMovieMinOrderByAggregateInput
    _sum?: WatchlistMovieSumOrderByAggregateInput
  }

  export type WatchlistMovieScalarWhereWithAggregatesInput = {
    AND?: WatchlistMovieScalarWhereWithAggregatesInput | WatchlistMovieScalarWhereWithAggregatesInput[]
    OR?: WatchlistMovieScalarWhereWithAggregatesInput[]
    NOT?: WatchlistMovieScalarWhereWithAggregatesInput | WatchlistMovieScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WatchlistMovie"> | string
    userId?: StringWithAggregatesFilter<"WatchlistMovie"> | string
    movieId?: IntWithAggregatesFilter<"WatchlistMovie"> | number
    title?: StringWithAggregatesFilter<"WatchlistMovie"> | string
    posterPath?: StringNullableWithAggregatesFilter<"WatchlistMovie"> | string | null
    backdropPath?: StringNullableWithAggregatesFilter<"WatchlistMovie"> | string | null
    addedAt?: DateTimeWithAggregatesFilter<"WatchlistMovie"> | Date | string
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id?: StringFilter<"Rating"> | string
    userId?: StringFilter<"Rating"> | string
    movieId?: IntFilter<"Rating"> | number
    value?: FloatFilter<"Rating"> | number
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_movieId?: RatingUserIdMovieIdCompoundUniqueInput
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    userId?: StringFilter<"Rating"> | string
    movieId?: IntFilter<"Rating"> | number
    value?: FloatFilter<"Rating"> | number
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_movieId">

  export type RatingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rating"> | string
    userId?: StringWithAggregatesFilter<"Rating"> | string
    movieId?: IntWithAggregatesFilter<"Rating"> | number
    value?: FloatWithAggregatesFilter<"Rating"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type BallotWhereInput = {
    AND?: BallotWhereInput | BallotWhereInput[]
    OR?: BallotWhereInput[]
    NOT?: BallotWhereInput | BallotWhereInput[]
    id?: StringFilter<"Ballot"> | string
    userId?: StringFilter<"Ballot"> | string
    eventYear?: IntFilter<"Ballot"> | number
    category?: StringFilter<"Ballot"> | string
    nomineeId?: StringFilter<"Ballot"> | string
    nomineeName?: StringFilter<"Ballot"> | string
    isWinner?: BoolFilter<"Ballot"> | boolean
    createdAt?: DateTimeFilter<"Ballot"> | Date | string
    updatedAt?: DateTimeFilter<"Ballot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BallotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventYear?: SortOrder
    category?: SortOrder
    nomineeId?: SortOrder
    nomineeName?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BallotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_eventYear_category?: BallotUserIdEventYearCategoryCompoundUniqueInput
    AND?: BallotWhereInput | BallotWhereInput[]
    OR?: BallotWhereInput[]
    NOT?: BallotWhereInput | BallotWhereInput[]
    userId?: StringFilter<"Ballot"> | string
    eventYear?: IntFilter<"Ballot"> | number
    category?: StringFilter<"Ballot"> | string
    nomineeId?: StringFilter<"Ballot"> | string
    nomineeName?: StringFilter<"Ballot"> | string
    isWinner?: BoolFilter<"Ballot"> | boolean
    createdAt?: DateTimeFilter<"Ballot"> | Date | string
    updatedAt?: DateTimeFilter<"Ballot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_eventYear_category">

  export type BallotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    eventYear?: SortOrder
    category?: SortOrder
    nomineeId?: SortOrder
    nomineeName?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BallotCountOrderByAggregateInput
    _avg?: BallotAvgOrderByAggregateInput
    _max?: BallotMaxOrderByAggregateInput
    _min?: BallotMinOrderByAggregateInput
    _sum?: BallotSumOrderByAggregateInput
  }

  export type BallotScalarWhereWithAggregatesInput = {
    AND?: BallotScalarWhereWithAggregatesInput | BallotScalarWhereWithAggregatesInput[]
    OR?: BallotScalarWhereWithAggregatesInput[]
    NOT?: BallotScalarWhereWithAggregatesInput | BallotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ballot"> | string
    userId?: StringWithAggregatesFilter<"Ballot"> | string
    eventYear?: IntWithAggregatesFilter<"Ballot"> | number
    category?: StringWithAggregatesFilter<"Ballot"> | string
    nomineeId?: StringWithAggregatesFilter<"Ballot"> | string
    nomineeName?: StringWithAggregatesFilter<"Ballot"> | string
    isWinner?: BoolWithAggregatesFilter<"Ballot"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Ballot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ballot"> | Date | string
  }

  export type AwardEventWhereInput = {
    AND?: AwardEventWhereInput | AwardEventWhereInput[]
    OR?: AwardEventWhereInput[]
    NOT?: AwardEventWhereInput | AwardEventWhereInput[]
    id?: StringFilter<"AwardEvent"> | string
    name?: StringFilter<"AwardEvent"> | string
    slug?: StringFilter<"AwardEvent"> | string
    type?: StringFilter<"AwardEvent"> | string
    seasons?: AwardSeasonListRelationFilter
  }

  export type AwardEventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    seasons?: AwardSeasonOrderByRelationAggregateInput
  }

  export type AwardEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: AwardEventWhereInput | AwardEventWhereInput[]
    OR?: AwardEventWhereInput[]
    NOT?: AwardEventWhereInput | AwardEventWhereInput[]
    type?: StringFilter<"AwardEvent"> | string
    seasons?: AwardSeasonListRelationFilter
  }, "id" | "name" | "slug">

  export type AwardEventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
    _count?: AwardEventCountOrderByAggregateInput
    _max?: AwardEventMaxOrderByAggregateInput
    _min?: AwardEventMinOrderByAggregateInput
  }

  export type AwardEventScalarWhereWithAggregatesInput = {
    AND?: AwardEventScalarWhereWithAggregatesInput | AwardEventScalarWhereWithAggregatesInput[]
    OR?: AwardEventScalarWhereWithAggregatesInput[]
    NOT?: AwardEventScalarWhereWithAggregatesInput | AwardEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AwardEvent"> | string
    name?: StringWithAggregatesFilter<"AwardEvent"> | string
    slug?: StringWithAggregatesFilter<"AwardEvent"> | string
    type?: StringWithAggregatesFilter<"AwardEvent"> | string
  }

  export type AwardSeasonWhereInput = {
    AND?: AwardSeasonWhereInput | AwardSeasonWhereInput[]
    OR?: AwardSeasonWhereInput[]
    NOT?: AwardSeasonWhereInput | AwardSeasonWhereInput[]
    id?: StringFilter<"AwardSeason"> | string
    eventId?: StringFilter<"AwardSeason"> | string
    year?: IntFilter<"AwardSeason"> | number
    season?: StringFilter<"AwardSeason"> | string
    phase?: StringFilter<"AwardSeason"> | string
    date?: DateTimeNullableFilter<"AwardSeason"> | Date | string | null
    event?: XOR<AwardEventScalarRelationFilter, AwardEventWhereInput>
    winners?: AwardWinnerListRelationFilter
  }

  export type AwardSeasonOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    year?: SortOrder
    season?: SortOrder
    phase?: SortOrder
    date?: SortOrderInput | SortOrder
    event?: AwardEventOrderByWithRelationInput
    winners?: AwardWinnerOrderByRelationAggregateInput
  }

  export type AwardSeasonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId_year?: AwardSeasonEventIdYearCompoundUniqueInput
    eventId_season?: AwardSeasonEventIdSeasonCompoundUniqueInput
    AND?: AwardSeasonWhereInput | AwardSeasonWhereInput[]
    OR?: AwardSeasonWhereInput[]
    NOT?: AwardSeasonWhereInput | AwardSeasonWhereInput[]
    eventId?: StringFilter<"AwardSeason"> | string
    year?: IntFilter<"AwardSeason"> | number
    season?: StringFilter<"AwardSeason"> | string
    phase?: StringFilter<"AwardSeason"> | string
    date?: DateTimeNullableFilter<"AwardSeason"> | Date | string | null
    event?: XOR<AwardEventScalarRelationFilter, AwardEventWhereInput>
    winners?: AwardWinnerListRelationFilter
  }, "id" | "eventId_year" | "eventId_season">

  export type AwardSeasonOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    year?: SortOrder
    season?: SortOrder
    phase?: SortOrder
    date?: SortOrderInput | SortOrder
    _count?: AwardSeasonCountOrderByAggregateInput
    _avg?: AwardSeasonAvgOrderByAggregateInput
    _max?: AwardSeasonMaxOrderByAggregateInput
    _min?: AwardSeasonMinOrderByAggregateInput
    _sum?: AwardSeasonSumOrderByAggregateInput
  }

  export type AwardSeasonScalarWhereWithAggregatesInput = {
    AND?: AwardSeasonScalarWhereWithAggregatesInput | AwardSeasonScalarWhereWithAggregatesInput[]
    OR?: AwardSeasonScalarWhereWithAggregatesInput[]
    NOT?: AwardSeasonScalarWhereWithAggregatesInput | AwardSeasonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AwardSeason"> | string
    eventId?: StringWithAggregatesFilter<"AwardSeason"> | string
    year?: IntWithAggregatesFilter<"AwardSeason"> | number
    season?: StringWithAggregatesFilter<"AwardSeason"> | string
    phase?: StringWithAggregatesFilter<"AwardSeason"> | string
    date?: DateTimeNullableWithAggregatesFilter<"AwardSeason"> | Date | string | null
  }

  export type MovieWhereInput = {
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    tmdbId?: IntFilter<"Movie"> | number
    title?: StringFilter<"Movie"> | string
    posterPath?: StringNullableFilter<"Movie"> | string | null
    eligibleDate?: DateTimeFilter<"Movie"> | Date | string
    eligibilityYear?: IntFilter<"Movie"> | number
    seasonKey?: StringFilter<"Movie"> | string
    winners?: AwardWinnerListRelationFilter
  }

  export type MovieOrderByWithRelationInput = {
    tmdbId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    eligibleDate?: SortOrder
    eligibilityYear?: SortOrder
    seasonKey?: SortOrder
    winners?: AwardWinnerOrderByRelationAggregateInput
  }

  export type MovieWhereUniqueInput = Prisma.AtLeast<{
    tmdbId?: number
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    title?: StringFilter<"Movie"> | string
    posterPath?: StringNullableFilter<"Movie"> | string | null
    eligibleDate?: DateTimeFilter<"Movie"> | Date | string
    eligibilityYear?: IntFilter<"Movie"> | number
    seasonKey?: StringFilter<"Movie"> | string
    winners?: AwardWinnerListRelationFilter
  }, "tmdbId">

  export type MovieOrderByWithAggregationInput = {
    tmdbId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    eligibleDate?: SortOrder
    eligibilityYear?: SortOrder
    seasonKey?: SortOrder
    _count?: MovieCountOrderByAggregateInput
    _avg?: MovieAvgOrderByAggregateInput
    _max?: MovieMaxOrderByAggregateInput
    _min?: MovieMinOrderByAggregateInput
    _sum?: MovieSumOrderByAggregateInput
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    OR?: MovieScalarWhereWithAggregatesInput[]
    NOT?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    tmdbId?: IntWithAggregatesFilter<"Movie"> | number
    title?: StringWithAggregatesFilter<"Movie"> | string
    posterPath?: StringNullableWithAggregatesFilter<"Movie"> | string | null
    eligibleDate?: DateTimeWithAggregatesFilter<"Movie"> | Date | string
    eligibilityYear?: IntWithAggregatesFilter<"Movie"> | number
    seasonKey?: StringWithAggregatesFilter<"Movie"> | string
  }

  export type AwardWinnerWhereInput = {
    AND?: AwardWinnerWhereInput | AwardWinnerWhereInput[]
    OR?: AwardWinnerWhereInput[]
    NOT?: AwardWinnerWhereInput | AwardWinnerWhereInput[]
    id?: StringFilter<"AwardWinner"> | string
    seasonId?: StringFilter<"AwardWinner"> | string
    prizeName?: StringFilter<"AwardWinner"> | string
    movieId?: IntFilter<"AwardWinner"> | number
    movieTitle?: StringFilter<"AwardWinner"> | string
    posterPath?: StringNullableFilter<"AwardWinner"> | string | null
    personName?: StringNullableFilter<"AwardWinner"> | string | null
    personPath?: StringNullableFilter<"AwardWinner"> | string | null
    isWinner?: BoolFilter<"AwardWinner"> | boolean
    sourceUrl?: StringNullableFilter<"AwardWinner"> | string | null
    createdAt?: DateTimeFilter<"AwardWinner"> | Date | string
    seasonRel?: XOR<AwardSeasonScalarRelationFilter, AwardSeasonWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
  }

  export type AwardWinnerOrderByWithRelationInput = {
    id?: SortOrder
    seasonId?: SortOrder
    prizeName?: SortOrder
    movieId?: SortOrder
    movieTitle?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    personName?: SortOrderInput | SortOrder
    personPath?: SortOrderInput | SortOrder
    isWinner?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    seasonRel?: AwardSeasonOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
  }

  export type AwardWinnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AwardWinnerWhereInput | AwardWinnerWhereInput[]
    OR?: AwardWinnerWhereInput[]
    NOT?: AwardWinnerWhereInput | AwardWinnerWhereInput[]
    seasonId?: StringFilter<"AwardWinner"> | string
    prizeName?: StringFilter<"AwardWinner"> | string
    movieId?: IntFilter<"AwardWinner"> | number
    movieTitle?: StringFilter<"AwardWinner"> | string
    posterPath?: StringNullableFilter<"AwardWinner"> | string | null
    personName?: StringNullableFilter<"AwardWinner"> | string | null
    personPath?: StringNullableFilter<"AwardWinner"> | string | null
    isWinner?: BoolFilter<"AwardWinner"> | boolean
    sourceUrl?: StringNullableFilter<"AwardWinner"> | string | null
    createdAt?: DateTimeFilter<"AwardWinner"> | Date | string
    seasonRel?: XOR<AwardSeasonScalarRelationFilter, AwardSeasonWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
  }, "id">

  export type AwardWinnerOrderByWithAggregationInput = {
    id?: SortOrder
    seasonId?: SortOrder
    prizeName?: SortOrder
    movieId?: SortOrder
    movieTitle?: SortOrder
    posterPath?: SortOrderInput | SortOrder
    personName?: SortOrderInput | SortOrder
    personPath?: SortOrderInput | SortOrder
    isWinner?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AwardWinnerCountOrderByAggregateInput
    _avg?: AwardWinnerAvgOrderByAggregateInput
    _max?: AwardWinnerMaxOrderByAggregateInput
    _min?: AwardWinnerMinOrderByAggregateInput
    _sum?: AwardWinnerSumOrderByAggregateInput
  }

  export type AwardWinnerScalarWhereWithAggregatesInput = {
    AND?: AwardWinnerScalarWhereWithAggregatesInput | AwardWinnerScalarWhereWithAggregatesInput[]
    OR?: AwardWinnerScalarWhereWithAggregatesInput[]
    NOT?: AwardWinnerScalarWhereWithAggregatesInput | AwardWinnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AwardWinner"> | string
    seasonId?: StringWithAggregatesFilter<"AwardWinner"> | string
    prizeName?: StringWithAggregatesFilter<"AwardWinner"> | string
    movieId?: IntWithAggregatesFilter<"AwardWinner"> | number
    movieTitle?: StringWithAggregatesFilter<"AwardWinner"> | string
    posterPath?: StringNullableWithAggregatesFilter<"AwardWinner"> | string | null
    personName?: StringNullableWithAggregatesFilter<"AwardWinner"> | string | null
    personPath?: StringNullableWithAggregatesFilter<"AwardWinner"> | string | null
    isWinner?: BoolWithAggregatesFilter<"AwardWinner"> | boolean
    sourceUrl?: StringNullableWithAggregatesFilter<"AwardWinner"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AwardWinner"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
    ballots?: BallotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    ballots?: BallotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
    ballots?: BallotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    ballots?: BallotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieCreateInput = {
    id?: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistMovieUncheckedCreateInput = {
    id?: string
    userId: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
  }

  export type WatchlistMovieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistMovieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieCreateManyInput = {
    id?: string
    userId: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
  }

  export type WatchlistMovieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateInput = {
    id?: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateInput = {
    id?: string
    userId: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id?: string
    userId: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotCreateInput = {
    id?: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBallotsInput
  }

  export type BallotUncheckedCreateInput = {
    id?: string
    userId: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BallotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBallotsNestedInput
  }

  export type BallotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotCreateManyInput = {
    id?: string
    userId: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BallotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardEventCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    seasons?: AwardSeasonCreateNestedManyWithoutEventInput
  }

  export type AwardEventUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    type: string
    seasons?: AwardSeasonUncheckedCreateNestedManyWithoutEventInput
  }

  export type AwardEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    seasons?: AwardSeasonUpdateManyWithoutEventNestedInput
  }

  export type AwardEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    seasons?: AwardSeasonUncheckedUpdateManyWithoutEventNestedInput
  }

  export type AwardEventCreateManyInput = {
    id?: string
    name: string
    slug: string
    type: string
  }

  export type AwardEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AwardEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AwardSeasonCreateInput = {
    id?: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
    event: AwardEventCreateNestedOneWithoutSeasonsInput
    winners?: AwardWinnerCreateNestedManyWithoutSeasonRelInput
  }

  export type AwardSeasonUncheckedCreateInput = {
    id?: string
    eventId: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
    winners?: AwardWinnerUncheckedCreateNestedManyWithoutSeasonRelInput
  }

  export type AwardSeasonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    event?: AwardEventUpdateOneRequiredWithoutSeasonsNestedInput
    winners?: AwardWinnerUpdateManyWithoutSeasonRelNestedInput
  }

  export type AwardSeasonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winners?: AwardWinnerUncheckedUpdateManyWithoutSeasonRelNestedInput
  }

  export type AwardSeasonCreateManyInput = {
    id?: string
    eventId: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
  }

  export type AwardSeasonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AwardSeasonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MovieCreateInput = {
    tmdbId: number
    title: string
    posterPath?: string | null
    eligibleDate: Date | string
    eligibilityYear: number
    seasonKey: string
    winners?: AwardWinnerCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateInput = {
    tmdbId: number
    title: string
    posterPath?: string | null
    eligibleDate: Date | string
    eligibilityYear: number
    seasonKey: string
    winners?: AwardWinnerUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieUpdateInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
    winners?: AwardWinnerUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
    winners?: AwardWinnerUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type MovieCreateManyInput = {
    tmdbId: number
    title: string
    posterPath?: string | null
    eligibleDate: Date | string
    eligibilityYear: number
    seasonKey: string
  }

  export type MovieUpdateManyMutationInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
  }

  export type MovieUncheckedUpdateManyInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
  }

  export type AwardWinnerCreateInput = {
    id?: string
    prizeName: string
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
    seasonRel: AwardSeasonCreateNestedOneWithoutWinnersInput
    movie: MovieCreateNestedOneWithoutWinnersInput
  }

  export type AwardWinnerUncheckedCreateInput = {
    id?: string
    seasonId: string
    prizeName: string
    movieId: number
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seasonRel?: AwardSeasonUpdateOneRequiredWithoutWinnersNestedInput
    movie?: MovieUpdateOneRequiredWithoutWinnersNestedInput
  }

  export type AwardWinnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seasonId?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardWinnerCreateManyInput = {
    id?: string
    seasonId: string
    prizeName: string
    movieId: number
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardWinnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    seasonId?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type WatchlistMovieListRelationFilter = {
    every?: WatchlistMovieWhereInput
    some?: WatchlistMovieWhereInput
    none?: WatchlistMovieWhereInput
  }

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type BallotListRelationFilter = {
    every?: BallotWhereInput
    some?: BallotWhereInput
    none?: BallotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchlistMovieOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BallotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type WatchlistMovieUserIdMovieIdCompoundUniqueInput = {
    userId: string
    movieId: number
  }

  export type WatchlistMovieCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    addedAt?: SortOrder
  }

  export type WatchlistMovieAvgOrderByAggregateInput = {
    movieId?: SortOrder
  }

  export type WatchlistMovieMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    addedAt?: SortOrder
  }

  export type WatchlistMovieMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    backdropPath?: SortOrder
    addedAt?: SortOrder
  }

  export type WatchlistMovieSumOrderByAggregateInput = {
    movieId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RatingUserIdMovieIdCompoundUniqueInput = {
    userId: string
    movieId: number
  }

  export type RatingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    movieId?: SortOrder
    value?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    movieId?: SortOrder
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BallotUserIdEventYearCategoryCompoundUniqueInput = {
    userId: string
    eventYear: number
    category: string
  }

  export type BallotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventYear?: SortOrder
    category?: SortOrder
    nomineeId?: SortOrder
    nomineeName?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BallotAvgOrderByAggregateInput = {
    eventYear?: SortOrder
  }

  export type BallotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventYear?: SortOrder
    category?: SortOrder
    nomineeId?: SortOrder
    nomineeName?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BallotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventYear?: SortOrder
    category?: SortOrder
    nomineeId?: SortOrder
    nomineeName?: SortOrder
    isWinner?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BallotSumOrderByAggregateInput = {
    eventYear?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AwardSeasonListRelationFilter = {
    every?: AwardSeasonWhereInput
    some?: AwardSeasonWhereInput
    none?: AwardSeasonWhereInput
  }

  export type AwardSeasonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AwardEventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
  }

  export type AwardEventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
  }

  export type AwardEventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    type?: SortOrder
  }

  export type AwardEventScalarRelationFilter = {
    is?: AwardEventWhereInput
    isNot?: AwardEventWhereInput
  }

  export type AwardWinnerListRelationFilter = {
    every?: AwardWinnerWhereInput
    some?: AwardWinnerWhereInput
    none?: AwardWinnerWhereInput
  }

  export type AwardWinnerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AwardSeasonEventIdYearCompoundUniqueInput = {
    eventId: string
    year: number
  }

  export type AwardSeasonEventIdSeasonCompoundUniqueInput = {
    eventId: string
    season: string
  }

  export type AwardSeasonCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    year?: SortOrder
    season?: SortOrder
    phase?: SortOrder
    date?: SortOrder
  }

  export type AwardSeasonAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type AwardSeasonMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    year?: SortOrder
    season?: SortOrder
    phase?: SortOrder
    date?: SortOrder
  }

  export type AwardSeasonMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    year?: SortOrder
    season?: SortOrder
    phase?: SortOrder
    date?: SortOrder
  }

  export type AwardSeasonSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type MovieCountOrderByAggregateInput = {
    tmdbId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    eligibleDate?: SortOrder
    eligibilityYear?: SortOrder
    seasonKey?: SortOrder
  }

  export type MovieAvgOrderByAggregateInput = {
    tmdbId?: SortOrder
    eligibilityYear?: SortOrder
  }

  export type MovieMaxOrderByAggregateInput = {
    tmdbId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    eligibleDate?: SortOrder
    eligibilityYear?: SortOrder
    seasonKey?: SortOrder
  }

  export type MovieMinOrderByAggregateInput = {
    tmdbId?: SortOrder
    title?: SortOrder
    posterPath?: SortOrder
    eligibleDate?: SortOrder
    eligibilityYear?: SortOrder
    seasonKey?: SortOrder
  }

  export type MovieSumOrderByAggregateInput = {
    tmdbId?: SortOrder
    eligibilityYear?: SortOrder
  }

  export type AwardSeasonScalarRelationFilter = {
    is?: AwardSeasonWhereInput
    isNot?: AwardSeasonWhereInput
  }

  export type MovieScalarRelationFilter = {
    is?: MovieWhereInput
    isNot?: MovieWhereInput
  }

  export type AwardWinnerCountOrderByAggregateInput = {
    id?: SortOrder
    seasonId?: SortOrder
    prizeName?: SortOrder
    movieId?: SortOrder
    movieTitle?: SortOrder
    posterPath?: SortOrder
    personName?: SortOrder
    personPath?: SortOrder
    isWinner?: SortOrder
    sourceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type AwardWinnerAvgOrderByAggregateInput = {
    movieId?: SortOrder
  }

  export type AwardWinnerMaxOrderByAggregateInput = {
    id?: SortOrder
    seasonId?: SortOrder
    prizeName?: SortOrder
    movieId?: SortOrder
    movieTitle?: SortOrder
    posterPath?: SortOrder
    personName?: SortOrder
    personPath?: SortOrder
    isWinner?: SortOrder
    sourceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type AwardWinnerMinOrderByAggregateInput = {
    id?: SortOrder
    seasonId?: SortOrder
    prizeName?: SortOrder
    movieId?: SortOrder
    movieTitle?: SortOrder
    posterPath?: SortOrder
    personName?: SortOrder
    personPath?: SortOrder
    isWinner?: SortOrder
    sourceUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type AwardWinnerSumOrderByAggregateInput = {
    movieId?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WatchlistMovieCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput> | WatchlistMovieCreateWithoutUserInput[] | WatchlistMovieUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistMovieCreateOrConnectWithoutUserInput | WatchlistMovieCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistMovieCreateManyUserInputEnvelope
    connect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
  }

  export type RatingCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type BallotCreateNestedManyWithoutUserInput = {
    create?: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput> | BallotCreateWithoutUserInput[] | BallotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BallotCreateOrConnectWithoutUserInput | BallotCreateOrConnectWithoutUserInput[]
    createMany?: BallotCreateManyUserInputEnvelope
    connect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type WatchlistMovieUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput> | WatchlistMovieCreateWithoutUserInput[] | WatchlistMovieUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistMovieCreateOrConnectWithoutUserInput | WatchlistMovieCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistMovieCreateManyUserInputEnvelope
    connect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type BallotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput> | BallotCreateWithoutUserInput[] | BallotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BallotCreateOrConnectWithoutUserInput | BallotCreateOrConnectWithoutUserInput[]
    createMany?: BallotCreateManyUserInputEnvelope
    connect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WatchlistMovieUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput> | WatchlistMovieCreateWithoutUserInput[] | WatchlistMovieUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistMovieCreateOrConnectWithoutUserInput | WatchlistMovieCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistMovieUpsertWithWhereUniqueWithoutUserInput | WatchlistMovieUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistMovieCreateManyUserInputEnvelope
    set?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    disconnect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    delete?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    connect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    update?: WatchlistMovieUpdateWithWhereUniqueWithoutUserInput | WatchlistMovieUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistMovieUpdateManyWithWhereWithoutUserInput | WatchlistMovieUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistMovieScalarWhereInput | WatchlistMovieScalarWhereInput[]
  }

  export type RatingUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type BallotUpdateManyWithoutUserNestedInput = {
    create?: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput> | BallotCreateWithoutUserInput[] | BallotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BallotCreateOrConnectWithoutUserInput | BallotCreateOrConnectWithoutUserInput[]
    upsert?: BallotUpsertWithWhereUniqueWithoutUserInput | BallotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BallotCreateManyUserInputEnvelope
    set?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    disconnect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    delete?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    connect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    update?: BallotUpdateWithWhereUniqueWithoutUserInput | BallotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BallotUpdateManyWithWhereWithoutUserInput | BallotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BallotScalarWhereInput | BallotScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput> | WatchlistMovieCreateWithoutUserInput[] | WatchlistMovieUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistMovieCreateOrConnectWithoutUserInput | WatchlistMovieCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistMovieUpsertWithWhereUniqueWithoutUserInput | WatchlistMovieUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistMovieCreateManyUserInputEnvelope
    set?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    disconnect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    delete?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    connect?: WatchlistMovieWhereUniqueInput | WatchlistMovieWhereUniqueInput[]
    update?: WatchlistMovieUpdateWithWhereUniqueWithoutUserInput | WatchlistMovieUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistMovieUpdateManyWithWhereWithoutUserInput | WatchlistMovieUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistMovieScalarWhereInput | WatchlistMovieScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type BallotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput> | BallotCreateWithoutUserInput[] | BallotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BallotCreateOrConnectWithoutUserInput | BallotCreateOrConnectWithoutUserInput[]
    upsert?: BallotUpsertWithWhereUniqueWithoutUserInput | BallotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BallotCreateManyUserInputEnvelope
    set?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    disconnect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    delete?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    connect?: BallotWhereUniqueInput | BallotWhereUniqueInput[]
    update?: BallotUpdateWithWhereUniqueWithoutUserInput | BallotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BallotUpdateManyWithWhereWithoutUserInput | BallotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BallotScalarWhereInput | BallotScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    upsert?: UserUpsertWithoutWatchlistInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchlistInput, UserUpdateWithoutWatchlistInput>, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type UserCreateNestedOneWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    upsert?: UserUpsertWithoutRatingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingsInput, UserUpdateWithoutRatingsInput>, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserCreateNestedOneWithoutBallotsInput = {
    create?: XOR<UserCreateWithoutBallotsInput, UserUncheckedCreateWithoutBallotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBallotsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutBallotsNestedInput = {
    create?: XOR<UserCreateWithoutBallotsInput, UserUncheckedCreateWithoutBallotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBallotsInput
    upsert?: UserUpsertWithoutBallotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBallotsInput, UserUpdateWithoutBallotsInput>, UserUncheckedUpdateWithoutBallotsInput>
  }

  export type AwardSeasonCreateNestedManyWithoutEventInput = {
    create?: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput> | AwardSeasonCreateWithoutEventInput[] | AwardSeasonUncheckedCreateWithoutEventInput[]
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutEventInput | AwardSeasonCreateOrConnectWithoutEventInput[]
    createMany?: AwardSeasonCreateManyEventInputEnvelope
    connect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
  }

  export type AwardSeasonUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput> | AwardSeasonCreateWithoutEventInput[] | AwardSeasonUncheckedCreateWithoutEventInput[]
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutEventInput | AwardSeasonCreateOrConnectWithoutEventInput[]
    createMany?: AwardSeasonCreateManyEventInputEnvelope
    connect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
  }

  export type AwardSeasonUpdateManyWithoutEventNestedInput = {
    create?: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput> | AwardSeasonCreateWithoutEventInput[] | AwardSeasonUncheckedCreateWithoutEventInput[]
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutEventInput | AwardSeasonCreateOrConnectWithoutEventInput[]
    upsert?: AwardSeasonUpsertWithWhereUniqueWithoutEventInput | AwardSeasonUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: AwardSeasonCreateManyEventInputEnvelope
    set?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    disconnect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    delete?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    connect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    update?: AwardSeasonUpdateWithWhereUniqueWithoutEventInput | AwardSeasonUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: AwardSeasonUpdateManyWithWhereWithoutEventInput | AwardSeasonUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: AwardSeasonScalarWhereInput | AwardSeasonScalarWhereInput[]
  }

  export type AwardSeasonUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput> | AwardSeasonCreateWithoutEventInput[] | AwardSeasonUncheckedCreateWithoutEventInput[]
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutEventInput | AwardSeasonCreateOrConnectWithoutEventInput[]
    upsert?: AwardSeasonUpsertWithWhereUniqueWithoutEventInput | AwardSeasonUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: AwardSeasonCreateManyEventInputEnvelope
    set?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    disconnect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    delete?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    connect?: AwardSeasonWhereUniqueInput | AwardSeasonWhereUniqueInput[]
    update?: AwardSeasonUpdateWithWhereUniqueWithoutEventInput | AwardSeasonUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: AwardSeasonUpdateManyWithWhereWithoutEventInput | AwardSeasonUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: AwardSeasonScalarWhereInput | AwardSeasonScalarWhereInput[]
  }

  export type AwardEventCreateNestedOneWithoutSeasonsInput = {
    create?: XOR<AwardEventCreateWithoutSeasonsInput, AwardEventUncheckedCreateWithoutSeasonsInput>
    connectOrCreate?: AwardEventCreateOrConnectWithoutSeasonsInput
    connect?: AwardEventWhereUniqueInput
  }

  export type AwardWinnerCreateNestedManyWithoutSeasonRelInput = {
    create?: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput> | AwardWinnerCreateWithoutSeasonRelInput[] | AwardWinnerUncheckedCreateWithoutSeasonRelInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutSeasonRelInput | AwardWinnerCreateOrConnectWithoutSeasonRelInput[]
    createMany?: AwardWinnerCreateManySeasonRelInputEnvelope
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
  }

  export type AwardWinnerUncheckedCreateNestedManyWithoutSeasonRelInput = {
    create?: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput> | AwardWinnerCreateWithoutSeasonRelInput[] | AwardWinnerUncheckedCreateWithoutSeasonRelInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutSeasonRelInput | AwardWinnerCreateOrConnectWithoutSeasonRelInput[]
    createMany?: AwardWinnerCreateManySeasonRelInputEnvelope
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
  }

  export type AwardEventUpdateOneRequiredWithoutSeasonsNestedInput = {
    create?: XOR<AwardEventCreateWithoutSeasonsInput, AwardEventUncheckedCreateWithoutSeasonsInput>
    connectOrCreate?: AwardEventCreateOrConnectWithoutSeasonsInput
    upsert?: AwardEventUpsertWithoutSeasonsInput
    connect?: AwardEventWhereUniqueInput
    update?: XOR<XOR<AwardEventUpdateToOneWithWhereWithoutSeasonsInput, AwardEventUpdateWithoutSeasonsInput>, AwardEventUncheckedUpdateWithoutSeasonsInput>
  }

  export type AwardWinnerUpdateManyWithoutSeasonRelNestedInput = {
    create?: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput> | AwardWinnerCreateWithoutSeasonRelInput[] | AwardWinnerUncheckedCreateWithoutSeasonRelInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutSeasonRelInput | AwardWinnerCreateOrConnectWithoutSeasonRelInput[]
    upsert?: AwardWinnerUpsertWithWhereUniqueWithoutSeasonRelInput | AwardWinnerUpsertWithWhereUniqueWithoutSeasonRelInput[]
    createMany?: AwardWinnerCreateManySeasonRelInputEnvelope
    set?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    disconnect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    delete?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    update?: AwardWinnerUpdateWithWhereUniqueWithoutSeasonRelInput | AwardWinnerUpdateWithWhereUniqueWithoutSeasonRelInput[]
    updateMany?: AwardWinnerUpdateManyWithWhereWithoutSeasonRelInput | AwardWinnerUpdateManyWithWhereWithoutSeasonRelInput[]
    deleteMany?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
  }

  export type AwardWinnerUncheckedUpdateManyWithoutSeasonRelNestedInput = {
    create?: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput> | AwardWinnerCreateWithoutSeasonRelInput[] | AwardWinnerUncheckedCreateWithoutSeasonRelInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutSeasonRelInput | AwardWinnerCreateOrConnectWithoutSeasonRelInput[]
    upsert?: AwardWinnerUpsertWithWhereUniqueWithoutSeasonRelInput | AwardWinnerUpsertWithWhereUniqueWithoutSeasonRelInput[]
    createMany?: AwardWinnerCreateManySeasonRelInputEnvelope
    set?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    disconnect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    delete?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    update?: AwardWinnerUpdateWithWhereUniqueWithoutSeasonRelInput | AwardWinnerUpdateWithWhereUniqueWithoutSeasonRelInput[]
    updateMany?: AwardWinnerUpdateManyWithWhereWithoutSeasonRelInput | AwardWinnerUpdateManyWithWhereWithoutSeasonRelInput[]
    deleteMany?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
  }

  export type AwardWinnerCreateNestedManyWithoutMovieInput = {
    create?: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput> | AwardWinnerCreateWithoutMovieInput[] | AwardWinnerUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutMovieInput | AwardWinnerCreateOrConnectWithoutMovieInput[]
    createMany?: AwardWinnerCreateManyMovieInputEnvelope
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
  }

  export type AwardWinnerUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput> | AwardWinnerCreateWithoutMovieInput[] | AwardWinnerUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutMovieInput | AwardWinnerCreateOrConnectWithoutMovieInput[]
    createMany?: AwardWinnerCreateManyMovieInputEnvelope
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
  }

  export type AwardWinnerUpdateManyWithoutMovieNestedInput = {
    create?: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput> | AwardWinnerCreateWithoutMovieInput[] | AwardWinnerUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutMovieInput | AwardWinnerCreateOrConnectWithoutMovieInput[]
    upsert?: AwardWinnerUpsertWithWhereUniqueWithoutMovieInput | AwardWinnerUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: AwardWinnerCreateManyMovieInputEnvelope
    set?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    disconnect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    delete?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    update?: AwardWinnerUpdateWithWhereUniqueWithoutMovieInput | AwardWinnerUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: AwardWinnerUpdateManyWithWhereWithoutMovieInput | AwardWinnerUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
  }

  export type AwardWinnerUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput> | AwardWinnerCreateWithoutMovieInput[] | AwardWinnerUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: AwardWinnerCreateOrConnectWithoutMovieInput | AwardWinnerCreateOrConnectWithoutMovieInput[]
    upsert?: AwardWinnerUpsertWithWhereUniqueWithoutMovieInput | AwardWinnerUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: AwardWinnerCreateManyMovieInputEnvelope
    set?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    disconnect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    delete?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    connect?: AwardWinnerWhereUniqueInput | AwardWinnerWhereUniqueInput[]
    update?: AwardWinnerUpdateWithWhereUniqueWithoutMovieInput | AwardWinnerUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: AwardWinnerUpdateManyWithWhereWithoutMovieInput | AwardWinnerUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
  }

  export type AwardSeasonCreateNestedOneWithoutWinnersInput = {
    create?: XOR<AwardSeasonCreateWithoutWinnersInput, AwardSeasonUncheckedCreateWithoutWinnersInput>
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutWinnersInput
    connect?: AwardSeasonWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutWinnersInput = {
    create?: XOR<MovieCreateWithoutWinnersInput, MovieUncheckedCreateWithoutWinnersInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWinnersInput
    connect?: MovieWhereUniqueInput
  }

  export type AwardSeasonUpdateOneRequiredWithoutWinnersNestedInput = {
    create?: XOR<AwardSeasonCreateWithoutWinnersInput, AwardSeasonUncheckedCreateWithoutWinnersInput>
    connectOrCreate?: AwardSeasonCreateOrConnectWithoutWinnersInput
    upsert?: AwardSeasonUpsertWithoutWinnersInput
    connect?: AwardSeasonWhereUniqueInput
    update?: XOR<XOR<AwardSeasonUpdateToOneWithWhereWithoutWinnersInput, AwardSeasonUpdateWithoutWinnersInput>, AwardSeasonUncheckedUpdateWithoutWinnersInput>
  }

  export type MovieUpdateOneRequiredWithoutWinnersNestedInput = {
    create?: XOR<MovieCreateWithoutWinnersInput, MovieUncheckedCreateWithoutWinnersInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWinnersInput
    upsert?: MovieUpsertWithoutWinnersInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutWinnersInput, MovieUpdateWithoutWinnersInput>, MovieUncheckedUpdateWithoutWinnersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
  }

  export type WatchlistMovieCreateWithoutUserInput = {
    id?: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
  }

  export type WatchlistMovieUncheckedCreateWithoutUserInput = {
    id?: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
  }

  export type WatchlistMovieCreateOrConnectWithoutUserInput = {
    where: WatchlistMovieWhereUniqueInput
    create: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput>
  }

  export type WatchlistMovieCreateManyUserInputEnvelope = {
    data: WatchlistMovieCreateManyUserInput | WatchlistMovieCreateManyUserInput[]
  }

  export type RatingCreateWithoutUserInput = {
    id?: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUncheckedCreateWithoutUserInput = {
    id?: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutUserInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingCreateManyUserInputEnvelope = {
    data: RatingCreateManyUserInput | RatingCreateManyUserInput[]
  }

  export type BallotCreateWithoutUserInput = {
    id?: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BallotUncheckedCreateWithoutUserInput = {
    id?: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BallotCreateOrConnectWithoutUserInput = {
    where: BallotWhereUniqueInput
    create: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput>
  }

  export type BallotCreateManyUserInputEnvelope = {
    data: BallotCreateManyUserInput | BallotCreateManyUserInput[]
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type WatchlistMovieUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchlistMovieWhereUniqueInput
    update: XOR<WatchlistMovieUpdateWithoutUserInput, WatchlistMovieUncheckedUpdateWithoutUserInput>
    create: XOR<WatchlistMovieCreateWithoutUserInput, WatchlistMovieUncheckedCreateWithoutUserInput>
  }

  export type WatchlistMovieUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchlistMovieWhereUniqueInput
    data: XOR<WatchlistMovieUpdateWithoutUserInput, WatchlistMovieUncheckedUpdateWithoutUserInput>
  }

  export type WatchlistMovieUpdateManyWithWhereWithoutUserInput = {
    where: WatchlistMovieScalarWhereInput
    data: XOR<WatchlistMovieUpdateManyMutationInput, WatchlistMovieUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchlistMovieScalarWhereInput = {
    AND?: WatchlistMovieScalarWhereInput | WatchlistMovieScalarWhereInput[]
    OR?: WatchlistMovieScalarWhereInput[]
    NOT?: WatchlistMovieScalarWhereInput | WatchlistMovieScalarWhereInput[]
    id?: StringFilter<"WatchlistMovie"> | string
    userId?: StringFilter<"WatchlistMovie"> | string
    movieId?: IntFilter<"WatchlistMovie"> | number
    title?: StringFilter<"WatchlistMovie"> | string
    posterPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    backdropPath?: StringNullableFilter<"WatchlistMovie"> | string | null
    addedAt?: DateTimeFilter<"WatchlistMovie"> | Date | string
  }

  export type RatingUpsertWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
  }

  export type RatingUpdateManyWithWhereWithoutUserInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutUserInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id?: StringFilter<"Rating"> | string
    userId?: StringFilter<"Rating"> | string
    movieId?: IntFilter<"Rating"> | number
    value?: FloatFilter<"Rating"> | number
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
  }

  export type BallotUpsertWithWhereUniqueWithoutUserInput = {
    where: BallotWhereUniqueInput
    update: XOR<BallotUpdateWithoutUserInput, BallotUncheckedUpdateWithoutUserInput>
    create: XOR<BallotCreateWithoutUserInput, BallotUncheckedCreateWithoutUserInput>
  }

  export type BallotUpdateWithWhereUniqueWithoutUserInput = {
    where: BallotWhereUniqueInput
    data: XOR<BallotUpdateWithoutUserInput, BallotUncheckedUpdateWithoutUserInput>
  }

  export type BallotUpdateManyWithWhereWithoutUserInput = {
    where: BallotScalarWhereInput
    data: XOR<BallotUpdateManyMutationInput, BallotUncheckedUpdateManyWithoutUserInput>
  }

  export type BallotScalarWhereInput = {
    AND?: BallotScalarWhereInput | BallotScalarWhereInput[]
    OR?: BallotScalarWhereInput[]
    NOT?: BallotScalarWhereInput | BallotScalarWhereInput[]
    id?: StringFilter<"Ballot"> | string
    userId?: StringFilter<"Ballot"> | string
    eventYear?: IntFilter<"Ballot"> | number
    category?: StringFilter<"Ballot"> | string
    nomineeId?: StringFilter<"Ballot"> | string
    nomineeName?: StringFilter<"Ballot"> | string
    isWinner?: BoolFilter<"Ballot"> | boolean
    createdAt?: DateTimeFilter<"Ballot"> | Date | string
    updatedAt?: DateTimeFilter<"Ballot"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
    ballots?: BallotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    ballots?: BallotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
    ballots?: BallotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    ballots?: BallotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
    ballots?: BallotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    ballots?: BallotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
    ballots?: BallotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    ballots?: BallotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWatchlistInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
    ballots?: BallotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchlistInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    ballots?: BallotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchlistInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
  }

  export type UserUpsertWithoutWatchlistInput = {
    update: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type UserUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
    ballots?: BallotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    ballots?: BallotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRatingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieCreateNestedManyWithoutUserInput
    ballots?: BallotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRatingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieUncheckedCreateNestedManyWithoutUserInput
    ballots?: BallotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRatingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type UserUpsertWithoutRatingsInput = {
    update: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUpdateManyWithoutUserNestedInput
    ballots?: BallotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput
    ballots?: BallotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBallotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieCreateNestedManyWithoutUserInput
    ratings?: RatingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBallotsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistMovieUncheckedCreateNestedManyWithoutUserInput
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBallotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBallotsInput, UserUncheckedCreateWithoutBallotsInput>
  }

  export type UserUpsertWithoutBallotsInput = {
    update: XOR<UserUpdateWithoutBallotsInput, UserUncheckedUpdateWithoutBallotsInput>
    create: XOR<UserCreateWithoutBallotsInput, UserUncheckedCreateWithoutBallotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBallotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBallotsInput, UserUncheckedUpdateWithoutBallotsInput>
  }

  export type UserUpdateWithoutBallotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUpdateManyWithoutUserNestedInput
    ratings?: RatingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBallotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistMovieUncheckedUpdateManyWithoutUserNestedInput
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AwardSeasonCreateWithoutEventInput = {
    id?: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
    winners?: AwardWinnerCreateNestedManyWithoutSeasonRelInput
  }

  export type AwardSeasonUncheckedCreateWithoutEventInput = {
    id?: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
    winners?: AwardWinnerUncheckedCreateNestedManyWithoutSeasonRelInput
  }

  export type AwardSeasonCreateOrConnectWithoutEventInput = {
    where: AwardSeasonWhereUniqueInput
    create: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput>
  }

  export type AwardSeasonCreateManyEventInputEnvelope = {
    data: AwardSeasonCreateManyEventInput | AwardSeasonCreateManyEventInput[]
  }

  export type AwardSeasonUpsertWithWhereUniqueWithoutEventInput = {
    where: AwardSeasonWhereUniqueInput
    update: XOR<AwardSeasonUpdateWithoutEventInput, AwardSeasonUncheckedUpdateWithoutEventInput>
    create: XOR<AwardSeasonCreateWithoutEventInput, AwardSeasonUncheckedCreateWithoutEventInput>
  }

  export type AwardSeasonUpdateWithWhereUniqueWithoutEventInput = {
    where: AwardSeasonWhereUniqueInput
    data: XOR<AwardSeasonUpdateWithoutEventInput, AwardSeasonUncheckedUpdateWithoutEventInput>
  }

  export type AwardSeasonUpdateManyWithWhereWithoutEventInput = {
    where: AwardSeasonScalarWhereInput
    data: XOR<AwardSeasonUpdateManyMutationInput, AwardSeasonUncheckedUpdateManyWithoutEventInput>
  }

  export type AwardSeasonScalarWhereInput = {
    AND?: AwardSeasonScalarWhereInput | AwardSeasonScalarWhereInput[]
    OR?: AwardSeasonScalarWhereInput[]
    NOT?: AwardSeasonScalarWhereInput | AwardSeasonScalarWhereInput[]
    id?: StringFilter<"AwardSeason"> | string
    eventId?: StringFilter<"AwardSeason"> | string
    year?: IntFilter<"AwardSeason"> | number
    season?: StringFilter<"AwardSeason"> | string
    phase?: StringFilter<"AwardSeason"> | string
    date?: DateTimeNullableFilter<"AwardSeason"> | Date | string | null
  }

  export type AwardEventCreateWithoutSeasonsInput = {
    id?: string
    name: string
    slug: string
    type: string
  }

  export type AwardEventUncheckedCreateWithoutSeasonsInput = {
    id?: string
    name: string
    slug: string
    type: string
  }

  export type AwardEventCreateOrConnectWithoutSeasonsInput = {
    where: AwardEventWhereUniqueInput
    create: XOR<AwardEventCreateWithoutSeasonsInput, AwardEventUncheckedCreateWithoutSeasonsInput>
  }

  export type AwardWinnerCreateWithoutSeasonRelInput = {
    id?: string
    prizeName: string
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
    movie: MovieCreateNestedOneWithoutWinnersInput
  }

  export type AwardWinnerUncheckedCreateWithoutSeasonRelInput = {
    id?: string
    prizeName: string
    movieId: number
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerCreateOrConnectWithoutSeasonRelInput = {
    where: AwardWinnerWhereUniqueInput
    create: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput>
  }

  export type AwardWinnerCreateManySeasonRelInputEnvelope = {
    data: AwardWinnerCreateManySeasonRelInput | AwardWinnerCreateManySeasonRelInput[]
  }

  export type AwardEventUpsertWithoutSeasonsInput = {
    update: XOR<AwardEventUpdateWithoutSeasonsInput, AwardEventUncheckedUpdateWithoutSeasonsInput>
    create: XOR<AwardEventCreateWithoutSeasonsInput, AwardEventUncheckedCreateWithoutSeasonsInput>
    where?: AwardEventWhereInput
  }

  export type AwardEventUpdateToOneWithWhereWithoutSeasonsInput = {
    where?: AwardEventWhereInput
    data: XOR<AwardEventUpdateWithoutSeasonsInput, AwardEventUncheckedUpdateWithoutSeasonsInput>
  }

  export type AwardEventUpdateWithoutSeasonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AwardEventUncheckedUpdateWithoutSeasonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AwardWinnerUpsertWithWhereUniqueWithoutSeasonRelInput = {
    where: AwardWinnerWhereUniqueInput
    update: XOR<AwardWinnerUpdateWithoutSeasonRelInput, AwardWinnerUncheckedUpdateWithoutSeasonRelInput>
    create: XOR<AwardWinnerCreateWithoutSeasonRelInput, AwardWinnerUncheckedCreateWithoutSeasonRelInput>
  }

  export type AwardWinnerUpdateWithWhereUniqueWithoutSeasonRelInput = {
    where: AwardWinnerWhereUniqueInput
    data: XOR<AwardWinnerUpdateWithoutSeasonRelInput, AwardWinnerUncheckedUpdateWithoutSeasonRelInput>
  }

  export type AwardWinnerUpdateManyWithWhereWithoutSeasonRelInput = {
    where: AwardWinnerScalarWhereInput
    data: XOR<AwardWinnerUpdateManyMutationInput, AwardWinnerUncheckedUpdateManyWithoutSeasonRelInput>
  }

  export type AwardWinnerScalarWhereInput = {
    AND?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
    OR?: AwardWinnerScalarWhereInput[]
    NOT?: AwardWinnerScalarWhereInput | AwardWinnerScalarWhereInput[]
    id?: StringFilter<"AwardWinner"> | string
    seasonId?: StringFilter<"AwardWinner"> | string
    prizeName?: StringFilter<"AwardWinner"> | string
    movieId?: IntFilter<"AwardWinner"> | number
    movieTitle?: StringFilter<"AwardWinner"> | string
    posterPath?: StringNullableFilter<"AwardWinner"> | string | null
    personName?: StringNullableFilter<"AwardWinner"> | string | null
    personPath?: StringNullableFilter<"AwardWinner"> | string | null
    isWinner?: BoolFilter<"AwardWinner"> | boolean
    sourceUrl?: StringNullableFilter<"AwardWinner"> | string | null
    createdAt?: DateTimeFilter<"AwardWinner"> | Date | string
  }

  export type AwardWinnerCreateWithoutMovieInput = {
    id?: string
    prizeName: string
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
    seasonRel: AwardSeasonCreateNestedOneWithoutWinnersInput
  }

  export type AwardWinnerUncheckedCreateWithoutMovieInput = {
    id?: string
    seasonId: string
    prizeName: string
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerCreateOrConnectWithoutMovieInput = {
    where: AwardWinnerWhereUniqueInput
    create: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput>
  }

  export type AwardWinnerCreateManyMovieInputEnvelope = {
    data: AwardWinnerCreateManyMovieInput | AwardWinnerCreateManyMovieInput[]
  }

  export type AwardWinnerUpsertWithWhereUniqueWithoutMovieInput = {
    where: AwardWinnerWhereUniqueInput
    update: XOR<AwardWinnerUpdateWithoutMovieInput, AwardWinnerUncheckedUpdateWithoutMovieInput>
    create: XOR<AwardWinnerCreateWithoutMovieInput, AwardWinnerUncheckedCreateWithoutMovieInput>
  }

  export type AwardWinnerUpdateWithWhereUniqueWithoutMovieInput = {
    where: AwardWinnerWhereUniqueInput
    data: XOR<AwardWinnerUpdateWithoutMovieInput, AwardWinnerUncheckedUpdateWithoutMovieInput>
  }

  export type AwardWinnerUpdateManyWithWhereWithoutMovieInput = {
    where: AwardWinnerScalarWhereInput
    data: XOR<AwardWinnerUpdateManyMutationInput, AwardWinnerUncheckedUpdateManyWithoutMovieInput>
  }

  export type AwardSeasonCreateWithoutWinnersInput = {
    id?: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
    event: AwardEventCreateNestedOneWithoutSeasonsInput
  }

  export type AwardSeasonUncheckedCreateWithoutWinnersInput = {
    id?: string
    eventId: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
  }

  export type AwardSeasonCreateOrConnectWithoutWinnersInput = {
    where: AwardSeasonWhereUniqueInput
    create: XOR<AwardSeasonCreateWithoutWinnersInput, AwardSeasonUncheckedCreateWithoutWinnersInput>
  }

  export type MovieCreateWithoutWinnersInput = {
    tmdbId: number
    title: string
    posterPath?: string | null
    eligibleDate: Date | string
    eligibilityYear: number
    seasonKey: string
  }

  export type MovieUncheckedCreateWithoutWinnersInput = {
    tmdbId: number
    title: string
    posterPath?: string | null
    eligibleDate: Date | string
    eligibilityYear: number
    seasonKey: string
  }

  export type MovieCreateOrConnectWithoutWinnersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutWinnersInput, MovieUncheckedCreateWithoutWinnersInput>
  }

  export type AwardSeasonUpsertWithoutWinnersInput = {
    update: XOR<AwardSeasonUpdateWithoutWinnersInput, AwardSeasonUncheckedUpdateWithoutWinnersInput>
    create: XOR<AwardSeasonCreateWithoutWinnersInput, AwardSeasonUncheckedCreateWithoutWinnersInput>
    where?: AwardSeasonWhereInput
  }

  export type AwardSeasonUpdateToOneWithWhereWithoutWinnersInput = {
    where?: AwardSeasonWhereInput
    data: XOR<AwardSeasonUpdateWithoutWinnersInput, AwardSeasonUncheckedUpdateWithoutWinnersInput>
  }

  export type AwardSeasonUpdateWithoutWinnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    event?: AwardEventUpdateOneRequiredWithoutSeasonsNestedInput
  }

  export type AwardSeasonUncheckedUpdateWithoutWinnersInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MovieUpsertWithoutWinnersInput = {
    update: XOR<MovieUpdateWithoutWinnersInput, MovieUncheckedUpdateWithoutWinnersInput>
    create: XOR<MovieCreateWithoutWinnersInput, MovieUncheckedCreateWithoutWinnersInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutWinnersInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutWinnersInput, MovieUncheckedUpdateWithoutWinnersInput>
  }

  export type MovieUpdateWithoutWinnersInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
  }

  export type MovieUncheckedUpdateWithoutWinnersInput = {
    tmdbId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    eligibleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    eligibilityYear?: IntFieldUpdateOperationsInput | number
    seasonKey?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistMovieCreateManyUserInput = {
    id?: string
    movieId: number
    title: string
    posterPath?: string | null
    backdropPath?: string | null
    addedAt?: Date | string
  }

  export type RatingCreateManyUserInput = {
    id?: string
    movieId: number
    value: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BallotCreateManyUserInput = {
    id?: string
    eventYear: number
    category: string
    nomineeId: string
    nomineeName: string
    isWinner?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistMovieUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    backdropPath?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BallotUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventYear?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    nomineeId?: StringFieldUpdateOperationsInput | string
    nomineeName?: StringFieldUpdateOperationsInput | string
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardSeasonCreateManyEventInput = {
    id?: string
    year: number
    season?: string
    phase?: string
    date?: Date | string | null
  }

  export type AwardSeasonUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winners?: AwardWinnerUpdateManyWithoutSeasonRelNestedInput
  }

  export type AwardSeasonUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    winners?: AwardWinnerUncheckedUpdateManyWithoutSeasonRelNestedInput
  }

  export type AwardSeasonUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    season?: StringFieldUpdateOperationsInput | string
    phase?: StringFieldUpdateOperationsInput | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AwardWinnerCreateManySeasonRelInput = {
    id?: string
    prizeName: string
    movieId: number
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerUpdateWithoutSeasonRelInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneRequiredWithoutWinnersNestedInput
  }

  export type AwardWinnerUncheckedUpdateWithoutSeasonRelInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardWinnerUncheckedUpdateManyWithoutSeasonRelInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieId?: IntFieldUpdateOperationsInput | number
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardWinnerCreateManyMovieInput = {
    id?: string
    seasonId: string
    prizeName: string
    movieTitle: string
    posterPath?: string | null
    personName?: string | null
    personPath?: string | null
    isWinner?: boolean
    sourceUrl?: string | null
    createdAt?: Date | string
  }

  export type AwardWinnerUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    seasonRel?: AwardSeasonUpdateOneRequiredWithoutWinnersNestedInput
  }

  export type AwardWinnerUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    seasonId?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AwardWinnerUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    seasonId?: StringFieldUpdateOperationsInput | string
    prizeName?: StringFieldUpdateOperationsInput | string
    movieTitle?: StringFieldUpdateOperationsInput | string
    posterPath?: NullableStringFieldUpdateOperationsInput | string | null
    personName?: NullableStringFieldUpdateOperationsInput | string | null
    personPath?: NullableStringFieldUpdateOperationsInput | string | null
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}