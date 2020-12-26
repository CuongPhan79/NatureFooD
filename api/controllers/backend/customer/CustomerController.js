/**
 * SingUp
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const ErrorService = require('../../../../config/errors');
const moment = require('moment');
module.exports = {
  register: async (req, res) => {
      sails.log.info("================================ SingUp.add => START ================================");
      // GET ALL PARAMS
      const params = req.allParams();
      // CHECK INFO USER
      if (!params.firstName || !params.firstName.trim().length) {
        return res.ok({code: 'REQUIRED', message: 'Họ và tên đệm là trường bắt buộc'});
      }
      if (!params.lastName || !params.firstName.trim().length) {
          return res.ok({code: 'REQUIRED', message: 'Tên là trường bắt buộc'});
      }
      if (!params.emailAddress || !params.emailAddress.trim().length) {
          return res.ok({code: 'REQUIRED', message: 'Email là trường bắt buộc'});
      }
      //CHECK DUPLICATE EMAIL & PHONE
      const email = await Customer.findOne({ emailAddress: params.emailAddress });
      if (email) return res.ok({code: 'EMAILEXISTS', message: 'Email đã tồn tại'});
      //CHECK COMFIRM PASSWORD
      if (params.password != params.passwordConfirm) return res.ok({code: 'NOTMATCH', message: 'Mật khẩu không khớp'});
      // PREPARE DATA
      const newData = {
        firstName: params.firstName ? params.firstName : '',
        lastName: params.lastName ? params.lastName : '',
        emailAddress: params.emailAddress.toLowerCase(),
        phone: params.phone ? params.phone : '',
        birthday: params.birthday ? params.birthday : '',
        address:params.address ? params.address : '',
        status : params.status ? params.status : 1,
        gender : params.gender ? params.gender : 1,
      };
      newData.password = await sails.helpers.passwords.hashPassword(params.password);
      // ADD NEW DATA 
      const newUser = await CustomerService.add(newData);
      req.session.userId = newUser.id;
      // RETURN DATA
      return res.ok(newUser);
  },
  edit: async (req, res) => {
    sails.log.info("================================ CustomerController.edit => START ================================");
    // GET ALL PARAMS
    const params = req.allParams();
    // CHECK NAME & EMAIL & PHONE $ ADDRESS
    if (!params.firstName || !params.firstName.trim().length) {
      return res.badRequest(ErrorService.CUSTOMER_NAME_REQUIRED);
    }
    if (!params.lastName || !params.lastName.trim().length) {
        return res.badRequest(ErrorService.CUSTOMER_NAME_REQUIRED);
    }
    if (!params.emailAddress || !params.emailAddress.trim().length) {
    return res.badRequest(ErrorService.CUSTOMER_EMAIL_REQUIRED);
    }
    if (!params.phone || !params.phone.trim().length) {
      return res.badRequest(ErrorService.CUSTOMER_PHONE_REQUIRED);
    }
    // CHECK DATA
    if (params.password && params.password.trim()!=''){
      if (params.password != params.passwordConfirm) return res.ok(ErrorService.PASSWORD_IS_NOT_MATCH);
    }
    const dataObj = await CustomerService.get({ id: params.id });
    if (!dataObj) return res.notFound();
    // PREPARE DATA
    const editData = {
      firstName: params.firstName,  // REQUIRED
      lastName: params.lastName,  // REQUIRED
      gender: params.gender,
      emailAddress: params.emailAddress, // REQUIRED
      phone: params.phone, // REQUIRED
      birthday: params.birthday
    };
    if (params.password) {
      editData.password = await sails.helpers.passwords.hashPassword(params.password);
    }
    // UPDATE DATA TITLE
    const editObj = await CustomerService.edit({ id: params.id }, editData);
    // RETURN DATA TITLE
    return res.json(editObj);
  },
}