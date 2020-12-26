const moment = require('moment');
module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/evaluate/index',
      },
      redirect: {
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {
      if (!this.req.me) {
        throw { redirect: '/login' };
      }
      let _default = await sails.helpers.getDefaultData(this.req);
      let productTypeObj = await ProductTypeService.find({status: sails.config.custom.STATUS.ACTIVE});
      let idProduct = this.req.param('id');
      let productObj = await ProductService.get({id: idProduct});
      let imageObj = productObj.image.split("_");
      let type = imageObj[1].split(".");
      let rate = await EvaluateService.get({and: [
        {
          product: idProduct,
          customer: this.req.me.id
        }
      ]})
      let listProductRate = await EvaluateService.find({product: idProduct});
      let listRate = [];
      for(item of listProductRate) {
        listRate.push(item.rate)
      } 
      let sum = 0;
      for( let i = 0; i < listRate.length; i++ ){
          sum += parseInt( listRate[i], 10 ); //don't forget to add the base
      }
      let rateAvg = (sum!=0) ? sum/listRate.length : 0;
      rateAvg = rateAvg.toFixed(2)
      productObj.img = imageObj[0] + "_origin." + type[1];
      _default.productTypeObj = productTypeObj;
      _default.profile = this.req.me;
      var cart = this.req.session.cart;
      if (cart != undefined) {
      var cart = cart
      } else {
      var cart = 0
      }
      _default.productObj = productObj;
      _default.cart = cart;
      _default.link = {
        arrlink: [

        ],
        linkAcctive: {
          name: "Đánh giá",
          link: "/evaluate"
        }
      }
      _default.rate = rate;
      _default.rateAvg = rateAvg;
      return exits.success(_default);
    }
};