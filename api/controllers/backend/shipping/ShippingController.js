module.exports = {
    add: async (req, res) => {
        const params = req.allParams();
        // if (!params.fullName || !params.fullName.trim().length) {
        //     return res.badRequest(ErrorService.CUSTOMER_NAME_REQUIRED);
        // }
        const shipping = {
            fullName: params.fullName,
            phone: params.phone,
            address: params.address,
            type: params.type 
        };
        req.session.shipping = shipping;
        return res.ok()
    },
}