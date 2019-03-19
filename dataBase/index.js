var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/runoob";

/**
 * 链接数据库
 */
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    createColl(db)
    // db.close()
});

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = [
//         { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn' },
//         { name: 'Google', url: 'https://www.google.com', type: 'en' },
//         { name: 'Facebook', url: 'https://www.google.com', type: 'en' }
//     ];
//     dbo.collection("site").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });
/**
 * 
 * @param {*} db 
 * 创建集合
 */
function createColl(db) {
    var dbase = db.db("runoob");
    dbase.createCollection('money', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
    });
    // insertData(dbase)
    // insertManyData(dbase)
    // collFind(dbase)
    updataMylog(dbase)
    db.close();
}
/**
 * 
 * @param {*} db 
 * 插入数据
 */
function insertData(dbase) {
    var myobj = { name: "money集合" };
    dbase.collection("money").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        // db.close();
    });
}
/**
 * 
 * @param {*} dbase 
 * 插入多条数据
 */
function insertManyData(dbase) {
    var myobj = [
        { name: 'chrome' },
        { name: 'Google' },
        { name: 'Facebook' }
    ];
    dbase.collection("money").insertMany(myobj, function (err, res) {
        if (err) throw err
        console.log('插入文档数量为' + res.insertedCount);
    })
}
/**
 * 
 * @param {*} dbase 
 * 查询数据
 */
function collFind(dbase) {
    dbase.collection("site").find({}).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
    });
}
/**
 * 更新数据
 */
function updataMylog(dbase) {
    var whereStr = { "name": 'Google' };  // 查询条件
    var updateStr = { $set: { "url": "新的地址" } };
    dbase.collection("money").updateOne(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        // db.close();
    });
}