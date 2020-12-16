const moment = require('moment');
module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/order/index',
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
      let orders = await OrderService.find({customer: this.req.me.id});
      this.req.param('id')
      for(let order of orders) {
        order.orderDate = moment(order.orderDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
      }
      _default.productTypeObj = productTypeObj;
      _default.profile = this.req.me;
      var cart = this.req.session.cart;
      var shipping = this.req.session.shipping;
      if (cart != undefined) {
      var cart = cart
      } else {
      var cart = 0
      }
      _default.orders = orders;
      _default.cart = cart;
      _default.shipping = shipping;
      return exits.success(_default);
    }
};