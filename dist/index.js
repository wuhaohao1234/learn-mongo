"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class OperationMongo {
    link(url) {
        let _this = this;
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(url, (err, db) => {
                if (err) {
                    throw reject(err);
                }
                _this.db = db;
                console.log('连接数据库成功');
                resolve(_this);
            });
        });
    }
    createTable(runoob, siteName) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(runoob);
            dbase.createCollection(siteName, (err, res) => {
                if (err) {
                    throw reject(err);
                }
                console.log(siteName + '集合创建成功');
                resolve(_this);
            });
        });
    }
    insertOneData(runoob, siteName, dataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).insertOne(dataBase, (err, res) => {
                if (err) {
                    throw reject(err);
                }
                console.log("文档插入成功");
                resolve(_this);
            });
        });
    }
    insertMoneyData(runoob, siteName, dataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resovle, reject) => {
            dbase.collection(siteName).insertMany(dataBase, function (err, res) {
                if (err) {
                    throw reject(err);
                }
                console.log(res.insertedCount + "条数据插入成功");
                resovle(_this);
            });
        });
    }
    findData(runoob, siteName) {
        let dbase = this.db.db(runoob);
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).find({}).toArray((err, result) => {
                if (err) {
                    throw reject(err);
                }
                return resolve(result);
            });
        });
    }
    findOwnerData(runoob, siteName, dataBase) {
        let dbase = this.db.db(runoob);
        return new Promise((resolve, reject) => {
            let res = dbase.collection(siteName).find(dataBase).toArray((err, result) => {
                if (err) {
                    throw err;
                }
                return result;
            });
            return resolve(res);
        });
    }
    upDataOwner(runoob, siteName, dataBase, newDataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).updateOne(dataBase, newDataBase, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('更新成功');
                resolve(_this);
            });
        });
    }
    upDataMany(runoob, siteName, dataBase, newDataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).updateMany(dataBase, newDataBase, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.result.nModified + " 条文档被更新");
                resolve(_this);
            });
        });
    }
    deleteData(runoob, siteName, dataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).deleteOne(dataBase, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log('删除数据成功');
                return resolve(_this);
            });
        });
    }
    deleteDataMany(runoob, siteName, dataBase) {
        let dbase = this.db.db(runoob);
        let _this = this;
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).deleteMany(dataBase, (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res.result.n + " 条文档被删除");
                return resolve(_this);
            });
        });
    }
}
exports.default = OperationMongo;
//# sourceMappingURL=index.js.map