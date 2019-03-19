interface IDataBase {
    [index: string]: any;
}
declare class OperationMongo {
    db: any;
    link(url: string): Promise<this>;
    createTable(runoob: string, siteName: string): Promise<this>;
    insertOneData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this>;
    insertMoneyData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this>;
    findData(runoob: string, siteName: string): Promise<this>;
    findOwnerData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this>;
    upDataOwner(runoob: string, siteName: string, dataBase: IDataBase, newDataBase: IDataBase): Promise<this>;
    upDataMany(runoob: string, siteName: string, dataBase: IDataBase, newDataBase: IDataBase): Promise<this>;
    deleteData(runoob: string, siteName: string, dataBase: IDataBase): Promise<this>;
    deleteDataMany(runoob: string, siteName: string, dataBase: IDataBase): Promise<this>;
}
export default OperationMongo;
