const path = require('path');
const Img = require('../models/ImgModel')
const fs = require('fs');
exports.Avt = async (req, res) => {
    const User  = req.params.user
        if(User !== 'null') {
            return res.sendFile(path.join(__dirname, '..', 'public', 'img', `${User}`));
        }
}

exports.getImgProduct = async (req, res) => {
    const Product  = req.params.product
    if(Product !== 'null') {
        return res.sendFile(path.join(__dirname, '..', 'public', 'img', `${Product}`));
    }
    
}
exports.HeaderSlide = async (req, res) => {
    const Slide  = req.params.slide
    if(Slide !== 'null') {
        return res.sendFile(path.join(__dirname, '..', 'public', 'img', `${Slide}`));
    }
}
exports.BodyImg = async (req, res) => {
    const Img  = req.params.img
    if(Img !== 'null') {
        return res.sendFile(path.join(__dirname, '..', 'public', 'img', `${Img}`));
    }
}
exports.Video = async (req, res) => {
    const video  = req.params.video
        return res.sendFile(path.join(__dirname, '..', 'public', 'Video', `${video}`));
}
exports.getAllSlide = function (req, res) {
    Img.getAllSlide(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data,
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: 'null',
            })
        }
    })
}
exports.getAllSlideMini = function (req, res) {
    Img.getAllSlideMini(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data,
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: 'null',
            })
        }
    })
}
exports.getAllImgBody = function (req, res) {
    Img.getAllBodyImg(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data,
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: 'null',
            })
        }
    })
}
exports.getAllImgPageNew = function (req, res) {
    Img.getAllImgPageNew(function(data) {
        if(data.length > 0) {
            return res.status(200).json({
                massege: 'thanh cong',
                data: data,
            })
        }
        else {
            return res.status(200).json({
                massege: 'Faile',
                data: 'null',
            })
        }
    })
}
exports.updateSlider = async (req, res) => {
    const name = req.body.Name
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'img', `${name}`));
    Img.updateSlider(req.file.filename,name, function(data) {
        if(data) {
            res.json({ message: 'UpdateSlider Success',
                fileName: req.file.filename
             });
        }
        else {
            res.json({ message: 'Erro Update slider' });
        }
    })
        
}
exports.updateLinkYoutube = async (req, res) => {
    const {newName, Name} = req.body
    Img.updateLinkYoutube(newName,Name, function(data) {
        if(data) {
            res.json({ message: 'Success',
             });
        }
        else {
            res.json({ message: 'Fail' });
        }
    })  
}