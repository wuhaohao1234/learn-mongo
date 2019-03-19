import OperationMongo from './index'
let operation = new OperationMongo()
operation.link('mongodb://localhost:27017/runoob')
.then((result) => {
    return result.createTable('UserData', 'user')
})
.then((result) => {
    return result.insertOneData('UserData', 'user', {
        name: '程序员',
        age : 23
    })
})
.then((result) => {
    return result.findData('UserData', 'user')
}).then((result) => {
    console.log(result);
})