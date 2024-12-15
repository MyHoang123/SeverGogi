const db = require('../configs/connect')
const getCommentProduct = function (IdProduct,callback)  {
    db.query('SELECT c.Id, c.Containt,c.Star,c.RepComment,a.UserName,a.Classify,a.Avt FROM comment c INNER JOIN account a ON c.IdAcc = a.Id WHERE c.IdProduct = ? ORDER BY c.Id DESC',[IdProduct] , function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 

const getCommentUser = function (IdBill,callback)  {
    db.query(`SELECT c.Containt, c.Star, c.IdProduct FROM detailbill d LEFT JOIN comment c ON c.IdProduct = d.IdProduct AND c.IdBill = d.IdBIll WHERE d.IdBill = ? ORDER BY d.Id`,[IdBill] , function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const createComment = async (Containt, Star, IdProduct, IdAcc, IdBill, result) => {
    await db.query('INSERT INTO comment (Containt, Star, IdProduct, IdAcc,IdBill )  VALUE(?,?,?,?,?)',[Containt, Star, IdProduct, IdAcc,IdBill] , function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const filterComment = async (IdProduct, Star, result) => {
    await db.query('SELECT c.Id, c.Containt,c.Star,c.RepComment,a.UserName,a.Classify,a.Avt FROM comment c INNER JOIN account a ON c.IdAcc = a.Id WHERE c.IdProduct = ? AND c.Star = ? ORDER BY c.Id DESC',[IdProduct, Star] , function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const createRepComment = async (RepComment,Id,result) => {
    await db.query('UPDATE comment SET RepComment = ? WHERE Id = ?',[RepComment,Id] , function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const AutoRepComment = async (RepComment, IdProduct, IdAcc, IdBill,result) => {
    await db.query('UPDATE comment SET RepComment = ? WHERE IdProduct = ? AND IdAcc = ? AND IdBill = ?',[RepComment,IdProduct,IdAcc,IdBill],function(err,data) {
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const updateBillComment = async (IdBill,result) => {
    await db.query('UPDATE bill SET Status = ? WHERE Id = ? AND Status != ?',[4,IdBill,4],function(err,data) {
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const showCommentAdmin = async (result) => {
    await db.query('SELECT p.Id, p.Name,p.Price,p.Img,p.Sales,c.Star FROM products p INNER JOIN comment c ON p.Id = c.IdProduct GROUP BY p.Id',function(err,data) {
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}

module.exports = {
    getCommentProduct,
    getCommentUser,
    createComment,
    showCommentAdmin,
    updateBillComment,
    createRepComment,
    AutoRepComment,
    filterComment,
}