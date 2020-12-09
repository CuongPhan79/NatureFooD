module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/shipping/index',
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
      _default.productTypeObj = productTypeObj;
      _default.profile = this.req.me;
      var cart = this.req.session.cart
      if (cart != undefined) {
      var cart = cart
      } else {
      var cart = 0
      }
      _default.cart = cart
      return exits.success(_default);
    }
};