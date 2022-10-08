const admin = require('../config/firebase-config.js');

class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
    
            if(decodeValue) {
                next();
            } else {
                return res.json({message: "UnAuthorized"})
            }

        } catch (error) {
            return res.json({ message: 'Internal error', error});
        }
    }
}

module.exports = new Middleware();