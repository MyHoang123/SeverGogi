const db = require('../configs/connect')


const CountChat = async (IdSend, IdReceiver, result) => {
    await db.query('SELECT COUNT(Status) AS Count FROM chat WHERE Status = 0 AND IdSend = ? AND IdReceiver = ?',[IdSend, IdReceiver] , function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const addChat = async (IdSend, IdReceiver, time, containt, Date, result) => {
    await db.query('INSERT INTO chat ( IdSend , IdReceiver , time, containt, Date, Status  )  VALUE(?,?,?,?,?,?)',[IdSend, IdReceiver, time, containt, Date,0] , function(err,data){
        if(err || data.length <= 0) {
            result (null)
        }
        else {
            result (data)
        }
    })
}
const getUserChat = function (IdAcc,callback)  {
    db.query('SELECT c.IdSend, a.Name, a.Avt, c.containt, IF(c.Date < DATE_SUB(CURDATE(), INTERVAL 1 YEAR), CONCAT(DATE_FORMAT(c.Date, "%d/%m"), "/", RIGHT(YEAR(c.Date), 2)), DATE_FORMAT(c.Date, "%d/%m")) AS Date FROM chat c INNER JOIN account a ON c.IdSend = a.Id WHERE c.Id = (SELECT MAX(c2.Id)FROM chat c2 WHERE c2.IdSend = c.IdSend) AND IdReceiver = ? ORDER BY c.Id DESC',[IdAcc], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const getChat = function (IdSend,IdReceiver,callback)  {
    db.query('SELECT IdSend, IdReceiver, containt,Status, DATE_FORMAT(time, "%H:%i") AS time FROM chat WHERE IdSend = ? AND IdReceiver = ? OR IdReceiver = ? AND IdSend = ? ',[IdSend,IdReceiver,IdSend,IdReceiver], function(err,data) {
       if(err || data.length <= 0) {
           callback (null)
       }
       else {
           callback (data)
       }
    })
}
const updateChat = function  (IdReceiver,result)  {
     db.query('UPDATE chat SET Status = 1 WHERE Status = 0 AND IdReceiver = ?',[IdReceiver],function(err,res){
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
// const getChatUser = function (IdSend,IdReceiver,callback)  {
//     db.query('SELECT IdSend, IdReceiver, containt, DATE_FORMAT(time, "%H:%i") AS time FROM chat WHERE IdSend = ? AND IdReceiver = ? ',[IdSend,IdReceiver], function(err,data) {
//        if(err || data.length <= 0) {
//            callback (null)
//        }
//        else {
//            callback (data)
//        }
//     })
// }
module.exports = {
    addChat,
    getChat,
    getUserChat,
    CountChat,
    updateChat,
}