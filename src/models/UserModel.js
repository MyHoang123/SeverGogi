const db = require('../configs/connect')
const get_all = function (result) {
    db.query("SELECT * FROM account", function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
const getAllUser = function (result) {
    db.query("SELECT * FROM user", function(err, account) {
        if(err || account.length < 0) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
const getAllVoucher = function (result) {
    db.query("SELECT * FROM voucher", function(err, account) {
        if(err || account.length < 0) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
const getAccount = function (Phone,result) {
    db.query("SELECT Id, Name, UserName, Sdt, Email, Avt, Gender, Birthday, Classify FROM account WHERE Sdt = ?",[Phone], function(err, account) {
        if(err || account.length <= 0) {
            result (null)
        }
        else {
            result (account[0])
        }
    })
}
const getEmailAccount = function (Email,result) {
    db.query("SELECT Id, Name, UserName, Sdt, Email, Avt, Gender, Birthday, Classify FROM account WHERE Email = ?",[Email], function(err, account) {
        if(err || account.length <= 0) {
            result (null)
        }
        else {
            result (account[0])
        }
    })
}
const getUser = function (IdAcc,result) {
    db.query("SELECT FullName, PhoneNumber, BirthDay,Gender FROM user WHERE IdAcc = ?",[IdAcc], function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}

const getUserIdAcc = function (id, callback)  {
    db.query('SELECT * FROM user WHERE idAcc=?',[id], function(err,data) {
        if(err) {
            callback (null)
       }
       else {
           callback (data)
        }
    })
}
const updateUser = (Acc,Pass,Access,idAcc) => {
    db.query('UPDATE account SET Acc = ?,Pass = ?,Access = ? WHERE idAcc = ?',[Acc,Pass,Access,idAcc])
} 
const login = (Acc,Pass,result) => {
    db.query(`SELECT Id FROM account WHERE Name=? AND Pass=? AND Classify =?`,[`0${Acc}`,Pass,'user'], function(err, res){
        if(err) {
            result (null)
            return
        }
        if(res.length) {
            result (res[0])
            return
        }
        result (null,null)
    })
}
const getUserLogin = (Id,result) => {
    db.query(`SELECT Name, UserName, Sdt, Email, Avt, Gender, Birthday, Classify FROM account WHERE Id = ?`,[Id], function(err, res){
        if(err) {
            result (null)
            return
        }
        if(res.length) {
            result (res[0])
            return
        }
        result (null,null)
    })
}
const getPhoneOTP = (Phone,result) => {
    db.query(`SELECT a.Id, a.Name, a.UserName, a.Sdt, a.Email, a.Avt, a.Gender, a.Birthday, a.Classify FROM account a WHERE a.Sdt = ? AND a.Classify =?`,[Phone,['user']], function(err, res){
        if(err) {
            result (null)
            return
        }
        if(res.length) {
            result (res[0])
            return
        }
        result (null,null)
    })
}
const loginAdmin = (Acc,Pass,result) => {
    db.query(`SELECT Id FROM account WHERE Name=? AND Pass=? AND Access = 1`,[Acc,Pass], function(err, res){
        if(err) {
            result (null)
            return
        }
        if(res.length) {
            result (null,res[0])
            return
        }
        result (null,null)
    })
}
const deleteuser = (id) => {
    db.query('DELETE  FROM account WHERE idAcc = ?',[id])
} 
const createVoucher = (Voucher,PriceVoucher,result) => {
    db.query('INSERT INTO voucher (Voucher, PriceVoucher)  VALUE(?,?)',[Voucher,PriceVoucher], function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result (res.insertId)
            return
        }
        result (null,null)
    })
}
const register = (Acc, Sdt, Pass,Classify,Gender,Avt,result) => {
    db.query('INSERT INTO account (Name, Sdt, Pass, Access, Classify, Gender, Avt)  VALUE(?,?,?,?,?,?,?)',[`0${Acc}`,Sdt,Pass,[2],Classify,Gender,Avt], function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result (res.insertId)
            return
        }
        result (null,null)
    })
}
const AddAccEmail = (UserName, Email, Gender,Avt,result) => {
    db.query('INSERT INTO account (Name, UserName, Email, Gender, Pass, Access, Classify, Avt)  VALUE(?,?,?,?,?,?,?,?)',[Email,UserName,Email,Gender,Email,2,'Email',Avt], function(err,res){
        if(err) {
            result (null)
            return
        }
        if(res) {
            result (res.insertId)
            return
        }
        result (null,null)
    })
}
const AddHistoryUser = (User, IdProduct,result) => {
    db.query('CALL AddProduct(?,?)',[User,IdProduct],function(err,res){
        if(err) {
            result (err)
            return
        }
        if(res) {
            result (res)
            return
        }
        result (null,null)
    })

}
const updateAccount = (UserName,Sdt,Email,Gender,BirthDay,IdAcc,result) => {
    db.query('UPDATE account SET UserName = ?, Sdt = ?, Email = ?, Gender = ?,BirthDay = ? WHERE Id = ?',[UserName,Sdt,Email,Gender,BirthDay,IdAcc],function(err,res){
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
const getOldAvt = (Id,result) => {
    db.query('SELECT Avt FROM account WHERE Id = ?',[Id],function(err,res){
        if(err) {
            result (err)
            return
        }
        if(res) {
            result (res[0])
            return
        }
        result (null,null)
    })
} 
const updateAvt = (Avt,Id, result) => {
    db.query('UPDATE account SET Avt = ? WHERE Id = ?',[Avt,Id],function(err,res){
        if(err) {
            result (err)
            return
        }
        if(res) {
            result ('update Avt success')
            return
        }
        result (null,null)
    })
} 
// INSERT INTO `account` (`idAcc`, `Acc`, `Pass`, `Access`) VALUES
// const register = (Acc, Pass) => {
//     db.query('INSERT INTO account (Acc, Pass)  VALUE(?,?)',[Acc,Pass])
// }
module.exports = {
    AddHistoryUser,
    get_all,
    login,
    register,
    deleteuser,
    updateUser,
    getAccount,
    getUser,
    updateAccount,
    getOldAvt,
    updateAvt,
    getAllUser,
    getAllVoucher,
    createVoucher,
    getUserIdAcc,
    loginAdmin,
    getPhoneOTP,
    getEmailAccount,
    AddAccEmail,
    getUserLogin,
}