
module.exports = {
    add: async (req, res) => {
        const params = req.allParams();
        const evaluate = {
            customer: req.me.id,
            product: params.idProduct,
            rate: parseInt(params.rate)
        }
        let evaluateObj = await EvaluateService.add(evaluate);
        return res.ok(evaluateObj);
    },
}