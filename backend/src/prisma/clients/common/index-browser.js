
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.7.0
 * Query Engine version: 8746e055198f517658c08a0c426c7eec87f5a85f
 */
Prisma.prismaVersion = {
  client: "3.7.0",
  engine: "8746e055198f517658c08a0c426c7eec87f5a85f"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.ProfileScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  title: 'title',
  email: 'email',
  imageUrl: 'imageUrl'
});

exports.Prisma.EventScalarFieldEnum = makeEnum({
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
});

exports.Prisma.EventRegistrationScalarFieldEnum = makeEnum({
  eventId: 'eventId',
  name: 'name',
  email: 'email',
  foodPreferences: 'foodPreferences',
  timestamp: 'timestamp',
  verificationCode: 'verificationCode',
  attended: 'attended'
});

exports.Prisma.JobAdScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  description: 'description',
  closesOn: 'closesOn',
  url: 'url',
  clicks: 'clicks',
  imageUrl: 'imageUrl',
  timestamp: 'timestamp'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});


exports.Prisma.ModelName = makeEnum({
  Profile: 'Profile',
  Event: 'Event',
  EventRegistration: 'EventRegistration',
  JobAd: 'JobAd'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
