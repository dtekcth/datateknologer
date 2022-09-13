
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Profile
 * 
 */
export type Profile = {
  id: number
  name: string | null
  title: string | null
  email: string | null
  imageUrl: string | null
}

/**
 * Model Event
 * 
 */
export type Event = {
  id: number
  title: string
  description: string
  date: Date
  maxParticipants: number
  registrationOpens: Date
  registrationCloses: Date
  imageUrl: string | null
  foodWillBeServed: boolean
  archived: boolean
}

/**
 * Model EventRegistration
 * 
 */
export type EventRegistration = {
  eventId: number
  name: string
  email: string
  foodPreferences: string | null
  timestamp: Date
  verificationCode: string
  attended: boolean
}

/**
 * Model JobAd
 * 
 */
export type JobAd = {
  id: number
  title: string
  description: string
  closesOn: Date
  url: string
  clicks: number
  imageUrl: string | null
  timestamp: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<GlobalReject>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<GlobalReject>;

  /**
   * `prisma.eventRegistration`: Exposes CRUD operations for the **EventRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventRegistrations
    * const eventRegistrations = await prisma.eventRegistration.findMany()
    * ```
    */
  get eventRegistration(): Prisma.EventRegistrationDelegate<GlobalReject>;

  /**
   * `prisma.jobAd`: Exposes CRUD operations for the **JobAd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobAds
    * const jobAds = await prisma.jobAd.findMany()
    * ```
    */
  get jobAd(): Prisma.JobAdDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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

  /**
   * Prisma Client JS version: 3.7.0
   * Query Engine version: 8746e055198f517658c08a0c426c7eec87f5a85f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

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
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Profile: 'Profile',
    Event: 'Event',
    EventRegistration: 'EventRegistration',
    JobAd: 'JobAd'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
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
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EventCountOutputType
   */


  export type EventCountOutputType = {
    tickets: number
  }

  export type EventCountOutputTypeSelect = {
    tickets?: boolean
  }

  export type EventCountOutputTypeGetPayload<
    S extends boolean | null | undefined | EventCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? EventCountOutputType
    : S extends undefined
    ? never
    : S extends EventCountOutputTypeArgs
    ?'include' extends U
    ? EventCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof EventCountOutputType ?EventCountOutputType [P]
  : 
     never
  } 
    : EventCountOutputType
  : EventCountOutputType




  // Custom InputTypes

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     * 
    **/
    select?: EventCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Profile
   */


  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    email: string | null
    imageUrl: string | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    email: string | null
    imageUrl: string | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    name: number
    title: number
    email: number
    imageUrl: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    email?: true
    imageUrl?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    email?: true
    imageUrl?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    email?: true
    imageUrl?: true
    _all?: true
  }

  export type ProfileAggregateArgs = {
    /**
     * Filter which Profile to aggregate.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs = {
    where?: ProfileWhereInput
    orderBy?: Enumerable<ProfileOrderByWithAggregationInput>
    by: Array<ProfileScalarFieldEnum>
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }


  export type ProfileGroupByOutputType = {
    id: number
    name: string | null
    title: string | null
    email: string | null
    imageUrl: string | null
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Promise<
    Array<
      PickArray<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect = {
    id?: boolean
    name?: boolean
    title?: boolean
    email?: boolean
    imageUrl?: boolean
  }

  export type ProfileGetPayload<
    S extends boolean | null | undefined | ProfileArgs,
    U = keyof S
      > = S extends true
        ? Profile
    : S extends undefined
    ? never
    : S extends ProfileArgs | ProfileFindManyArgs
    ?'include' extends U
    ? Profile 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Profile ?Profile [P]
  : 
     never
  } 
    : Profile
  : Profile


  type ProfileCountArgs = Merge<
    Omit<ProfileFindManyArgs, 'select' | 'include'> & {
      select?: ProfileCountAggregateInputType | true
    }
  >

  export interface ProfileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfileFindManyArgs>(
      args?: SelectSubset<T, ProfileFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Profile>>, PrismaPromise<Array<ProfileGetPayload<T>>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: SelectSubset<T, ProfileCreateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Create many Profiles.
     *     @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     *     @example
     *     // Create many Profiles
     *     const profile = await prisma.profile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProfileCreateManyArgs>(
      args?: SelectSubset<T, ProfileCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: SelectSubset<T, ProfileDeleteArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: SelectSubset<T, ProfileUpdateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: SelectSubset<T, ProfileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: SelectSubset<T, ProfileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: SelectSubset<T, ProfileUpsertArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
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
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Throw an Error if a Profile can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Throw an Error if a Profile can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     * 
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Filter, which Profiles to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * The data needed to create a Profile.
     * 
    **/
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }


  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs = {
    data: Enumerable<ProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * The data needed to update a Profile.
     * 
    **/
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * The filter to search for the Profile to update in case it exists.
     * 
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     * 
    **/
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Filter which Profile to delete.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    where?: ProfileWhereInput
  }


  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
  }



  /**
   * Model Event
   */


  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    id: number | null
    maxParticipants: number | null
  }

  export type EventSumAggregateOutputType = {
    id: number | null
    maxParticipants: number | null
  }

  export type EventMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    date: Date | null
    maxParticipants: number | null
    registrationOpens: Date | null
    registrationCloses: Date | null
    imageUrl: string | null
    foodWillBeServed: boolean | null
    archived: boolean | null
  }

  export type EventMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    date: Date | null
    maxParticipants: number | null
    registrationOpens: Date | null
    registrationCloses: Date | null
    imageUrl: string | null
    foodWillBeServed: boolean | null
    archived: boolean | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    date: number
    maxParticipants: number
    registrationOpens: number
    registrationCloses: number
    imageUrl: number
    foodWillBeServed: number
    archived: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    id?: true
    maxParticipants?: true
  }

  export type EventSumAggregateInputType = {
    id?: true
    maxParticipants?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    maxParticipants?: true
    registrationOpens?: true
    registrationCloses?: true
    imageUrl?: true
    foodWillBeServed?: true
    archived?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    maxParticipants?: true
    registrationOpens?: true
    registrationCloses?: true
    imageUrl?: true
    foodWillBeServed?: true
    archived?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    maxParticipants?: true
    registrationOpens?: true
    registrationCloses?: true
    imageUrl?: true
    foodWillBeServed?: true
    archived?: true
    _all?: true
  }

  export type EventAggregateArgs = {
    /**
     * Filter which Event to aggregate.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs = {
    where?: EventWhereInput
    orderBy?: Enumerable<EventOrderByWithAggregationInput>
    by: Array<EventScalarFieldEnum>
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }


  export type EventGroupByOutputType = {
    id: number
    title: string
    description: string
    date: Date
    maxParticipants: number
    registrationOpens: Date
    registrationCloses: Date
    imageUrl: string | null
    foodWillBeServed: boolean
    archived: boolean
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Promise<
    Array<
      PickArray<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect = {
    id?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    maxParticipants?: boolean
    registrationOpens?: boolean
    registrationCloses?: boolean
    imageUrl?: boolean
    foodWillBeServed?: boolean
    archived?: boolean
    tickets?: boolean | EventRegistrationFindManyArgs
    _count?: boolean | EventCountOutputTypeArgs
  }

  export type EventInclude = {
    tickets?: boolean | EventRegistrationFindManyArgs
    _count?: boolean | EventCountOutputTypeArgs
  }

  export type EventGetPayload<
    S extends boolean | null | undefined | EventArgs,
    U = keyof S
      > = S extends true
        ? Event
    : S extends undefined
    ? never
    : S extends EventArgs | EventFindManyArgs
    ?'include' extends U
    ? Event  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'tickets'
        ? Array < EventRegistrationGetPayload<S['include'][P]>>  :
        P extends '_count'
        ? EventCountOutputTypeGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Event ?Event [P]
  : 
          P extends 'tickets'
        ? Array < EventRegistrationGetPayload<S['select'][P]>>  :
        P extends '_count'
        ? EventCountOutputTypeGetPayload<S['select'][P]> : never
  } 
    : Event
  : Event


  type EventCountArgs = Merge<
    Omit<EventFindManyArgs, 'select' | 'include'> & {
      select?: EventCountAggregateInputType | true
    }
  >

  export interface EventDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Event'> extends True ? CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>> : CheckSelect<T, Prisma__EventClient<Event | null >, Prisma__EventClient<EventGetPayload<T> | null >>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Event'> extends True ? CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>> : CheckSelect<T, Prisma__EventClient<Event | null >, Prisma__EventClient<EventGetPayload<T> | null >>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventFindManyArgs>(
      args?: SelectSubset<T, EventFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Event>>, PrismaPromise<Array<EventGetPayload<T>>>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
    **/
    create<T extends EventCreateArgs>(
      args: SelectSubset<T, EventCreateArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Create many Events.
     *     @param {EventCreateManyArgs} args - Arguments to create many Events.
     *     @example
     *     // Create many Events
     *     const event = await prisma.event.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventCreateManyArgs>(
      args?: SelectSubset<T, EventCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
    **/
    delete<T extends EventDeleteArgs>(
      args: SelectSubset<T, EventDeleteArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventUpdateArgs>(
      args: SelectSubset<T, EventUpdateArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventDeleteManyArgs>(
      args?: SelectSubset<T, EventDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventUpdateManyArgs>(
      args: SelectSubset<T, EventUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
    **/
    upsert<T extends EventUpsertArgs>(
      args: SelectSubset<T, EventUpsertArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    tickets<T extends EventRegistrationFindManyArgs = {}>(args?: Subset<T, EventRegistrationFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EventRegistration>>, PrismaPromise<Array<EventRegistrationGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Throw an Error if a Event can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event findFirst
   */
  export type EventFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Throw an Error if a Event can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     * 
    **/
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event findMany
   */
  export type EventFindManyArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Events to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event create
   */
  export type EventCreateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The data needed to create a Event.
     * 
    **/
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }


  /**
   * Event createMany
   */
  export type EventCreateManyArgs = {
    data: Enumerable<EventCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Event update
   */
  export type EventUpdateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The data needed to update a Event.
     * 
    **/
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs = {
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    where?: EventWhereInput
  }


  /**
   * Event upsert
   */
  export type EventUpsertArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The filter to search for the Event to update in case it exists.
     * 
    **/
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     * 
    **/
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }


  /**
   * Event delete
   */
  export type EventDeleteArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter which Event to delete.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs = {
    where?: EventWhereInput
  }


  /**
   * Event without action
   */
  export type EventArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
  }



  /**
   * Model EventRegistration
   */


  export type AggregateEventRegistration = {
    _count: EventRegistrationCountAggregateOutputType | null
    _avg: EventRegistrationAvgAggregateOutputType | null
    _sum: EventRegistrationSumAggregateOutputType | null
    _min: EventRegistrationMinAggregateOutputType | null
    _max: EventRegistrationMaxAggregateOutputType | null
  }

  export type EventRegistrationAvgAggregateOutputType = {
    eventId: number | null
  }

  export type EventRegistrationSumAggregateOutputType = {
    eventId: number | null
  }

  export type EventRegistrationMinAggregateOutputType = {
    eventId: number | null
    name: string | null
    email: string | null
    foodPreferences: string | null
    timestamp: Date | null
    verificationCode: string | null
    attended: boolean | null
  }

  export type EventRegistrationMaxAggregateOutputType = {
    eventId: number | null
    name: string | null
    email: string | null
    foodPreferences: string | null
    timestamp: Date | null
    verificationCode: string | null
    attended: boolean | null
  }

  export type EventRegistrationCountAggregateOutputType = {
    eventId: number
    name: number
    email: number
    foodPreferences: number
    timestamp: number
    verificationCode: number
    attended: number
    _all: number
  }


  export type EventRegistrationAvgAggregateInputType = {
    eventId?: true
  }

  export type EventRegistrationSumAggregateInputType = {
    eventId?: true
  }

  export type EventRegistrationMinAggregateInputType = {
    eventId?: true
    name?: true
    email?: true
    foodPreferences?: true
    timestamp?: true
    verificationCode?: true
    attended?: true
  }

  export type EventRegistrationMaxAggregateInputType = {
    eventId?: true
    name?: true
    email?: true
    foodPreferences?: true
    timestamp?: true
    verificationCode?: true
    attended?: true
  }

  export type EventRegistrationCountAggregateInputType = {
    eventId?: true
    name?: true
    email?: true
    foodPreferences?: true
    timestamp?: true
    verificationCode?: true
    attended?: true
    _all?: true
  }

  export type EventRegistrationAggregateArgs = {
    /**
     * Filter which EventRegistration to aggregate.
     * 
    **/
    where?: EventRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventRegistrations to fetch.
     * 
    **/
    orderBy?: Enumerable<EventRegistrationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EventRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventRegistrations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventRegistrations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventRegistrations
    **/
    _count?: true | EventRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventRegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventRegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventRegistrationMaxAggregateInputType
  }

  export type GetEventRegistrationAggregateType<T extends EventRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateEventRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventRegistration[P]>
      : GetScalarType<T[P], AggregateEventRegistration[P]>
  }




  export type EventRegistrationGroupByArgs = {
    where?: EventRegistrationWhereInput
    orderBy?: Enumerable<EventRegistrationOrderByWithAggregationInput>
    by: Array<EventRegistrationScalarFieldEnum>
    having?: EventRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventRegistrationCountAggregateInputType | true
    _avg?: EventRegistrationAvgAggregateInputType
    _sum?: EventRegistrationSumAggregateInputType
    _min?: EventRegistrationMinAggregateInputType
    _max?: EventRegistrationMaxAggregateInputType
  }


  export type EventRegistrationGroupByOutputType = {
    eventId: number
    name: string
    email: string
    foodPreferences: string | null
    timestamp: Date
    verificationCode: string
    attended: boolean
    _count: EventRegistrationCountAggregateOutputType | null
    _avg: EventRegistrationAvgAggregateOutputType | null
    _sum: EventRegistrationSumAggregateOutputType | null
    _min: EventRegistrationMinAggregateOutputType | null
    _max: EventRegistrationMaxAggregateOutputType | null
  }

  type GetEventRegistrationGroupByPayload<T extends EventRegistrationGroupByArgs> = Promise<
    Array<
      PickArray<EventRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], EventRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type EventRegistrationSelect = {
    eventId?: boolean
    name?: boolean
    email?: boolean
    foodPreferences?: boolean
    timestamp?: boolean
    verificationCode?: boolean
    attended?: boolean
    event?: boolean | EventArgs
  }

  export type EventRegistrationInclude = {
    event?: boolean | EventArgs
  }

  export type EventRegistrationGetPayload<
    S extends boolean | null | undefined | EventRegistrationArgs,
    U = keyof S
      > = S extends true
        ? EventRegistration
    : S extends undefined
    ? never
    : S extends EventRegistrationArgs | EventRegistrationFindManyArgs
    ?'include' extends U
    ? EventRegistration  & {
    [P in TrueKeys<S['include']>]: 
          P extends 'event'
        ? EventGetPayload<S['include'][P]> : never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof EventRegistration ?EventRegistration [P]
  : 
          P extends 'event'
        ? EventGetPayload<S['select'][P]> : never
  } 
    : EventRegistration
  : EventRegistration


  type EventRegistrationCountArgs = Merge<
    Omit<EventRegistrationFindManyArgs, 'select' | 'include'> & {
      select?: EventRegistrationCountAggregateInputType | true
    }
  >

  export interface EventRegistrationDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EventRegistration that matches the filter.
     * @param {EventRegistrationFindUniqueArgs} args - Arguments to find a EventRegistration
     * @example
     * // Get one EventRegistration
     * const eventRegistration = await prisma.eventRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventRegistrationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EventRegistrationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EventRegistration'> extends True ? CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>> : CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration | null >, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T> | null >>

    /**
     * Find the first EventRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationFindFirstArgs} args - Arguments to find a EventRegistration
     * @example
     * // Get one EventRegistration
     * const eventRegistration = await prisma.eventRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventRegistrationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EventRegistrationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EventRegistration'> extends True ? CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>> : CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration | null >, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T> | null >>

    /**
     * Find zero or more EventRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventRegistrations
     * const eventRegistrations = await prisma.eventRegistration.findMany()
     * 
     * // Get first 10 EventRegistrations
     * const eventRegistrations = await prisma.eventRegistration.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const eventRegistrationWithEventIdOnly = await prisma.eventRegistration.findMany({ select: { eventId: true } })
     * 
    **/
    findMany<T extends EventRegistrationFindManyArgs>(
      args?: SelectSubset<T, EventRegistrationFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EventRegistration>>, PrismaPromise<Array<EventRegistrationGetPayload<T>>>>

    /**
     * Create a EventRegistration.
     * @param {EventRegistrationCreateArgs} args - Arguments to create a EventRegistration.
     * @example
     * // Create one EventRegistration
     * const EventRegistration = await prisma.eventRegistration.create({
     *   data: {
     *     // ... data to create a EventRegistration
     *   }
     * })
     * 
    **/
    create<T extends EventRegistrationCreateArgs>(
      args: SelectSubset<T, EventRegistrationCreateArgs>
    ): CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>>

    /**
     * Create many EventRegistrations.
     *     @param {EventRegistrationCreateManyArgs} args - Arguments to create many EventRegistrations.
     *     @example
     *     // Create many EventRegistrations
     *     const eventRegistration = await prisma.eventRegistration.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventRegistrationCreateManyArgs>(
      args?: SelectSubset<T, EventRegistrationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EventRegistration.
     * @param {EventRegistrationDeleteArgs} args - Arguments to delete one EventRegistration.
     * @example
     * // Delete one EventRegistration
     * const EventRegistration = await prisma.eventRegistration.delete({
     *   where: {
     *     // ... filter to delete one EventRegistration
     *   }
     * })
     * 
    **/
    delete<T extends EventRegistrationDeleteArgs>(
      args: SelectSubset<T, EventRegistrationDeleteArgs>
    ): CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>>

    /**
     * Update one EventRegistration.
     * @param {EventRegistrationUpdateArgs} args - Arguments to update one EventRegistration.
     * @example
     * // Update one EventRegistration
     * const eventRegistration = await prisma.eventRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventRegistrationUpdateArgs>(
      args: SelectSubset<T, EventRegistrationUpdateArgs>
    ): CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>>

    /**
     * Delete zero or more EventRegistrations.
     * @param {EventRegistrationDeleteManyArgs} args - Arguments to filter EventRegistrations to delete.
     * @example
     * // Delete a few EventRegistrations
     * const { count } = await prisma.eventRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventRegistrationDeleteManyArgs>(
      args?: SelectSubset<T, EventRegistrationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventRegistrations
     * const eventRegistration = await prisma.eventRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventRegistrationUpdateManyArgs>(
      args: SelectSubset<T, EventRegistrationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EventRegistration.
     * @param {EventRegistrationUpsertArgs} args - Arguments to update or create a EventRegistration.
     * @example
     * // Update or create a EventRegistration
     * const eventRegistration = await prisma.eventRegistration.upsert({
     *   create: {
     *     // ... data to create a EventRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventRegistration we want to update
     *   }
     * })
    **/
    upsert<T extends EventRegistrationUpsertArgs>(
      args: SelectSubset<T, EventRegistrationUpsertArgs>
    ): CheckSelect<T, Prisma__EventRegistrationClient<EventRegistration>, Prisma__EventRegistrationClient<EventRegistrationGetPayload<T>>>

    /**
     * Count the number of EventRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationCountArgs} args - Arguments to filter EventRegistrations to count.
     * @example
     * // Count the number of EventRegistrations
     * const count = await prisma.eventRegistration.count({
     *   where: {
     *     // ... the filter for the EventRegistrations we want to count
     *   }
     * })
    **/
    count<T extends EventRegistrationCountArgs>(
      args?: Subset<T, EventRegistrationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventRegistrationAggregateArgs>(args: Subset<T, EventRegistrationAggregateArgs>): PrismaPromise<GetEventRegistrationAggregateType<T>>

    /**
     * Group by EventRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventRegistrationGroupByArgs} args - Group by arguments.
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
      T extends EventRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: EventRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, EventRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventRegistrationGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventRegistrationClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    event<T extends EventArgs = {}>(args?: Subset<T, EventArgs>): CheckSelect<T, Prisma__EventClient<Event | null >, Prisma__EventClient<EventGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EventRegistration findUnique
   */
  export type EventRegistrationFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * Throw an Error if a EventRegistration can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EventRegistration to fetch.
     * 
    **/
    where: EventRegistrationWhereUniqueInput
  }


  /**
   * EventRegistration findFirst
   */
  export type EventRegistrationFindFirstArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * Throw an Error if a EventRegistration can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EventRegistration to fetch.
     * 
    **/
    where?: EventRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventRegistrations to fetch.
     * 
    **/
    orderBy?: Enumerable<EventRegistrationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventRegistrations.
     * 
    **/
    cursor?: EventRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventRegistrations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventRegistrations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventRegistrations.
     * 
    **/
    distinct?: Enumerable<EventRegistrationScalarFieldEnum>
  }


  /**
   * EventRegistration findMany
   */
  export type EventRegistrationFindManyArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * Filter, which EventRegistrations to fetch.
     * 
    **/
    where?: EventRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventRegistrations to fetch.
     * 
    **/
    orderBy?: Enumerable<EventRegistrationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventRegistrations.
     * 
    **/
    cursor?: EventRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventRegistrations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventRegistrations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EventRegistrationScalarFieldEnum>
  }


  /**
   * EventRegistration create
   */
  export type EventRegistrationCreateArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * The data needed to create a EventRegistration.
     * 
    **/
    data: XOR<EventRegistrationCreateInput, EventRegistrationUncheckedCreateInput>
  }


  /**
   * EventRegistration createMany
   */
  export type EventRegistrationCreateManyArgs = {
    data: Enumerable<EventRegistrationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EventRegistration update
   */
  export type EventRegistrationUpdateArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * The data needed to update a EventRegistration.
     * 
    **/
    data: XOR<EventRegistrationUpdateInput, EventRegistrationUncheckedUpdateInput>
    /**
     * Choose, which EventRegistration to update.
     * 
    **/
    where: EventRegistrationWhereUniqueInput
  }


  /**
   * EventRegistration updateMany
   */
  export type EventRegistrationUpdateManyArgs = {
    data: XOR<EventRegistrationUpdateManyMutationInput, EventRegistrationUncheckedUpdateManyInput>
    where?: EventRegistrationWhereInput
  }


  /**
   * EventRegistration upsert
   */
  export type EventRegistrationUpsertArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * The filter to search for the EventRegistration to update in case it exists.
     * 
    **/
    where: EventRegistrationWhereUniqueInput
    /**
     * In case the EventRegistration found by the `where` argument doesn't exist, create a new EventRegistration with this data.
     * 
    **/
    create: XOR<EventRegistrationCreateInput, EventRegistrationUncheckedCreateInput>
    /**
     * In case the EventRegistration was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EventRegistrationUpdateInput, EventRegistrationUncheckedUpdateInput>
  }


  /**
   * EventRegistration delete
   */
  export type EventRegistrationDeleteArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
    /**
     * Filter which EventRegistration to delete.
     * 
    **/
    where: EventRegistrationWhereUniqueInput
  }


  /**
   * EventRegistration deleteMany
   */
  export type EventRegistrationDeleteManyArgs = {
    where?: EventRegistrationWhereInput
  }


  /**
   * EventRegistration without action
   */
  export type EventRegistrationArgs = {
    /**
     * Select specific fields to fetch from the EventRegistration
     * 
    **/
    select?: EventRegistrationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventRegistrationInclude | null
  }



  /**
   * Model JobAd
   */


  export type AggregateJobAd = {
    _count: JobAdCountAggregateOutputType | null
    _avg: JobAdAvgAggregateOutputType | null
    _sum: JobAdSumAggregateOutputType | null
    _min: JobAdMinAggregateOutputType | null
    _max: JobAdMaxAggregateOutputType | null
  }

  export type JobAdAvgAggregateOutputType = {
    id: number | null
    clicks: number | null
  }

  export type JobAdSumAggregateOutputType = {
    id: number | null
    clicks: number | null
  }

  export type JobAdMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    closesOn: Date | null
    url: string | null
    clicks: number | null
    imageUrl: string | null
    timestamp: Date | null
  }

  export type JobAdMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    closesOn: Date | null
    url: string | null
    clicks: number | null
    imageUrl: string | null
    timestamp: Date | null
  }

  export type JobAdCountAggregateOutputType = {
    id: number
    title: number
    description: number
    closesOn: number
    url: number
    clicks: number
    imageUrl: number
    timestamp: number
    _all: number
  }


  export type JobAdAvgAggregateInputType = {
    id?: true
    clicks?: true
  }

  export type JobAdSumAggregateInputType = {
    id?: true
    clicks?: true
  }

  export type JobAdMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    closesOn?: true
    url?: true
    clicks?: true
    imageUrl?: true
    timestamp?: true
  }

  export type JobAdMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    closesOn?: true
    url?: true
    clicks?: true
    imageUrl?: true
    timestamp?: true
  }

  export type JobAdCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    closesOn?: true
    url?: true
    clicks?: true
    imageUrl?: true
    timestamp?: true
    _all?: true
  }

  export type JobAdAggregateArgs = {
    /**
     * Filter which JobAd to aggregate.
     * 
    **/
    where?: JobAdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAds to fetch.
     * 
    **/
    orderBy?: Enumerable<JobAdOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: JobAdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobAds
    **/
    _count?: true | JobAdCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAdAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobAdSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobAdMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobAdMaxAggregateInputType
  }

  export type GetJobAdAggregateType<T extends JobAdAggregateArgs> = {
        [P in keyof T & keyof AggregateJobAd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobAd[P]>
      : GetScalarType<T[P], AggregateJobAd[P]>
  }




  export type JobAdGroupByArgs = {
    where?: JobAdWhereInput
    orderBy?: Enumerable<JobAdOrderByWithAggregationInput>
    by: Array<JobAdScalarFieldEnum>
    having?: JobAdScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobAdCountAggregateInputType | true
    _avg?: JobAdAvgAggregateInputType
    _sum?: JobAdSumAggregateInputType
    _min?: JobAdMinAggregateInputType
    _max?: JobAdMaxAggregateInputType
  }


  export type JobAdGroupByOutputType = {
    id: number
    title: string
    description: string
    closesOn: Date
    url: string
    clicks: number
    imageUrl: string | null
    timestamp: Date
    _count: JobAdCountAggregateOutputType | null
    _avg: JobAdAvgAggregateOutputType | null
    _sum: JobAdSumAggregateOutputType | null
    _min: JobAdMinAggregateOutputType | null
    _max: JobAdMaxAggregateOutputType | null
  }

  type GetJobAdGroupByPayload<T extends JobAdGroupByArgs> = Promise<
    Array<
      PickArray<JobAdGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobAdGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobAdGroupByOutputType[P]>
            : GetScalarType<T[P], JobAdGroupByOutputType[P]>
        }
      >
    >


  export type JobAdSelect = {
    id?: boolean
    title?: boolean
    description?: boolean
    closesOn?: boolean
    url?: boolean
    clicks?: boolean
    imageUrl?: boolean
    timestamp?: boolean
  }

  export type JobAdGetPayload<
    S extends boolean | null | undefined | JobAdArgs,
    U = keyof S
      > = S extends true
        ? JobAd
    : S extends undefined
    ? never
    : S extends JobAdArgs | JobAdFindManyArgs
    ?'include' extends U
    ? JobAd 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof JobAd ?JobAd [P]
  : 
     never
  } 
    : JobAd
  : JobAd


  type JobAdCountArgs = Merge<
    Omit<JobAdFindManyArgs, 'select' | 'include'> & {
      select?: JobAdCountAggregateInputType | true
    }
  >

  export interface JobAdDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one JobAd that matches the filter.
     * @param {JobAdFindUniqueArgs} args - Arguments to find a JobAd
     * @example
     * // Get one JobAd
     * const jobAd = await prisma.jobAd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JobAdFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, JobAdFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'JobAd'> extends True ? CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>> : CheckSelect<T, Prisma__JobAdClient<JobAd | null >, Prisma__JobAdClient<JobAdGetPayload<T> | null >>

    /**
     * Find the first JobAd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdFindFirstArgs} args - Arguments to find a JobAd
     * @example
     * // Get one JobAd
     * const jobAd = await prisma.jobAd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JobAdFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, JobAdFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'JobAd'> extends True ? CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>> : CheckSelect<T, Prisma__JobAdClient<JobAd | null >, Prisma__JobAdClient<JobAdGetPayload<T> | null >>

    /**
     * Find zero or more JobAds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobAds
     * const jobAds = await prisma.jobAd.findMany()
     * 
     * // Get first 10 JobAds
     * const jobAds = await prisma.jobAd.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobAdWithIdOnly = await prisma.jobAd.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JobAdFindManyArgs>(
      args?: SelectSubset<T, JobAdFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<JobAd>>, PrismaPromise<Array<JobAdGetPayload<T>>>>

    /**
     * Create a JobAd.
     * @param {JobAdCreateArgs} args - Arguments to create a JobAd.
     * @example
     * // Create one JobAd
     * const JobAd = await prisma.jobAd.create({
     *   data: {
     *     // ... data to create a JobAd
     *   }
     * })
     * 
    **/
    create<T extends JobAdCreateArgs>(
      args: SelectSubset<T, JobAdCreateArgs>
    ): CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>>

    /**
     * Create many JobAds.
     *     @param {JobAdCreateManyArgs} args - Arguments to create many JobAds.
     *     @example
     *     // Create many JobAds
     *     const jobAd = await prisma.jobAd.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends JobAdCreateManyArgs>(
      args?: SelectSubset<T, JobAdCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a JobAd.
     * @param {JobAdDeleteArgs} args - Arguments to delete one JobAd.
     * @example
     * // Delete one JobAd
     * const JobAd = await prisma.jobAd.delete({
     *   where: {
     *     // ... filter to delete one JobAd
     *   }
     * })
     * 
    **/
    delete<T extends JobAdDeleteArgs>(
      args: SelectSubset<T, JobAdDeleteArgs>
    ): CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>>

    /**
     * Update one JobAd.
     * @param {JobAdUpdateArgs} args - Arguments to update one JobAd.
     * @example
     * // Update one JobAd
     * const jobAd = await prisma.jobAd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JobAdUpdateArgs>(
      args: SelectSubset<T, JobAdUpdateArgs>
    ): CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>>

    /**
     * Delete zero or more JobAds.
     * @param {JobAdDeleteManyArgs} args - Arguments to filter JobAds to delete.
     * @example
     * // Delete a few JobAds
     * const { count } = await prisma.jobAd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JobAdDeleteManyArgs>(
      args?: SelectSubset<T, JobAdDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobAds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobAds
     * const jobAd = await prisma.jobAd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JobAdUpdateManyArgs>(
      args: SelectSubset<T, JobAdUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one JobAd.
     * @param {JobAdUpsertArgs} args - Arguments to update or create a JobAd.
     * @example
     * // Update or create a JobAd
     * const jobAd = await prisma.jobAd.upsert({
     *   create: {
     *     // ... data to create a JobAd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobAd we want to update
     *   }
     * })
    **/
    upsert<T extends JobAdUpsertArgs>(
      args: SelectSubset<T, JobAdUpsertArgs>
    ): CheckSelect<T, Prisma__JobAdClient<JobAd>, Prisma__JobAdClient<JobAdGetPayload<T>>>

    /**
     * Count the number of JobAds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdCountArgs} args - Arguments to filter JobAds to count.
     * @example
     * // Count the number of JobAds
     * const count = await prisma.jobAd.count({
     *   where: {
     *     // ... the filter for the JobAds we want to count
     *   }
     * })
    **/
    count<T extends JobAdCountArgs>(
      args?: Subset<T, JobAdCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobAdCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobAd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAdAggregateArgs>(args: Subset<T, JobAdAggregateArgs>): PrismaPromise<GetJobAdAggregateType<T>>

    /**
     * Group by JobAd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAdGroupByArgs} args - Group by arguments.
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
      T extends JobAdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobAdGroupByArgs['orderBy'] }
        : { orderBy?: JobAdGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, JobAdGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobAdGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobAd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__JobAdClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * JobAd findUnique
   */
  export type JobAdFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * Throw an Error if a JobAd can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which JobAd to fetch.
     * 
    **/
    where: JobAdWhereUniqueInput
  }


  /**
   * JobAd findFirst
   */
  export type JobAdFindFirstArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * Throw an Error if a JobAd can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which JobAd to fetch.
     * 
    **/
    where?: JobAdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAds to fetch.
     * 
    **/
    orderBy?: Enumerable<JobAdOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobAds.
     * 
    **/
    cursor?: JobAdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobAds.
     * 
    **/
    distinct?: Enumerable<JobAdScalarFieldEnum>
  }


  /**
   * JobAd findMany
   */
  export type JobAdFindManyArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * Filter, which JobAds to fetch.
     * 
    **/
    where?: JobAdWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobAds to fetch.
     * 
    **/
    orderBy?: Enumerable<JobAdOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobAds.
     * 
    **/
    cursor?: JobAdWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobAds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobAds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<JobAdScalarFieldEnum>
  }


  /**
   * JobAd create
   */
  export type JobAdCreateArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * The data needed to create a JobAd.
     * 
    **/
    data: XOR<JobAdCreateInput, JobAdUncheckedCreateInput>
  }


  /**
   * JobAd createMany
   */
  export type JobAdCreateManyArgs = {
    data: Enumerable<JobAdCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * JobAd update
   */
  export type JobAdUpdateArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * The data needed to update a JobAd.
     * 
    **/
    data: XOR<JobAdUpdateInput, JobAdUncheckedUpdateInput>
    /**
     * Choose, which JobAd to update.
     * 
    **/
    where: JobAdWhereUniqueInput
  }


  /**
   * JobAd updateMany
   */
  export type JobAdUpdateManyArgs = {
    data: XOR<JobAdUpdateManyMutationInput, JobAdUncheckedUpdateManyInput>
    where?: JobAdWhereInput
  }


  /**
   * JobAd upsert
   */
  export type JobAdUpsertArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * The filter to search for the JobAd to update in case it exists.
     * 
    **/
    where: JobAdWhereUniqueInput
    /**
     * In case the JobAd found by the `where` argument doesn't exist, create a new JobAd with this data.
     * 
    **/
    create: XOR<JobAdCreateInput, JobAdUncheckedCreateInput>
    /**
     * In case the JobAd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<JobAdUpdateInput, JobAdUncheckedUpdateInput>
  }


  /**
   * JobAd delete
   */
  export type JobAdDeleteArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
    /**
     * Filter which JobAd to delete.
     * 
    **/
    where: JobAdWhereUniqueInput
  }


  /**
   * JobAd deleteMany
   */
  export type JobAdDeleteManyArgs = {
    where?: JobAdWhereInput
  }


  /**
   * JobAd without action
   */
  export type JobAdArgs = {
    /**
     * Select specific fields to fetch from the JobAd
     * 
    **/
    select?: JobAdSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ProfileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    email: 'email',
    imageUrl: 'imageUrl'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    date: 'date',
    maxParticipants: 'maxParticipants',
    registrationOpens: 'registrationOpens',
    registrationCloses: 'registrationCloses',
    imageUrl: 'imageUrl',
    foodWillBeServed: 'foodWillBeServed',
    archived: 'archived'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const EventRegistrationScalarFieldEnum: {
    eventId: 'eventId',
    name: 'name',
    email: 'email',
    foodPreferences: 'foodPreferences',
    timestamp: 'timestamp',
    verificationCode: 'verificationCode',
    attended: 'attended'
  };

  export type EventRegistrationScalarFieldEnum = (typeof EventRegistrationScalarFieldEnum)[keyof typeof EventRegistrationScalarFieldEnum]


  export const JobAdScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    closesOn: 'closesOn',
    url: 'url',
    clicks: 'clicks',
    imageUrl: 'imageUrl',
    timestamp: 'timestamp'
  };

  export type JobAdScalarFieldEnum = (typeof JobAdScalarFieldEnum)[keyof typeof JobAdScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: IntFilter | number
    name?: StringNullableFilter | string | null
    title?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    imageUrl?: StringNullableFilter | string | null
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: number
  }

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringNullableWithAggregatesFilter | string | null
    title?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
    imageUrl?: StringNullableWithAggregatesFilter | string | null
  }

  export type EventWhereInput = {
    AND?: Enumerable<EventWhereInput>
    OR?: Enumerable<EventWhereInput>
    NOT?: Enumerable<EventWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    description?: StringFilter | string
    date?: DateTimeFilter | Date | string
    maxParticipants?: IntFilter | number
    registrationOpens?: DateTimeFilter | Date | string
    registrationCloses?: DateTimeFilter | Date | string
    imageUrl?: StringNullableFilter | string | null
    foodWillBeServed?: BoolFilter | boolean
    archived?: BoolFilter | boolean
    tickets?: EventRegistrationListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    maxParticipants?: SortOrder
    registrationOpens?: SortOrder
    registrationCloses?: SortOrder
    imageUrl?: SortOrder
    foodWillBeServed?: SortOrder
    archived?: SortOrder
    tickets?: EventRegistrationOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = {
    id?: number
  }

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    maxParticipants?: SortOrder
    registrationOpens?: SortOrder
    registrationCloses?: SortOrder
    imageUrl?: SortOrder
    foodWillBeServed?: SortOrder
    archived?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EventScalarWhereWithAggregatesInput>
    OR?: Enumerable<EventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EventScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    maxParticipants?: IntWithAggregatesFilter | number
    registrationOpens?: DateTimeWithAggregatesFilter | Date | string
    registrationCloses?: DateTimeWithAggregatesFilter | Date | string
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    foodWillBeServed?: BoolWithAggregatesFilter | boolean
    archived?: BoolWithAggregatesFilter | boolean
  }

  export type EventRegistrationWhereInput = {
    AND?: Enumerable<EventRegistrationWhereInput>
    OR?: Enumerable<EventRegistrationWhereInput>
    NOT?: Enumerable<EventRegistrationWhereInput>
    eventId?: IntFilter | number
    name?: StringFilter | string
    email?: StringFilter | string
    foodPreferences?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
    verificationCode?: StringFilter | string
    attended?: BoolFilter | boolean
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type EventRegistrationOrderByWithRelationInput = {
    eventId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    foodPreferences?: SortOrder
    timestamp?: SortOrder
    verificationCode?: SortOrder
    attended?: SortOrder
    event?: EventOrderByWithRelationInput
  }

  export type EventRegistrationWhereUniqueInput = {
    verificationCode?: string
  }

  export type EventRegistrationOrderByWithAggregationInput = {
    eventId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    foodPreferences?: SortOrder
    timestamp?: SortOrder
    verificationCode?: SortOrder
    attended?: SortOrder
    _count?: EventRegistrationCountOrderByAggregateInput
    _avg?: EventRegistrationAvgOrderByAggregateInput
    _max?: EventRegistrationMaxOrderByAggregateInput
    _min?: EventRegistrationMinOrderByAggregateInput
    _sum?: EventRegistrationSumOrderByAggregateInput
  }

  export type EventRegistrationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EventRegistrationScalarWhereWithAggregatesInput>
    OR?: Enumerable<EventRegistrationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EventRegistrationScalarWhereWithAggregatesInput>
    eventId?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    foodPreferences?: StringNullableWithAggregatesFilter | string | null
    timestamp?: DateTimeWithAggregatesFilter | Date | string
    verificationCode?: StringWithAggregatesFilter | string
    attended?: BoolWithAggregatesFilter | boolean
  }

  export type JobAdWhereInput = {
    AND?: Enumerable<JobAdWhereInput>
    OR?: Enumerable<JobAdWhereInput>
    NOT?: Enumerable<JobAdWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    description?: StringFilter | string
    closesOn?: DateTimeFilter | Date | string
    url?: StringFilter | string
    clicks?: IntFilter | number
    imageUrl?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
  }

  export type JobAdOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    closesOn?: SortOrder
    url?: SortOrder
    clicks?: SortOrder
    imageUrl?: SortOrder
    timestamp?: SortOrder
  }

  export type JobAdWhereUniqueInput = {
    id?: number
  }

  export type JobAdOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    closesOn?: SortOrder
    url?: SortOrder
    clicks?: SortOrder
    imageUrl?: SortOrder
    timestamp?: SortOrder
    _count?: JobAdCountOrderByAggregateInput
    _avg?: JobAdAvgOrderByAggregateInput
    _max?: JobAdMaxOrderByAggregateInput
    _min?: JobAdMinOrderByAggregateInput
    _sum?: JobAdSumOrderByAggregateInput
  }

  export type JobAdScalarWhereWithAggregatesInput = {
    AND?: Enumerable<JobAdScalarWhereWithAggregatesInput>
    OR?: Enumerable<JobAdScalarWhereWithAggregatesInput>
    NOT?: Enumerable<JobAdScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    closesOn?: DateTimeWithAggregatesFilter | Date | string
    url?: StringWithAggregatesFilter | string
    clicks?: IntWithAggregatesFilter | number
    imageUrl?: StringNullableWithAggregatesFilter | string | null
    timestamp?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ProfileCreateInput = {
    name?: string | null
    title?: string | null
    email?: string | null
    imageUrl?: string | null
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    name?: string | null
    title?: string | null
    email?: string | null
    imageUrl?: string | null
  }

  export type ProfileUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileCreateManyInput = {
    id?: number
    name?: string | null
    title?: string | null
    email?: string | null
    imageUrl?: string | null
  }

  export type ProfileUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateInput = {
    title: string
    description: string
    date: Date | string
    maxParticipants: number
    registrationOpens: Date | string
    registrationCloses: Date | string
    imageUrl?: string | null
    foodWillBeServed: boolean
    archived?: boolean
    tickets?: EventRegistrationCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    date: Date | string
    maxParticipants: number
    registrationOpens: Date | string
    registrationCloses: Date | string
    imageUrl?: string | null
    foodWillBeServed: boolean
    archived?: boolean
    tickets?: EventRegistrationUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    tickets?: EventRegistrationUpdateManyWithoutEventInput
  }

  export type EventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
    tickets?: EventRegistrationUncheckedUpdateManyWithoutEventInput
  }

  export type EventCreateManyInput = {
    id?: number
    title: string
    description: string
    date: Date | string
    maxParticipants: number
    registrationOpens: Date | string
    registrationCloses: Date | string
    imageUrl?: string | null
    foodWillBeServed: boolean
    archived?: boolean
  }

  export type EventUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationCreateInput = {
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
    event: EventCreateNestedOneWithoutTicketsInput
  }

  export type EventRegistrationUncheckedCreateInput = {
    eventId: number
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
  }

  export type EventRegistrationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
    event?: EventUpdateOneRequiredWithoutTicketsInput
  }

  export type EventRegistrationUncheckedUpdateInput = {
    eventId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationCreateManyInput = {
    eventId: number
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
  }

  export type EventRegistrationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationUncheckedUpdateManyInput = {
    eventId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobAdCreateInput = {
    title: string
    description: string
    closesOn: Date | string
    url: string
    clicks?: number
    imageUrl?: string | null
    timestamp?: Date | string
  }

  export type JobAdUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    closesOn: Date | string
    url: string
    clicks?: number
    imageUrl?: string | null
    timestamp?: Date | string
  }

  export type JobAdUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    closesOn?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobAdUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    closesOn?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobAdCreateManyInput = {
    id?: number
    title: string
    description: string
    closesOn: Date | string
    url: string
    clicks?: number
    imageUrl?: string | null
    timestamp?: Date | string
  }

  export type JobAdUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    closesOn?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobAdUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    closesOn?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    clicks?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    email?: SortOrder
    imageUrl?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EventRegistrationListRelationFilter = {
    every?: EventRegistrationWhereInput
    some?: EventRegistrationWhereInput
    none?: EventRegistrationWhereInput
  }

  export type EventRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    maxParticipants?: SortOrder
    registrationOpens?: SortOrder
    registrationCloses?: SortOrder
    imageUrl?: SortOrder
    foodWillBeServed?: SortOrder
    archived?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    id?: SortOrder
    maxParticipants?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    maxParticipants?: SortOrder
    registrationOpens?: SortOrder
    registrationCloses?: SortOrder
    imageUrl?: SortOrder
    foodWillBeServed?: SortOrder
    archived?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    maxParticipants?: SortOrder
    registrationOpens?: SortOrder
    registrationCloses?: SortOrder
    imageUrl?: SortOrder
    foodWillBeServed?: SortOrder
    archived?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    id?: SortOrder
    maxParticipants?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type EventRegistrationCountOrderByAggregateInput = {
    eventId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    foodPreferences?: SortOrder
    timestamp?: SortOrder
    verificationCode?: SortOrder
    attended?: SortOrder
  }

  export type EventRegistrationAvgOrderByAggregateInput = {
    eventId?: SortOrder
  }

  export type EventRegistrationMaxOrderByAggregateInput = {
    eventId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    foodPreferences?: SortOrder
    timestamp?: SortOrder
    verificationCode?: SortOrder
    attended?: SortOrder
  }

  export type EventRegistrationMinOrderByAggregateInput = {
    eventId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    foodPreferences?: SortOrder
    timestamp?: SortOrder
    verificationCode?: SortOrder
    attended?: SortOrder
  }

  export type EventRegistrationSumOrderByAggregateInput = {
    eventId?: SortOrder
  }

  export type JobAdCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    closesOn?: SortOrder
    url?: SortOrder
    clicks?: SortOrder
    imageUrl?: SortOrder
    timestamp?: SortOrder
  }

  export type JobAdAvgOrderByAggregateInput = {
    id?: SortOrder
    clicks?: SortOrder
  }

  export type JobAdMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    closesOn?: SortOrder
    url?: SortOrder
    clicks?: SortOrder
    imageUrl?: SortOrder
    timestamp?: SortOrder
  }

  export type JobAdMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    closesOn?: SortOrder
    url?: SortOrder
    clicks?: SortOrder
    imageUrl?: SortOrder
    timestamp?: SortOrder
  }

  export type JobAdSumOrderByAggregateInput = {
    id?: SortOrder
    clicks?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventRegistrationCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<EventRegistrationCreateWithoutEventInput>, Enumerable<EventRegistrationUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<EventRegistrationCreateOrConnectWithoutEventInput>
    createMany?: EventRegistrationCreateManyEventInputEnvelope
    connect?: Enumerable<EventRegistrationWhereUniqueInput>
  }

  export type EventRegistrationUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<EventRegistrationCreateWithoutEventInput>, Enumerable<EventRegistrationUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<EventRegistrationCreateOrConnectWithoutEventInput>
    createMany?: EventRegistrationCreateManyEventInputEnvelope
    connect?: Enumerable<EventRegistrationWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EventRegistrationUpdateManyWithoutEventInput = {
    create?: XOR<Enumerable<EventRegistrationCreateWithoutEventInput>, Enumerable<EventRegistrationUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<EventRegistrationCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<EventRegistrationUpsertWithWhereUniqueWithoutEventInput>
    createMany?: EventRegistrationCreateManyEventInputEnvelope
    set?: Enumerable<EventRegistrationWhereUniqueInput>
    disconnect?: Enumerable<EventRegistrationWhereUniqueInput>
    delete?: Enumerable<EventRegistrationWhereUniqueInput>
    connect?: Enumerable<EventRegistrationWhereUniqueInput>
    update?: Enumerable<EventRegistrationUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<EventRegistrationUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<EventRegistrationScalarWhereInput>
  }

  export type EventRegistrationUncheckedUpdateManyWithoutEventInput = {
    create?: XOR<Enumerable<EventRegistrationCreateWithoutEventInput>, Enumerable<EventRegistrationUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<EventRegistrationCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<EventRegistrationUpsertWithWhereUniqueWithoutEventInput>
    createMany?: EventRegistrationCreateManyEventInputEnvelope
    set?: Enumerable<EventRegistrationWhereUniqueInput>
    disconnect?: Enumerable<EventRegistrationWhereUniqueInput>
    delete?: Enumerable<EventRegistrationWhereUniqueInput>
    connect?: Enumerable<EventRegistrationWhereUniqueInput>
    update?: Enumerable<EventRegistrationUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<EventRegistrationUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<EventRegistrationScalarWhereInput>
  }

  export type EventCreateNestedOneWithoutTicketsInput = {
    create?: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: EventCreateOrConnectWithoutTicketsInput
    connect?: EventWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutTicketsInput = {
    create?: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: EventCreateOrConnectWithoutTicketsInput
    upsert?: EventUpsertWithoutTicketsInput
    connect?: EventWhereUniqueInput
    update?: XOR<EventUpdateWithoutTicketsInput, EventUncheckedUpdateWithoutTicketsInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type EventRegistrationCreateWithoutEventInput = {
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
  }

  export type EventRegistrationUncheckedCreateWithoutEventInput = {
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
  }

  export type EventRegistrationCreateOrConnectWithoutEventInput = {
    where: EventRegistrationWhereUniqueInput
    create: XOR<EventRegistrationCreateWithoutEventInput, EventRegistrationUncheckedCreateWithoutEventInput>
  }

  export type EventRegistrationCreateManyEventInputEnvelope = {
    data: Enumerable<EventRegistrationCreateManyEventInput>
    skipDuplicates?: boolean
  }

  export type EventRegistrationUpsertWithWhereUniqueWithoutEventInput = {
    where: EventRegistrationWhereUniqueInput
    update: XOR<EventRegistrationUpdateWithoutEventInput, EventRegistrationUncheckedUpdateWithoutEventInput>
    create: XOR<EventRegistrationCreateWithoutEventInput, EventRegistrationUncheckedCreateWithoutEventInput>
  }

  export type EventRegistrationUpdateWithWhereUniqueWithoutEventInput = {
    where: EventRegistrationWhereUniqueInput
    data: XOR<EventRegistrationUpdateWithoutEventInput, EventRegistrationUncheckedUpdateWithoutEventInput>
  }

  export type EventRegistrationUpdateManyWithWhereWithoutEventInput = {
    where: EventRegistrationScalarWhereInput
    data: XOR<EventRegistrationUpdateManyMutationInput, EventRegistrationUncheckedUpdateManyWithoutTicketsInput>
  }

  export type EventRegistrationScalarWhereInput = {
    AND?: Enumerable<EventRegistrationScalarWhereInput>
    OR?: Enumerable<EventRegistrationScalarWhereInput>
    NOT?: Enumerable<EventRegistrationScalarWhereInput>
    eventId?: IntFilter | number
    name?: StringFilter | string
    email?: StringFilter | string
    foodPreferences?: StringNullableFilter | string | null
    timestamp?: DateTimeFilter | Date | string
    verificationCode?: StringFilter | string
    attended?: BoolFilter | boolean
  }

  export type EventCreateWithoutTicketsInput = {
    title: string
    description: string
    date: Date | string
    maxParticipants: number
    registrationOpens: Date | string
    registrationCloses: Date | string
    imageUrl?: string | null
    foodWillBeServed: boolean
    archived?: boolean
  }

  export type EventUncheckedCreateWithoutTicketsInput = {
    id?: number
    title: string
    description: string
    date: Date | string
    maxParticipants: number
    registrationOpens: Date | string
    registrationCloses: Date | string
    imageUrl?: string | null
    foodWillBeServed: boolean
    archived?: boolean
  }

  export type EventCreateOrConnectWithoutTicketsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
  }

  export type EventUpsertWithoutTicketsInput = {
    update: XOR<EventUpdateWithoutTicketsInput, EventUncheckedUpdateWithoutTicketsInput>
    create: XOR<EventCreateWithoutTicketsInput, EventUncheckedCreateWithoutTicketsInput>
  }

  export type EventUpdateWithoutTicketsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventUncheckedUpdateWithoutTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    registrationOpens?: DateTimeFieldUpdateOperationsInput | Date | string
    registrationCloses?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    foodWillBeServed?: BoolFieldUpdateOperationsInput | boolean
    archived?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationCreateManyEventInput = {
    name: string
    email: string
    foodPreferences?: string | null
    timestamp?: Date | string
    verificationCode: string
    attended?: boolean
  }

  export type EventRegistrationUpdateWithoutEventInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationUncheckedUpdateWithoutEventInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EventRegistrationUncheckedUpdateManyWithoutTicketsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    foodPreferences?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    attended?: BoolFieldUpdateOperationsInput | boolean
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
  export const dmmf: runtime.DMMF.Document;
}