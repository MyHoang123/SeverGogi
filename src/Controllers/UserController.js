var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require("dotenv").config()
const Account = require('../models/UserModel')
// Account
exports.sendOTP = (req, res) => {
    const Phone = req.Phone
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.verify.v2.services(process.env.TWILIO_AUTH_SEVICE_SID)
          .verifications
          .create({to: `+84${Phone}`, channel: 'sms'})
          .then(()=> {
            return res.status(200).json({
                massege: 'Thanh cong',
                })
          });
}
exports.verifyOTP = (req, res) => {
    const { OTP } = req.body
    const Phone = req.Phone
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const to = `+84${Phone}`;
    const token = `${OTP}`; 
    // check OTP
    client.verify.v2.services(process.env.TWILIO_AUTH_SEVICE_SID)
     .verificationChecks
     .create({to, code: token})
     .then(check => {
       if (check.status === "approved") {
        Account.getPhoneOTP(parseInt(`${Phone}`),(data) => {
            if(data !== null ) {
                let name = ''
                if(!data.UserName) {
                    const random4Digits = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
                    name = `${data.Id}${random4Digits}_Gogihouse_user`
                }else{
                    name = data.UserName
                }
                let token = jwt.sign({Id: data.Id}, process.env.ACCESS_JWT_SECRET);
                delete data.Id
                data.UserName = name
                return res.status(200).json({
                    massege: 'Thanh cong',
                    data: data,
                    token: token,
                    })
            }
            else {
                return res.status(200).json({
                    massege: 'That bai',
                    })
            }
        })
       } else {
        return res.status(200).json({
            massege: 'That bai',
            })
       }
     });
}
exports.sendOTPRegister = (req, res) => {
    const Phone = req.Phone
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.verify.v2.services(process.env.TWILIO_AUTH_SEVICE_SID)
          .verifications
          .create({to: `+84${Phone}`, channel: 'sms'})
          .then(()=> {
            return res.status(200).json({
                massege: 'Thanh cong',
                })
          });
}
exports.verifyOTPRegister = (req, res) => {
    const { OTP } = req.body
    const Phone = req.Phone
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const to = `+84${Phone}`;
    const token = `${OTP}`; 
    // check OTP
    client.verify.v2.services(process.env.TWILIO_AUTH_SEVICE_SID)
     .verificationChecks
     .create({to, code: token})
     .then(check => {
       if (check.status === "approved") {
            Account.getAccount(Phone,(user) => {
                if(user !== null) {
                    let name = ''
                    if(!user.UserName) {
                        const random4Digits = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
                        name = `${user.Id}${random4Digits}_Gogihouse_user`
                    }else{
                        name = user.UserName
                    }
                let token = jwt.sign({Id:user.Id}, process.env.ACCESS_JWT_SECRET);
                delete user.Id
                user.UserName = name
                return res.status(200).json({
                    massege: 'Ton tai',
                    data: user,
                    token: token,
                })
            }
                else {                
                    let token = jwt.sign({Phone:Phone}, process.env.ACCESS_JWT_REGISTER);
                    if(token) {
                        return res.status(200).json({
                            massege: 'Thanh cong',
                            token: token,
                            })
                    }
                }
            })
       } else {
        return res.status(200).json({
            massege: 'That bai',
            })
       }
     });
}
exports.login = async (req, res) => {
    const { Pass } = req.body;
    const Phone = req.Phone
    if (Phone && Pass) { 
        Account.login(Phone,Pass,function(user){
            let name = ''
            if(user) {
                    if(!user.UserName) {
                        const random4Digits = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
                        name = `${user.Id}${random4Digits}_Gogihouse_user`
                    }else{
                        name = user.UserName
                    }
                let token = jwt.sign({Id:user.Id}, process.env.ACCESS_JWT_SECRET);
                delete user.Id
                user.UserName = name
                return res.status(200).json({
                    massege: 'Thanh cong',
                    data: user,
                    token: token,
                    })
            }
            else {
                return res.status(200).json({
                    massege: 'That bai',
                 })
            }
        })
    }
}
exports.loginAdmin = async (req, res) => {
    const {Acc, Pass} = req.body;
    if (Acc && Pass) { 
        Account.loginAdmin(Acc,Pass,(err,user)=>{
            if(user) {
                const newUser = {
                    Id: user.Id
                }
                let token = jwt.sign(newUser, process.env.ACCESS_JWT_SECRET);
                return res.status(200).json({
                    massege: 'Success',
                    token: token
                    })
            }
            else {
                return res.status(200).json({
                    massege: 'that bai',
                 })
            }
        })
    }
}
exports.showListUser = function (req, res) {
    Account.get_all(function(data) {
        return res.status(200).json({
            massege: 'thanh cong',
            data: data
         })
    })
}

