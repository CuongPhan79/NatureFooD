module.exports = {
    friendlyName: 'View Register',
    description: 'Display "Register" page.',
    exits: {
      success: {
        viewTemplatePath: 'backend/pages/entrance/register',
      },
      redirect: {
        description: 'The requesting user is already registed in.',
        responseType: 'redirect'
      }
    },
  
    fn: async function (inputs, exits) {
      return exits.success({
        
      });
    }
  };
  