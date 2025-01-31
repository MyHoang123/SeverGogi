const db = require('../configs/connect')
const getAllProduct = function (product) {
    db.query("SELECT p.Id, p.Name, p.Price, p.Img, ct.Name AS NameCate, CASE WHEN p.Sales >= 999 THEN '999+' ELSE p.Sales END AS Sales, p.Visible, 'visible' AS Status, ROUND(AVG(c.Star), 1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris GROUP BY p.Id",function(err, data) {
        if(err) {
            product (null)
        }
        else {
            product (data)
        }
    })
}
const getLenghtProduct = function (product) {
    db.query("SELECT COUNT(Id) AS Lenght FROM products", function(err, data) {
        if(err) {
            product (null)
        }
        else {
            product (data[0])
        }
    })
}
const getAllProductAdmin = function (callback) {
    db.query("SELECT Id, Name, Price, Img, Sales, Dsription, IdCategoris, Visible, 'visible' AS Status FROM products", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getTable = function (callback) {
    db.query("SELECT * FROM tables", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getTableQr = function (callback) {
    db.query("SELECT * FROM tables WHERE Status = ?",['Bàn Trống'], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllProductTypes = function (IdType,callback) {
    db.query(`SELECT IdProduct FROM detailproducts WHERE IdType = ${IdType}`, function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllProductCate = function (IdCate,callback) {
    db.query(`SELECT  Id ,Name FROM products WHERE IdCategoris = ${IdCate}`, function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getBestsellerCate = function (callback) {
    db.query(`SELECT p.Id, p.Name,p.Img,p.Dsription, p.Price,p.Sales, AVG(cm.Star) AS AverageStar  FROM products p INNER JOIN (SELECT IdCategoris, Id, Sales FROM products WHERE IdCategoris != 9 ORDER BY Sales DESC LIMIT 6) AS ranked_products  ON p.Id = ranked_products.Id INNER JOIN categoris c ON c.Id = p.IdCategoris LEFT JOIN comment cm ON p.Id = cm.IdProduct GROUP BY p.Id, p.Name, p.Img, p.Dsription, p.Price, p.Sales ` , function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllProductType = function (IdType,callback) {
    db.query(`SELECT * FROM detailtypes WHERE IdType = ${IdType}`, function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getProductBestSeller = function (callback) {
    db.query("SELECT * FROM products ORDER BY Sales DESC LIMIT 10", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getStarProduct = function (callback) {
    db.query("SELECT Star,IdProduct FROM comment" ,function(err, data) {
        if(err) {
            callback (0)
        }
        else {
            callback (data)
        }
    })
}
const voucher = function (voucher,callback) {
    db.query("SELECT PriceVoucher FROM voucher WHERE Voucher = ? ",[voucher], function(err, data) {
        if(data.length > 0) {
            callback (data)
        }
        else {
            callback (null)
        }
    })
}
const getAllMenu = function (callback) {
    db.query("SELECT * FROM menu", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllTypes = function (callback) {
    db.query("SELECT Id, Name, IdMenu, Price FROM types", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getCategoriType = function (callback) {
    db.query("SELECT t.Id AS IdType, c.Id AS IdCate, t.Name AS NameType, c.Name AS NameCate FROM types t INNER JOIN detailtypes d ON t.Id = d.IdType LEFT JOIN categoris c ON d.IdCategoris = c.Id", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllDetailTypes = function (callback) {
    db.query("SELECT * FROM detailtypes", function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllDetailProducts = function (callback) {
    db.query("SELECT * FROM detailproducts",function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const filterCate = function (IdCate,callback) {
    db.query("SELECT p.Id,p.Name,p.Price,p.Img,ct.Name AS NameCate,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON c.IdProduct = p.Id INNER JOIN categoris ct ON p.IdCategoris = ct.Id WHERE p.IdCategoris = ? GROUP BY p.Id",[IdCate],function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const filterCateType = function (IdCate,IdType,callback) {
    db.query("SELECT p.Id,p.Name,p.Price,ct.Name AS NameCate,p.Img,p.Sales,p.Visible,'visible' AS Status,ROUND(AVG(c.Star),1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct INNER JOIN detailproducts d ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE p.IdCategoris = ? AND d.IdType = ? GROUP BY p.Id",[IdCate,IdType],function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const getAllCategories = function (callback)  {
    db.query("SELECT Id, Name FROM categoris ", function(err , data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const getProductId = function (id, callback)  {
    db.query("SELECT Id, Name, Price, Img, Dsription, IdCategoris , Sales FROM products WHERE Id = ?",[id],function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
} 
const updateVisibleProduct = async (Id, result) => {
    await db.query('UPDATE products SET Visible = 1 WHERE Id IN (?)',[Id],function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result ('Success')
            return
        }
        result (null,null)
    })
} 
const updateHidenProduct = async (Id, result) => {
    await db.query('UPDATE products SET Visible = 0 WHERE Id IN (?)',[Id],function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result ('Success')
            return
        }
        result (null,null)
    })
} 
const insertProduct = async (Name,Price,Img,Dsription,IdCategoris,CreatedDateTime,CreatedUserId,LastModifiedDateTime,LastModifiedUserId,result) => {
    await db.query('INSERT INTO products (Name, Price, Img, Dsription, IdCategoris,CreatedDateTime, CreatedUserId , LastModifiedDateTime,LastModifiedUserId)  VALUE(?,?,?,?,?,?,?,?,?)',[Name,Price,Img,Dsription,IdCategoris,CreatedDateTime,CreatedUserId,LastModifiedDateTime,LastModifiedUserId],function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result ('Success')
            return
        }
        result (null,null)
    })
}
const updateproduct = async (Name,Price,Img,Dsription,IdCategoris,Id,result) => {
    await db.query('UPDATE products SET Name = ?,Price = ?,Img = ?, Dsription = ?, IdCategoris = ? WHERE Id = ?',[Name,Price,Img,Dsription,IdCategoris,Id],function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result ('Success')
            return
        }
        result (null,null)
    })
} 
const editproduct = async (Name,Price,Dsription,IdCategoris,Id,result) => {
    await db.query('UPDATE products SET Name = ?,Price = ?, Dsription = ?, IdCategoris = ? WHERE Id = ?',[Name,Price,Dsription,IdCategoris,Id],function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result ('Success')
            return
        }
        result (null,null)
    })
} 
const updatetype = async (Name,IdMenu,Price,Id) => {
    await db.query('UPDATE types SET Name = ?,IdMenu = ?, Price = ? WHERE Id = ?',[Name,IdMenu,Price,Id])
}
const updateDetailType = async (IdType,IdCategoris,Id) => {
    await db.query('UPDATE detailtypes SET IdType = ?,IdCategori = ? WHERE Id = ?',[IdType,IdCategoris,Id])
} 
const updateDetailProduct = async (IdType,IdProduct,Id) => {
    await db.query('UPDATE detailproducts SET IdType = ?,IdCategori = ? WHERE Id = ?',[IdType,IdProduct,Id])
} 
const updatecategori = async (Name,IdType,LastModifiedDateTime, Id) => {
    await db.query('UPDATE categoris SET Name = ?, IdType = ?, 	LastModifiedDateTime = ? WHERE Id = ?',[Name,IdType,LastModifiedDateTime,Id])
} 
const insertctgr = async (Name,CreatedDateTime,CreatedUserId ,LastModifiedDateTime,LastModifiedUserId) => {
    await db.query('INSERT INTO categoris (Name,CreatedDateTime, CreatedUserId , LastModifiedDateTime,LastModifiedUserId )  VALUE(?,?,?,?,?)',[Name,CreatedDateTime,CreatedUserId,LastModifiedDateTime,LastModifiedUserId])
} 
const insertType = async (Name,Price,IdMenu,CreatedDateTime,CreatedUserId ,LastModifiedDateTime,LastModifiedUserId ) => {
    await db.query('INSERT INTO types (Name,IdMenu, Price, CreatedDateTime, CreatedUserId , LastModifiedDateTime,LastModifiedUserId )  VALUE(?,?,?,?,?,?,?)',[Name,IdMenu,Price,CreatedDateTime,CreatedUserId,LastModifiedDateTime,LastModifiedUserId])
}
const inserDetailtType = async (IdType, IdCategoris ) => {
    await db.query('INSERT INTO detailtypes (IdType,IdCategoris )  VALUE(?,?)',[IdType,IdCategoris])
}
const inserDetailtProduct = async (IdType, IdProduct,callback) => {
    await db.query('INSERT INTO detailproducts (IdType,IdProduct)  VALUE(?,?)',[IdType,IdProduct],function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const createMenu = async (Name) => {
    await db.query('INSERT INTO menu (Name)  VALUE(?)',[Name])
} 
const deleteproduct = function (IdProduct,callback) {
    db.query(`DELETE FROM products WHERE Id = ?;`,[IdProduct], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteType = function (IdProduct,callback) {
    db.query(`DELETE FROM types WHERE Id = ?;`,[IdProduct], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteDetailProduct = function (IdType, IdProduct,callback) {
    db.query(`DELETE FROM detailproducts WHERE IdType = ? AND IdProduct = ?;`,[IdType,IdProduct], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteDetailType = function (IdType, 	IdCategoris ,callback) {
    db.query(`DELETE FROM detailtypes WHERE IdType = ? AND 	IdCategoris  = ?;`,[IdType,	IdCategoris ], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteCategoris = function ( IdCategoris ,callback) {
    db.query(`DELETE FROM categoris WHERE Id = ? ;`,[IdCategoris], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteMenu = function ( IdMenu ,callback) {
    db.query(`DELETE FROM menu WHERE Id = ? ;`,[IdMenu], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
const deleteVoucher = function ( IdVoucer ,callback) {
    db.query(`DELETE FROM voucher WHERE Id = ? ;`,[IdVoucer], function(err, data) {
        if(err) {
            callback (null)
        }
        else {
            callback (data)
        }
    })
}
module.exports = {
    deleteVoucher,
    createMenu,
    deleteMenu,
    deleteCategoris,
    deleteDetailType,
    deleteDetailProduct,
    deleteType,
    deleteproduct,
    filterCate,
    filterCateType,
    getAllProductType,
    getTableQr,
    getAllProduct,
    getAllCategories,
    getAllDetailTypes,
    insertProduct,
    updatetype,
    updateHidenProduct,
    getProductId,
    updateproduct,
    insertType,
    updatecategori,
    insertctgr,
    getAllTypes,
    getLenghtProduct,
    inserDetailtType,
    getAllMenu,
    getAllDetailProducts,
    updateDetailType,
    updateDetailProduct,
    inserDetailtProduct,
    voucher,
    editproduct,
    getStarProduct,
    getProductBestSeller,
    getAllProductTypes,
    getTable,
    getAllProductCate,
    getBestsellerCate,
    updateVisibleProduct,
    getAllProductAdmin,
    getCategoriType,
}