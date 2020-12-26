module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'backend/pages/entrance/edit-profile',
    },
    redirect: {
      responseType: 'redirect',

    }

  },


  fn: async function (inputs, exits) {
    let _default = await sails.helpers.getDefaultData(this.req);
    if(this.req.me){
      let profile = await CustomerService.get({id: this.req.me.id});
      _default.profile = profile;
      return exits.success(_default);
    }else{
      throw {redirect: '/login'};
    }
  }


};
