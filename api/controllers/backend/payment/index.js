module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/payment/index',
      },
      redirect: {
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {
      if (!this.req.me) {
        throw { redirect: '/login' };
      }
      if (!this.req.session.shipping) {
        throw { redirect: '/payment' };
      }
      let _default = await sails.helpers.getDefaultData(this.req);
      let productTypeObj = await ProductTypeService.find({status: sails.config.custom.STATUS.ACTIVE});
      _default.productTypeObj = productTypeObj;
      _default.profile = this.req.me;
      var shipping = this.req.session.shipping;
      var cart = this.req.session.cart;
      if (cart != undefined) {
      var cart = cart
      } else {
      var cart = 0
      }
      _default.cart = cart;
      _default.shipping = shipping
      return exits.success(_default);
    }
};