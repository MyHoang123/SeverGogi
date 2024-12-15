var multer = require('multer')
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // +1 vì tháng bắt đầu từ 0
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;
function renameFile(fileName) {
    const [base, extension] = fileName.split('.');
    const newExtension = extension.split('_')[0];
    return `${base}_${extension.split('_')[1]}.${newExtension}`;
  }
var storage = multer.diskStorage({
    destination : (req , file , res) => {
        res(null, './src/public/img')
    },
    filename : (req , file , res) => {
        const newFileName = renameFile(file.originalname);
        res (null, `${formattedDate}_${newFileName}`)
    }
})
var upload = multer({storage : storage})
module.exports = upload