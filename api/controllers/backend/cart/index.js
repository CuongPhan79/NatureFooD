module.exports = {
    inputs: {},
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/cart/index',
      },
      redirect: {
        responseType: 'redirect'
      }
    },
    fn: async function (inputs, exits) {
      let _default = await sails.helpers.getDefaultData(this.req);
      let productTypeObj = await ProductTypeService.find({status: sails.config.custom.STATUS.ACTIVE});
      _default.productTypeObj = productTypeObj;
      var cart = this.req.session.cart
      if (cart != undefined) {
      var cart = cart
      } else {
      var cart = 0
      }
      _default.cart = cart
      _default.link = {
        arrlink: [],
        linkAcctive: {
          name: "Giỏ hàng",
          link: "/cart"
        }
      }
      return exits.success(_default);
    }
};