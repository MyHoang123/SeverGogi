const db = require('../configs/connect')
const getAllSlide = function (result) {
    db.query("SELECT * FROM slide", function (err, slide) {
        if (err || slide.length < 0) {
            result(null)
        }
        else {
            result(slide)
        }
    })
}
const getAllSlideMini = function (result) {
    db.query("SELECT * FROM slidemini", function (err, slide) {
        if (err || slide.length < 0) {
            result(null)
        }
        else {
            result(slide)
        }
    })
}
const getAllBodyImg = function (result) {
    db.query("SELECT * FROM imgbody", function (err, slide) {
        if (err || slide.length < 0) {
            result(null)
        }
        else {
            result(slide)
        }
    })
}
const getAllImgPageNew = function (result) {
    db.query("SELECT * FROM imgpagenew", function (err, slide) {
        if (err || slide.length < 0) {
            result(null)
        }
        else {
            result(slide)
        }
    })
}
const updateSlider = async (Img, Name, result) => {
    db.query('UPDATE slide SET img = ? WHERE img = ?', [Img, Name], function (err, res) {
        if (err) {
            result(err)
            return
        }
        if (res) {
            result('Update Slider Success')
            return
        }
        result(null, null)
    })
}

const updateLinkYoutube = async (Img, Name, result) => {
    db.query('UPDATE imgbody SET Img = ? WHERE Img = ?', [Img, Name], function (err, res) {
        if (err) {
            result(err)
            return
        }
        if (res) {
            result('Update LinkYtb Success')
            return
        }
        result(null, null)
    })
}
module.exports = {
    getAllSlide,
    updateSlider,
    getAllSlideMini,
    getAllBodyImg,
    getAllImgPageNew,
    updateLinkYoutube,
}