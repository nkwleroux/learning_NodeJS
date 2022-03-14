//local
const secret = "super secret";
//shared
const name1 = "a";
const name2 = "b";

//to use shared data between files. Need to use module.exports
module.exports = { name1, name2 };

//displays info about the module (only if "module" is printed)
//console.log(module)
