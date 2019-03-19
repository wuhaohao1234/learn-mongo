# learn-mongo

>  mongodb文档

## 创建数据库并链接

1. 首先当前目录下创建data

2. 然后data内部创建db

3. 执行命令

`mongod --dbpath D:\workTest\learn-mongo\data\db`

4. 链接mongodb数据库

新建cmd输入`mongo`

## 数据库基本操作命令

1. 查看当前有哪些数据库

`show dbs`

2. 查看当前正在使用的数据库(默认为test)

`db`

3. 选择local数据库

`use local`

确认:`db`

4. 新建userData数据库

`use userData`此时正在使用的数据库为userData,这里由于userData内部没有数据，所以暂时无法查看

5. 在userData插入一条数据

`db.userData.insert({"name":"阿布","age":23,"height":175})`

6. 查看userData内部的数据

`db.userData.find()`

7. 删除当前数据库(注意，请先新建一个数据库再删除)

`db.dropDatabase()`

8. 创建coll集合

`db.createCollection("coll")`

9. 查看集合

`show collections` 或者  `show tables`

在mongodb中无需创建集合：db.newColl.insert({"name":"newColl集合已经创建"}),这样就创建了一个newColl集合

10. 删除集合

show collections查看已有的集合

`db.coll.drop()`查出coll集合，返回true为成功

## nodejs使用mongodb

### 1、初始化项目工程

`yarn init -y`

`yarn add mongodb -D`

### 2、新建server.js链接数据库(前提:数据库已经开启)

```
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/runoob";

/**
 * 链接数据库
 */ 
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
});
```

### 3、创建集合site

```
function createColl(db) {
    var dbase = db.db("runoob");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
    });
    db.close();
}
```
### 4、插入数据

```
function insertData(dbase) {
    var myobj = { name: "site集合" };
    dbase.collection("site").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        // db.close();
    });
}
```

### 5、插入多条数据

```
function insertManyData(dbase) {
    var myobj = [
        { name: 'chrome' },
        { name: 'Google' },
        { name: 'Facebook' }
    ];
    dbase.collection("money").insertMany(myobj,function (err,res) {
        if(err) throw err
        console.log('插入文档数量为' + res.insertedCount);
    })
}
```

### 6、查询数据

```
function collFind(dbase) {
    dbase.collection("site").find({}).toArray(function (err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
    });
}
```

### 7、更新数据