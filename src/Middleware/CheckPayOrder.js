require('dotenv').config()
const axios = require('axios');
const CryptoJS = require('crypto-js'); // npm install crypto-js
const qs = require('qs'); // Nếu bạn đang sử dụng Node.js
exports.CheckPayOrder = async (req, res, next) => {
    const { app_trans_id } = req.body;
    const config = {
        app_id: '2553',
        key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
        endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
      };
    let postData = {
      app_id: config.app_id,
      app_trans_id, // Input your app_trans_id
    };
  
    let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  
    let postConfig = {
      method: 'post',
      url: 'https://sb-openapi.zalopay.vn/v2/query',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };
  
    try {
      const result = await axios(postConfig);
      console.log(result.data)
      if(result.data.return_code === 1) {
        const data = {
          IdPay: app_trans_id,
          result: result.data
        }
        req.pay = data
        next()
      }
      else {
        return res.status(200).json(result.data);
      }
      /**
       * kết quả mẫu
        {
          "return_code": 1, // 1 : Thành công, 2 : Thất bại, 3 : Đơn hàng chưa thanh toán hoặc giao dịch đang xử lý
          "return_message": "",
          "sub_return_code": 1,
          "sub_return_message": "",
          "is_processing": false,
          "amount": 50000,
          "zp_trans_id": 240331000000175,
          "server_time": 1711857138483,
          "discount_amount": 0
        }
      */
    } catch (error) {
      console.log('lỗi');
      console.log(error);
    }
  }
  exports.OrderStatus = async (req, res, next) => {
    const { app_trans_id } = req.body;
    const config = {
        app_id: '2553',
        key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
        key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
        endpoint: "https://sb-openapi.zalopay.vn/v2/query"
      };
      let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    }
    
    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    
    let postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };
    
    try {
      const result = await axios(postConfig);
      console.log(result)
      return res.status(200).json(result.data);
    } catch (error) {
      console.log('lỗi');
      console.log(error);
    }
  }