"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let operation = new index_1.default();
operation.link('mongodb://localhost:27017/runoob')
    .then((result) => {
    return result.createTable('UserData', 'user');
})
    .then((result) => {
    return result.insertOneData('UserData', 'user', {
        name: '程序员',
        age: 23
    });
})
    .then((result) => {
    return result.findData('UserData', 'user');
}).then((result) => {
    console.log(result);
});
//# sourceMappingURL=test.js.map