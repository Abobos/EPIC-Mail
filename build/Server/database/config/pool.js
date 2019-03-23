"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var development = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};
var test = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE_TEST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
}; // const production = {
//   User: bdcuzlctcqqapn,
//   Host: ec2-107-20-177-161.compute-1.amazonaws.com,
//   Database: process.env.PGDATABASE_PRODUCTION,
//   Password: 01f7edb32a851aca98bd9b9092360dffc2b9845dbf705ec2dc13a1de2a240bb4,
//   Port: process.env.PGPORT,
// };

var config = development;
if (process.env.NODE_ENV === 'test') config = test;
if (process.env.NODE_ENV === 'production') config = production;
var pool = new _pg.default.Pool(config);
var _default = pool;
exports.default = _default;