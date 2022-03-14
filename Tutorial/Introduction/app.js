const names = require("./module_name");
const sayHi = require("./module_util");
const data = require("./module_arrays");

//invoking a module
require("./module_test");

sayHi(data.singlePerson.name);
sayHi(names.name1);
sayHi(names.name2);
sayHi("test");
