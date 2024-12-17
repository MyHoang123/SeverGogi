const db = require('../configs/connect')

const showCard = function (IdAcc,callback)  {
    db.query(`SELECT p.Id, p.Name, p.Price, p.Img,'visible' AS Status  FROM products p INNER JOIN card c ON c.IdProduct = p.Id WHERE c.IdAcc = ? AND p.Visible = 1`,[IdAcc], function(err , data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const addCard = (IdAcc, IdProduct, result) => {
     db.query('INSERT INTO card (IdAcc,IdProduct) VALUES (?,?);',[IdAcc,IdProduct], function(err,data){
        if(err) {
            result (null)
        }
        else {
            result (data.insertId)
        }
    })
}
const showProductCard = function (IdProduct,callback)  {
    db.query("SELECT Id, Name, Price, Img FROM products WHERE Id In (?) ",[IdProduct], function(err , data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
} 
const deleteCard = (IdAcc,IdProduct, result) => {
     db.query('DELETE FROM card WHERE IdAcc = ? AND IdProduct = ?',[IdAcc,IdProduct],function(err,res){
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
const showLengthCard = function (IdAcc,callback)  {
    db.query("SELECT COUNT(IdProduct) AS LENGHTCARD FROM card c INNER JOIN products p ON p.Id = c.IdProduct WHERE IdAcc = ? AND p.Visible = 1",[IdAcc], function(err , data) {
       if(err) {
           callback (null)
       }
       else {
           callback (data[0].LENGHTCARD)
       }
    })
} 
module.exports = {
    showCard,
    addCard,
    showProductCard,
    deleteCard,
    showLengthCard,
}