exports.updatePassRegister = function (req, res) {
    const { Pass, Gender } = req.body
    const Phone = req.phone
    Account.register(Phone,Phone,Pass,'user',Gender, parseInt(Gender) === 1 ? 'male.png' : parseInt(Gender) === 2 ? 'female.png' : 'other.png', (user) => {
        if(user !== null) {
            return res.status(200).json({
                massege: 'Thanh cong',
             })
        }
        else {
            return res.status(200).json({
                massege: 'that bai',
             })
        }
    })
}

exports.updateAvt = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
    else {
        Account.getOldAvt(req.Id, function(data) {
            if(data.Avt.length !== 0) {
                if(data.Avt !== 'male.png' && data.Avt !== 'female.png') {
                    fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', `${data.Avt}`))
                }
                Account.updateAvt(req.file.filename,req.Id, function(data) {
                    if(data) {
                        res.json({ message: 'Thanh cong',
                            fileName: req.file.filename
                         });
                    }
                    else {
                        res.json({ message: 'That bai' });
                    }
                })        
            }
            else {
                Account.updateAvt(req.file.filename,req.Id, function(data) {
                    if(data) {
                        res.json({ message: 'Thanh cong',
                            fileName: req.file.filename
                         });
                    }
                    else {
                        res.json({ message: 'erro' });
                    }
                })        
            }
        })
      }
      // Thực hiện các xử lý cần thiết với file
}
exports.createAccount = async (req, res) => {
    const {Name, Pass, Classify} = req.body;
        await Account.register(Name,'',Name,Pass,2,Classify,'',(user) => {
            if(user) {
                Account.addCard(user,(data) => {
                    if(data !== null) {
                        return res.status(200).json({
                            massege: 'Thanh Cong',
                         })
                    }
                    return res.status(200).json({
                        massege: 'that bai',
                     })
                })
            }
            else {
                return res.status(200).json({
                    massege: 'that bai',
                 })
            }
        } )
        }
exports.checklogiUser = (req, res) => {
    const {UserName, Email, Avt} = req.body
         Account.getEmailAccount(Email, (user) => {
             if(user !== null) {
                let token = jwt.sign({Id:user.Id}, process.env.ACCESS_JWT_SECRET);
                delete user.Id
                return res.status(200).json({
                    massege: 'Thanh cong',
                    data: user,
                    token: token,
                    })
            }
            else {
              Account.AddAccEmail(UserName,Email,0,Avt,(user) => {
                    if(user !== null) {
                        const userNew = {
                            UserName: UserName,
                            Birthday: '',
                            Classify: 'Email',
                            Email: Email,
                            Gender: 0,
                            Name: '',
                            Sdt: 0,
                            Avt: Avt
                        }
                        let token = jwt.sign({Id:user}, process.env.ACCESS_JWT_SECRET);
                        return res.status(200).json({
                            massege: 'Thanh cong',
                            data: userNew,
                            token: token,
                            })
                    }
                    else {
                        return res.status(200).json({
                            massege: 'That bai',
                        })
                    }
                })
            }
        } )
    }
// user
exports.getAllUser = function (req, res) {
    Account.getAllUser(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: null
            })
        }
    })
}
// Voucher
exports.getAllVoucher = function (req, res) {
    Account.getAllVoucher(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: null
            })
        }
    })
}
exports.createVoucher = async (req, res) => {
    const {Voucher, PriceVoucher} = req.body;
        await Account.createVoucher(Voucher,PriceVoucher,(user) => {
            if(user !== null) {
                return res.status(200).json({
                    massege: 'Thanh Cong',
                 })
            }
            else {
                return res.status(200).json({
                    massege: 'that bai',
                 })
            }
        } )
        }
exports.getUser = function (req, res) {
    const { IdAcc } = req.body
    Account.getUser(IdAcc,function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: null
            })
        }
    })
}
exports.getUserId = function (req, res) {
    const { IdAcc } = req.body
    Account.getUserIdAcc(IdAcc,function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: null
            })
        }
    })
}
exports.updateUser = async (req, res) => {
    const {UserName, PhoneNumber, Email, Gender,Birthday } = req.body
    const IdAcc  = req.Id
    const regex = /^\d{9}$/
    const isvalidSdt = regex.test(PhoneNumber)
    if(isvalidSdt) {
            Account.updateAccount(UserName, PhoneNumber, Email, Gender, Birthday, IdAcc, (data) => {    
            if(data !== null) {
                return res.status(200).json({
                    massege: 'Thanh cong',
                })
            }
            else {
                return res.status(200).json({
                    massege: 'That bai',
                })
            }
        } )
    }
    else {
        return res.status(200).json({
            massege: 'That bai',
        })
    }
       
        }
        
// exports.deleteUser = async (req, res) => {
//     const id = req.params.iduser
//     await Account.deleteuser(id)
//     return res.status(200).json({
//         massege: 'Thanh Cong',
//      })
// }