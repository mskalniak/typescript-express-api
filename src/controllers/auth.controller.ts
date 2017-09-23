import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../models/user.model';

export class AuthController {
    constructor() {

    }

    authenticate(req, res) {
        User.findOne({
            name: req.body.name
        }, (err, user) => {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    console.log(user);

                    let token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: '30d'
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    };


    verifyToken(req, res, next) {
        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log(token);
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
};