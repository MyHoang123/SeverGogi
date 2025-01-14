const db = require('../configs/connect')
const CountBill = (result) => {
     db.query('SELECT COUNT(Id) FROM `bill` WHERE Status LIKE ?',['Đã Giao'],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const CountTotalPrice = (result) => {
     db.query('SELECT  SUM(TotalPrice) FROM `bill` WHERE Status LIKE ?',['Đã Giao'],function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getBill = function (IdAcc, callback)  {
    db.query(`SELECT p.Id, b.Id, b.IdAcc, b.TotalPrice, b.Status,b.StatusPay, SUBSTRING(b.DATETIME, 1, 10) AS DateOnly, CONCAT('[', GROUP_CONCAT(CONCAT('{"Name":"', p.Name, '", "Id":', p.Id, ', "Price":', p.Price, ', "Img":"', p.Img, '", "NameCate":"', ct.Name, '", "sl":', (d.Price DIV p.Price), IF(d.Note IS NOT NULL, CONCAT(', "Note":"', d.Note, '"'), ''), '}') SEPARATOR ', '),']') AS Data  FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE b.IdAcc = ? GROUP BY b.Id, b.IdAcc, b.TotalPrice, b.Status, b.StatusPay, SUBSTRING(b.DATETIME, 1, 10) ORDER BY b.Id DESC;`,[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const updateSale = (Id,Amount) => {
     db.query(`UPDATE products SET Sales = Sales + ${Amount}  WHERE Id = ?`,[Id])
} 
const getBillUser = function (IdAcc,Status, callback)  {
    db.query(`SELECT b.Id, b.IdAcc, b.TotalPrice, b.Status, b.StatusPay ,SUBSTRING(b.DATETIME, 1, 10) AS DateOnly,  CONCAT('[', GROUP_CONCAT(CONCAT('{"Name":"', p.Name, '", "Id":', p.Id, ', "Price":', p.Price, ', "Img":"', p.Img, '", "NameCate":"', ct.Name, '", "sl":', (d.Price DIV p.Price), IF(d.Note IS NOT NULL, CONCAT(', "Note":"', d.Note, '"'), ''), '}') SEPARATOR ', '),']') AS Data FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE b.IdAcc = ? AND b.Status = ? GROUP BY b.Id ORDER BY b.Id DESC;`,[IdAcc,Status], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getBillDetail = function (IdAcc, callback)  {
    db.query(`SELECT b.Id, b.Name,b.PayMent,b.Sdt, b.Status,b.StatusPay, b.Address, b.Destination, SUBSTRING(b.DATETIME, 1, 10) AS DateOnly,CONCAT('[', GROUP_CONCAT(CONCAT('{"Name":"', p.Name, '", "Id":', p.Id, ', "Price":', p.Price, ', "Img":"', p.Img, '", "NameCate":"', ct.Name, '", "sl":', (d.Price DIV p.Price), IF(d.Note IS NOT NULL, CONCAT(', "Note":"', d.Note, '"'), ''), '}') SEPARATOR ', '),']') AS Data  FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE b.Id = ? GROUP BY b.Id ORDER BY b.Id DESC;`,[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
// const showProductBill = function (IdProduct,callback)  {
//     db.query(`SELECT Id, Name, Price, Img FROM products WHERE Id In (${IdProduct}) `, function(err , data) {
//        if(err) {
//            callback (null)
//        }
//        else {
//            callback (data)
//        }
//     })
// } 
const showProductBill = function (IdProduct,callback)  {
    db.query(`SELECT Id, Name, Price, Img FROM products WHERE Id In (${IdProduct}) `, function(err , data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const createBill = (IdAcc, Name, Sdt, TotalPrice, Address, Destination, Date, Note, IdPay, StatusPay, result) => {
     db.query('INSERT INTO bill (IdAcc, Name, Sdt, TotalPrice, PriceVoucher ,Address, Destination, Status, DATETIME, Note, PayMent,StatusPay)  VALUE(?,?,?,?,?,?,?,?,?,?,?,?)',[IdAcc,Name,Sdt,TotalPrice,0,Address,Destination,0,Date,Note,IdPay,StatusPay], function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const createbillproduct = (values,result) => {
     db.query(`INSERT INTO detailbill (IdBill, IdProduct, Price, Note) VALUES ${values};`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const CreateNotifi = (IdAcc,Containt,Date,IdBill, result) => {
     db.query('INSERT INTO annout (IdAcc , Containt, Date, Status, IdBill)  VALUE(?,?,?,?,?)',[IdAcc,Containt,Date,0,IdBill], function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}

const getAllBill = function (callback)  {
    db.query(`SELECT b.*, CONCAT('[', GROUP_CONCAT(CONCAT('{"Name":"', p.Name, '", "Id":', p.Id, ', "Price":', p.Price, ', "Img":"', p.Img, '", "NameCate":"', ct.Name,  '", "sl":', (d.Price DIV p.Price),  IF(d.Note IS NOT NULL, CONCAT(', "Note":"', d.Note, '"'), ''),'}') SEPARATOR ', '), ']') AS Data FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris GROUP BY b.Id ORDER BY b.Id DESC;`, function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const updateBill = (Status,Id,result) => {
     db.query('UPDATE bill SET Status = ? WHERE Id = ?',[Status,Id],function(err,data){
        if(err) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const updatePayBill = (Id,result) => {
    db.query('UPDATE bill SET StatusPay = ? WHERE PayMent = ? AND StatusPay != 1',[1,Id],function(err,data){
       if(err) {
           result (null)
       }
       else {
           result (data)
       }
   })
}
const rcmstHottrend = function (IdProduct,Amount,IdAcc,callback)  {
    if(IdProduct.length > 0) {
        db.query(`SELECT d.IdProduct FROM detailbill d INNER JOIN comment c ON d.IdProduct = c.IdProduct WHERE c.Star = 5  AND d.IdProduct NOT IN (${IdProduct}) AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ?) GROUP BY d.IdProduct ORDER BY COUNT(*) DESC LIMIT ${Amount};`,[IdAcc], function(err,data) {
           if(err || data.length <= 0) {
               callback (null)
           }
           else {
               callback (data)
           }
        })
    }else {
        db.query(`SELECT d.IdProduct FROM detailbill d INNER JOIN comment c ON d.IdProduct = c.IdProduct WHERE c.Star = 5  AND d.IdProduct AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ?) GROUP BY d.IdProduct ORDER BY COUNT(*) DESC LIMIT ${Amount};`,[IdAcc], function(err,data) {
            if(err || data.length <= 0) {
                callback (null)
            }
            else {
                callback (data)
            }
         })
    }
} 
const rmstUserBaseLike = function (IdAcc,IdProduct,callback)  {
    if(IdProduct.length > 0) {
        db.query(`SELECT c.IdProduct, c.IdAcc, c.Id FROM comment c WHERE IdAcc IN (SELECT up2.IdAcc FROM card up1 JOIN card up2 ON up1.IdProduct = up2.IdProduct WHERE up1.IdAcc = ? AND up2.IdAcc != ? AND c.Star = 5 HAVING COUNT(DISTINCT up1.IdProduct) = (SELECT COUNT(DISTINCT IdProduct) FROM card WHERE IdAcc = ?) AND COUNT(DISTINCT up2.IdProduct) = COUNT(DISTINCT up1.IdProduct)) AND c.IdProduct NOT IN (${IdProduct}) AND c.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ?) ORDER BY c.Id DESC LIMIT 2`,[IdAcc], function(err,data) {
           if(err || data.length <= 0) {
               callback (null)
           }
           else {
               callback (data)
           }
        })
    }
    else {
        db.query(`SELECT c.IdProduct, c.IdAcc, c.Id FROM comment c WHERE IdAcc IN (SELECT up2.IdAcc FROM card up1 JOIN card up2 ON up1.IdProduct = up2.IdProduct WHERE up1.IdAcc = ? AND up2.IdAcc != ? AND c.Star = 5 HAVING COUNT(DISTINCT up1.IdProduct) = (SELECT COUNT(DISTINCT IdProduct) FROM card WHERE IdAcc = ?) AND COUNT(DISTINCT up2.IdProduct) = COUNT(DISTINCT up1.IdProduct)) AND c.IdProduct AND c.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ?) ORDER BY c.Id DESC LIMIT 2`,[IdAcc], function(err,data) {
            if(err || data.length <= 0) {
                callback (null)
            }
            else {
                callback (data)
            }
         })
    }
} 
const rmstUseBaseBuys = function (IdAcc,IdProduct,callback)  {
    if(IdProduct.length > 0) {
        db.query(`SELECT d.IdProduct, p.Name, b.IdAcc, COUNT(d.IdProduct) AS PurchaseCount FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct WHERE b.IdAcc IN (SELECT up2.IdAcc FROM card up1 JOIN card up2 ON up1.IdProduct = up2.IdProduct WHERE up1.IdAcc = ${IdAcc} AND up2.IdAcc != ${IdAcc} GROUP BY up2.IdAcc HAVING COUNT(DISTINCT up1.IdProduct) = (SELECT COUNT(DISTINCT IdProduct) FROM card WHERE IdAcc = ${IdAcc} ))GROUP BY d.IdProduct, p.Name HAVING COUNT(d.IdProduct) > 0 AND d.IdProduct NOT IN (${IdProduct}) AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) ORDER BY PurchaseCount DESC LIMIT 2;`, function(err,data) {
           if(err || data.length <= 0) {
               callback (null)
           }
           else {
               callback (data)
           }
        })
    }else {
        db.query(`SELECT d.IdProduct, p.Name, b.IdAcc, COUNT(d.IdProduct) AS PurchaseCount FROM bill b INNER JOIN detailbill d ON b.Id = d.IdBill INNER JOIN products p ON p.Id = d.IdProduct WHERE b.IdAcc IN (SELECT up2.IdAcc FROM card up1 JOIN card up2 ON up1.IdProduct = up2.IdProduct WHERE up1.IdAcc = ${IdAcc} AND up2.IdAcc != ${IdAcc} GROUP BY up2.IdAcc HAVING COUNT(DISTINCT up1.IdProduct) = (SELECT COUNT(DISTINCT IdProduct) FROM card WHERE IdAcc = ${IdAcc} ))GROUP BY d.IdProduct, p.Name HAVING COUNT(d.IdProduct) > 0 AND d.IdProduct AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) ORDER BY PurchaseCount DESC LIMIT 2;`, function(err,data) {
            if(err || data.length <= 0) {
                callback (null)
            }
            else {
                callback (data)
            }
         })
    }
} 
const rmstCard = function (IdAcc,IdProduct,Amount,callback)  {
    if(IdProduct.length > 0) {
        db.query(`SELECT p.Id, p.Name FROM detailbill d INNER JOIN products p ON d.IdProduct = p.Id INNER JOIN categoris l ON p.IdCategoris = l.Id WHERE l.Id IN (SELECT l.Id FROM categoris l WHERE l.Id NOT IN (SELECT l.Id FROM card c INNER JOIN products p ON c.IdProduct = p.Id INNER JOIN categoris l ON p.IdCategoris = l.Id WHERE c.IdAcc = ? GROUP BY l.Id)) AND p.Id NOT IN (${IdProduct}) AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) GROUP BY l.Id LIMIT ${Amount}`,[IdAcc], function(err,data) {
           if(err || data.length <= 0) {
               callback (null)
           }
           else {
               callback (data)
           }
        })
    }
    else {
        db.query(`SELECT p.Id, p.Name FROM detailbill d INNER JOIN products p ON d.IdProduct = p.Id INNER JOIN categoris l ON p.IdCategoris = l.Id WHERE l.Id IN (SELECT l.Id FROM categoris l WHERE l.Id NOT IN (SELECT l.Id FROM card c INNER JOIN products p ON c.IdProduct = p.Id INNER JOIN categoris l ON p.IdCategoris = l.Id WHERE c.IdAcc = ? GROUP BY l.Id)) AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) GROUP BY l.Id LIMIT ${Amount}`,[IdAcc], function(err,data) {
            if(err || data.length <= 0) {
                callback (null)
            }
            else {
                callback (data)
            }
         })
    }
} 
const rmstBuyTogether = function (IdProduct,IdAcc,callback)  {
    if(IdProduct.length > 0) {
        db.query(`SELECT d.IdProduct FROM detailbill d INNER JOIN detailbill d2 ON d.IdBill = d2.IdBill WHERE d2.IdProduct = ? AND d.IdProduct != ? AND d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) GROUP BY d.IdProduct ORDER BY COUNT(*) DESC LIMIT 2`,[IdProduct,IdProduct], function(err,data) {
           if(err || data.length <= 0) {
               callback (null)
           }
           else {
               callback (data)
           }
        })
    }else {
        db.query(`SELECT d.IdProduct FROM detailbill d INNER JOIN comment c ON d.IdProduct = c.IdProduct WHERE d.IdProduct NOT IN (SELECT IdProduct FROM card WHERE IdAcc = ${IdAcc}) AND c.Star = 5  AND d.IdProduct GROUP BY d.IdProduct ORDER BY COUNT(*) DESC LIMIT 3;`, function(err,data) {
            if(err || data.length <= 0) {
                callback (null)
            }
            else {
                callback (data)
            }
         })
    }
} 
const rmstUserSendHistory = function (IdAcc,callback)  {
    db.query(`SELECT h.IdProduct FROM historyacc h LEFT JOIN card c ON h.IdProduct = c.IdProduct AND c.IdAcc = h.IdAcc WHERE h.IdAcc = ? AND c.IdProduct IS NULL ORDER BY h.Id DESC;`,[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const rmstGetItemUserSend = function (IdAcc,callback)  {
    db.query(`SELECT IdProduct FROM historyacc WHERE IdAcc = ?`,[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const rmstGetAllProduct = ( IdProducts, result) => {
     db.query(`SELECT p.Id, p.Name, p.Price, p.Img, CASE WHEN p.Sales >= 999 THEN '999+' ELSE p.Sales END AS Sales, p.Visible, ROUND(AVG(c.Star), 1) AS Star FROM products p LEFT JOIN comment c ON p.Id = c.IdProduct WHERE p.Id IN (${IdProducts}) GROUP BY p.Id ORDER BY FIELD(p.Id, ${IdProducts});`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getProductHottrend = (result) => {
     db.query(`SELECT d.IdProduct, p.Name, p.Price, p.Sales, ct.Name AS NameCate, ROUND(AVG(c.Star),1) AS Star FROM detailbill d INNER JOIN comment c ON d.IdProduct = c.IdProduct INNER JOIN products p ON p.Id = d.IdProduct INNER JOIN categoris ct ON ct.Id = p.IdCategoris WHERE c.Star = 5  GROUP BY d.IdProduct ORDER BY COUNT(*) DESC LIMIT 8;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAmountBillOrder = (result) => {
     db.query(`SELECT current_week_count.AllCount, last_week_count.AllCountl, ROUND(((current_week_count.AllCount - last_week_count.AllCountl)/last_week_count.AllCountl) * 100,2) AS Since_last_week FROM (SELECT COUNT(*) AS AllCount FROM billorder WHERE DATETIME >= NOW() - INTERVAL 1 WEEK) AS current_week_count, (SELECT COUNT(*) AS AllCountl FROM billorder WHERE DATETIME >= NOW() - INTERVAL 2 WEEK) AS last_week_count;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAmountBill = (result) => {
     db.query(`SELECT current_week_count.AllCount, last_week_count.AllCountl, ROUND(((current_week_count.AllCount - last_week_count.AllCountl)/last_week_count.AllCountl) * 100,2) AS Since_last_week FROM (SELECT COUNT(*) AS AllCount FROM bill WHERE DATETIME >= NOW() - INTERVAL 1 WEEK) AS current_week_count, (SELECT COUNT(*) AS AllCountl FROM bill WHERE DATETIME >= NOW() - INTERVAL 2 WEEK) AS last_week_count;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAllPriceBill = (result) => {
     db.query(`SELECT (current_week_count.total_amount + current_week_count_order.total_amount) AS AllCount,ROUND(((((current_week_count.total_amount + current_week_count_order.total_amount) - (last_week_count.total_amountl + last_week_count_order.total_amountl)) / (last_week_count.total_amountl + last_week_count_order.total_amountl)) * 100),2)  AS Since_last_week FROM (SELECT SUM(TotalPrice) AS total_amount FROM bill WHERE DATETIME >= NOW() - INTERVAL 1 WEEK) AS current_week_count, (SELECT SUM(TotalPrice) AS total_amountl FROM bill WHERE DATETIME >= NOW() - INTERVAL 2 WEEK) AS last_week_count, (SELECT SUM(Price) AS total_amount FROM billorder WHERE DATETIME >= NOW() - INTERVAL 1 WEEK) AS current_week_count_order, (SELECT SUM(Price) AS total_amountl FROM billorder WHERE DATETIME >= NOW() - INTERVAL 2 WEEK) AS last_week_count_order;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAllPriceBillOrder = (result) => {
     db.query(`SELECT SUM(Price) AS total_amount FROM billorder WHERE DATETIME >= NOW() - INTERVAL 1 WEEK;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAllPriceDate = (result) => {
     db.query(`SELECT DATE_FORMAT(datetime, '%Y-%m') AS month, SUM(totalPrice) DIV 1000 AS total_price FROM bill GROUP BY month ORDER BY month;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getAllBillDate = (result) => {
     db.query(`SELECT DATE_FORMAT(datetime, '%Y-%m') AS month,COUNT(*) AS total_bills FROM bill GROUP BY month ORDER BY month;`, function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
module.exports = {
    getAllBillDate,
    getAllPriceDate,
    getAllPriceBill,
    rmstBuyTogether,
    rmstGetAllProduct,
    rmstGetItemUserSend,
    getBill,
    getAmountBill,
    rmstUserSendHistory,
    rmstUseBaseBuys,
    rmstCard,
    getProductHottrend,
    getAllPriceBillOrder,
    getAmountBillOrder,
    CountBill,
    CountTotalPrice,
    showProductBill,
    rmstUserBaseLike,
    rcmstHottrend,
    createbillproduct,
    createBill,
    CreateNotifi,
    getAllBill,
    updateSale,
    updateBill,
    getBillUser,
    getBillDetail,
    updatePayBill,
}