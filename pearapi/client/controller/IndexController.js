class indexController {
    async getMy (req, res) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.status(200).send(ip)
    }
}
module.exports = new indexController();