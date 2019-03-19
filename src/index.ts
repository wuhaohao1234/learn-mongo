// let MongoClient = require('mongodb').MongoClient;
import {MongoClient} from 'mongodb'

interface IDataBase {
    [index: string]: any
}

class OperationMongo {
    public db: any
    /**
     * 
     * @param url 数据库地址
     * 链接数据库
     */ 
    public link(url: string): Promise<this> {
        let _this = this
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) { throw reject(err) }
                _this.db = db
                console.log('连接数据库成功');
                resolve(_this)
            })
        })
    }
    /**
     * 
     * @param siteName 集合名称
     * @param runoob 数据库名
     * 创建集合
     */ 
    public createTable(runoob: string, siteName: string): Promise<this> {
        let _this = this
        return new Promise((resolve, reject) => {
            let dbase = _this.db.db(runoob)
            dbase.createCollection(siteName, (err: boolean, res: any) => {
                if (err) { throw reject(err); }
                console.log(siteName + '集合创建成功');
                resolve(_this)
            })
        })
    }
    /**
     * 插入一条数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 数据
     */
    public insertOneData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).insertOne(dataBase, (err: boolean, res: any) => {
                if (err) { throw reject(err); }
                console.log("文档插入成功");
                resolve(_this)
            });
        })
    }
    /**
     * 插入多条数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 数据
     */
    public insertMoneyData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resovle, reject) => {
            dbase.collection(siteName).insertMany(dataBase, function(err: boolean, res: any) {
                if (err) { throw reject(err); }
                console.log(res.insertedCount + "条数据插入成功");
                resovle(_this)
            });
        })
    }
    /**
     * 查询数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     */
    public findData(runoob: string, siteName: string): Promise<this> {
        let dbase = this.db.db(runoob)
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).find({}).toArray((err: boolean, result: any) => {
                if (err) { throw reject(err); }
                return resolve(result)
            })
        })
    }
    /**
     * 查询指定数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 匹配对象
     */
    public findOwnerData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        return new Promise((resolve, reject) => {
            let res = dbase.collection(siteName).find(dataBase).toArray(<T>(err: boolean, result: T): T => {
                if (err) { throw err; }
                return result
            })
            return resolve(res)
        })
    }
    /**
     * upDataOwner 更新数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 匹配对象
     * @param newDataBase 新的数据对象
     */
    public upDataOwner(runoob: string, siteName: string, dataBase: IDataBase, newDataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).updateOne(dataBase, newDataBase, (err: boolean, res: any) => {
                if (err) { throw err; }
                console.log('更新成功');
                resolve(_this)
            })
        })
    }
    /**
     * upDataMany 更新多条数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 匹配对象
     * @param newDataBase 新的数据对象
     */
    public upDataMany(runoob: string, siteName: string, dataBase: IDataBase, newDataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).updateMany(dataBase, newDataBase, (err: boolean, res: any) => {
                if (err) { throw err; }
                console.log(res.result.nModified + " 条文档被更新");
                resolve(_this)
            })
        })
    }
    /**
     * deleteData 删除数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 匹配对象
     */
    public deleteData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).deleteOne(dataBase, (err: boolean, res: any) => {
                if (err) { throw err; }
                console.log('删除数据成功');
                return resolve(_this)
            })
        })
    }
    /**
     * deleteData 删除多条数据
     * @param runoob 数据库名称
     * @param siteName 集合名称
     * @param dataBase 匹配对象
     */
    public deleteDataMany(runoob: string, siteName: string, dataBase: IDataBase): Promise<this> {
        let dbase = this.db.db(runoob)
        let _this = this
        return new Promise((resolve, reject) => {
            dbase.collection(siteName).deleteMany(dataBase, (err: boolean, res: any) => {
                if (err) { throw err; }
                console.log(res.result.n + " 条文档被删除");
                return resolve(_this)
            })
        })
    }
}

export default OperationMongo