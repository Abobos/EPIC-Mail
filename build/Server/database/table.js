"use strict";

var _pool = _interopRequireDefault(require("./config/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUserTable = "\nDROP TABLE IF EXISTS users CASCADE;\nCREATE TABLE users(\n         id SERIAL NOT NULL PRIMARY KEY,\n         firstname VARCHAR(40) NOT NULL,\n         lastname VARCHAR(40) NOT NULL,\n         email VARCHAR(50) NOT NULL,\n         password VARCHAR(255) NOT NULL\n      );";

_pool.default.query(createUserTable).then(function (res) {
  console.log(res);

  _pool.default.end();
}).catch(function (err) {
  console.log(err);

  _pool.default.end();
});