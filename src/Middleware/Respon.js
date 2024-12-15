require('dotenv').config()
const axios = require('axios');
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs'); // Nếu bạn đang sử dụng Node.js
exports.Respon = async (req, res, next) => {
    let result = {};
    console.log(req.body);
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log('mac =', mac);
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng ở đây
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson['app_trans_id'],
        );
        result.return_code = 1;
        result.return_message = 'success';
        const data = {
          IdPay: dataJson['app_trans_id'],
          result:result
        }
        req.pay = data
        next()
      }
    } catch (ex) {
      console.log('lỗi:::' + ex.message);
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
    // thông báo kết quả cho ZaloPay server
    // res.json(result);
  }