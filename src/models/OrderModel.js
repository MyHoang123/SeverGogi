const db = require('../configs/connect')
const updateTable = async (Status,Id,result) => {
     db.query('UPDATE tables SET Status = ? WHERE Id = ?',[Status,Id],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
} 
const updateTableStatus = async (Id,result) => {
     db.query('UPDATE tables SET Status = ? WHERE Id = ?',['Bàn Trống',Id],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const updateBillStatus = async (Price,Id,result) => {
     db.query('UPDATE billorder SET Status = ?, Price = ? WHERE IdTable= ? AND Status = 0',[1,Price,Id],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const updateBillOrder = async (Id) => {
     db.query('UPDATE billorder SET Status = ? WHERE IdTable = ? AND Status = ?',['Đã Thanh Toán',Id,'Đang Hoạt Động'])
}
const updateProductOrder = async (Status,Id,result) => {
     db.query('UPDATE detailbillorder SET Status = ? WHERE Id = ?',[Status,Id],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const updateDataCard = async (Data,Table) => {
     db.query('UPDATE billorder SET Data = ? WHERE IdTable = ? AND Status = ?',[Data,Table,'Đang Hoạt Động'])
}
const createTable = async (Name, result) => {
     db.query('INSERT INTO tables (Name,Status)  VALUE(?,?)',[Name,'Bàn Trống'], function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const deleteTable = async (Id, result) => {
     db.query('DELETE FROM  tables WHERE Id = ?',[Id], function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const createBillOrder = async (TotalPrice,IdTable,IdType,Date, result) => {
     db.query('INSERT INTO billorder (Price,IdTable, Status, Type, DATETIME)  VALUE(?,?,?,?,?)',[TotalPrice,IdTable,0,IdType,Date], function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const createbillproductOrder = async (values,result) => {
     db.query(`INSERT INTO detailbillorder (IdBill, IdProduct, Quantity, Status, Note) VALUES ${values};`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const getBillOrderUser = function (IdTable,IdType, callback)  {
    db.query('SELECT Id FROM billorder WHERE IdTable = ? AND Status = 0 AND Type = ?',[IdTable,IdType], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data[0])
       }
    })
}
const getProductBillOrder = function (Table, callback)  {
    db.query('SELECT p.Id AS IdDetail, pr.Id, p.Quantity, ct.Name AS NameCate, pr.Name,pr.Img, p.Status, pr.Price * p.Quantity AS Price FROM billorder b INNER JOIN detailbillorder p ON p.IdBill = b.Id INNER JOIN products pr ON pr.Id = p.IdProduct INNER JOIN categoris ct ON ct.Id = pr.IdCategoris WHERE b.IdTable = ? AND b.Status = 0 GROUP BY p.Id',[Table], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}

const getBillOrder = function (IdTable,IdType, callback)  {
    db.query('SELECT ty.Price, t.Name AS tableName, ty.Name AS typeName, ty.Price FROM billorder b INNER JOIN tables t ON t.Id = b.IdTable INNER JOIN types ty ON ty.Id = b.Type WHERE IdTable = ? AND Type = ? AND b.Status = 0',[IdTable,IdType], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data[0])
       }
    })
}
const getProductBillOrderAdmin = function (IdTable, callback)  {
    db.query(`SELECT p.Id,ty.Price,ty.Name AS nameType,tb.Name,CONCAT('[', GROUP_CONCAT(CONCAT('{"Name":"', p.Name, '", "Id":', p.Id, ', "Price":', (p.Price * d.Quantity),', "Status":', d.Status,', "IdDetail":', d.Id,', "Img":"', p.Img, '", "NameCate":"', ct.Name,  '", "Quantity":', d.Quantity,  IF(d.Note IS NOT NULL, CONCAT(', "Note":"', d.Note, '"'), ''),'}') SEPARATOR ', '), ']') AS Data  FROM billorder b INNER JOIN detailbillorder d ON b.Id = d. IdBill INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN tables tb ON tb.Id = b.IdTable INNER JOIN types ty ON ty.Id = b.Type INNER JOIN categoris ct ON p.IdCategoris = ct.Id WHERE b.IdTable = ? AND b. Status = 0 GROUP BY b.Id ORDER BY b.Id`,[IdTable], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data[0])
       }
    })
}
const getProductOrder = function (IdType, callback)  {
    db.query(`SELECT p.Id,p.Name,'0' AS Price,ct.Name AS NameCate,p.Img,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN detailproducts d ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE d.IdType = ? AND p.Visible = 1 GROUP BY p.Id`,[IdType], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getProductOrderAll = function (callback)  {
    db.query(`SELECT p.Id,p.Name,p.Price,ct.Name AS NameCate,p.Img,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN detailproducts d ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris AND p.Visible = 1 GROUP BY p.Id;`, function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getCateOrder = function (IdType, callback)  {
    db.query(`SELECT c.Name, c.Id FROM categoris c INNER JOIN detailtypes d ON c.Id = d.IdCategoris WHERE d.IdType = ?`,[IdType], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getCateOrderAll = function (callback)  {
    db.query(`SELECT Name, Id FROM categoris `, function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const fillterProductCate = function (IdType,IdCate, callback)  {
    db.query(`SELECT p.Id,p.Name,'0' AS Price,ct.Name AS NameCate,p.Img,p.IdCategoris,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN detailproducts d ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE d.IdType = ? AND p.IdCategoris = ? GROUP BY p.Id`,[IdType,IdCate], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const fillterProductCateAll = function (IdCate, callback)  {
    db.query(`SELECT p.Id,p.Name,p.Price,ct.Name AS NameCate,p.Img,p.IdCategoris,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN categoris ct ON p.IdCategoris = ct.Id WHERE ct.Id = ? GROUP BY p.Id;`,[IdCate], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getBillProductOrderUser = function (Id, callback)  {
    db.query('SELECT Id, Name, Img, Price  FROM products WHERE Id = ?',[Id], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
module.exports = {
    getProductOrderAll,
    getBillOrder,
    fillterProductCate,
    getCateOrder,
    getProductOrder,
    updateTable,
    createTable,
    createBillOrder,
    getBillOrderUser,
    getProductBillOrder,
    getCateOrderAll,
    getProductBillOrderAdmin,
    getBillProductOrderUser,
    updateDataCard,
    deleteTable,
    updateBillOrder,
    updateProductOrder,
    createbillproductOrder,
    updateTableStatus,
    updateBillStatus,
    fillterProductCateAll,
}