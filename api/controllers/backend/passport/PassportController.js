const ErrorService = require('../../../../config/errors');
const passport = require('passport');

module.exports = {
    //AUTH FACEBOOK
    facebookAuth: function(req, res, next) {
        passport.authenticate('facebook', { scope: ['email']})(req, res, next);
    },
    //CALL BACK FACEBOOK URL
    facebookCallback: function(req, res, next) {
        passport.authenticate('facebook', async(err, user)=> {   
            if(user){
                //ACCOUNT HAS BEEN REGISTERED
                const email = await Customer.findOne({ emailAddress: user.email });
                let newData = {};
                if (email) {
                    req.session.userId = email.id;
                    return res.redirect('/');
                }
                //ACCOUNT IS NOT REGISTERED
                else {
                    newData = {
                        emailAddress: user.email,
                        firstName: user.first_name ? user.first_name : '',
                        lastName: user.last_name ? user.last_name : '',
                        phone: '',
                        birthday: '',
                        address: '',
                        gender : 1,
                    };
                }
                newData.password = await sails.helpers.passwords.hashPassword(user.id);
                // ADD NEW DATA 
                const newUser = await CustomerService.add(newData);
                req.session.userId = newUser.id;
                // RETURN DATA
                return res.redirect('/');
            }
            else{
                return res.notFound(ErrorService.USER_NOT_FOUND);
            }
        })(req, res, next);
        
    },

    //GOOGLE AUTH
    googleAuth: function(req, res) {
        passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
    },
    //CALL BACK GOOGLE URL
    googleCallback: function(req, res, next) {
    passport.authenticate('google', async(err, user) => {
        if(user){
            //ACCOUNT HAS BEEN REGISTERED
            const email = await Customer.findOne({ emailAddress: user.email });
            let newData = {};
            if (email) {
                req.session.userId = email.id;
                return res.redirect('/');
            }
            //ACCOUNT IS NOT REGISTERED
            else {
                user.name = user.name.split(' ');
                let firstName ='' ;
                let lastName = '' ;
                firstName = user.name[0];
                for(let i = 1; i < user.name.length ; i++) {
                    if (i == (user.name.length - 1)) {
                        lastName += user.name[i];
                    } else{
                        lastName += user.name[i] + ' ';
                    }   
                }
                newData = {
                    firstName: firstName,
                    lastName: lastName,
                    emailAddress: user.email.toLowerCase(),
                    phone: '',
                    birthday: '',
                    address: '',
                    gender : 1,
                };
            }
            newData.password = await sails.helpers.passwords.hashPassword(user.id);
            // ADD NEW DATA 
            const newUser = await CustomerService.add(newData);
            req.session.userId = newUser.id;
            return res.redirect('/');
        }
        else{
            return res.notFound(ErrorService.USER_NOT_FOUND);
        }
    })(req, res, next);
    },

};