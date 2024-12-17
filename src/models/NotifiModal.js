const db = require('../configs/connect')
const getNotifi = function (IdAcc, callback)  {
    db.query('SELECT Containt, Date, Status, IdBill FROM annout WHERE IdAcc= ? ORDER BY id DESC',[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const updateNoti =  (IdAcc, result) => {
     db.query('UPDATE annout SET Status = 1 WHERE IdAcc = ?',[IdAcc], function(err,data){
        if(err) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const deleteNoti =  (IdAcc, result) => {
     db.query('DELETE FROM annout WHERE IdAcc = ?',[IdAcc], function(err,data){
        if(err) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
module.exports = {
    deleteNoti,
    getNotifi,
    updateNoti,
}