import { User } from '../models/user.model';

export class UsersController {
    constructor() {

    }

    addUser(req, res) {
        let userInstance = new User({ name: 'Chris', password: '12321' });

        userInstance.save((err, object) => {
            if (err) return console.error(err);
            console.log('success!');
            res.send(object);
        });
    };

    getInfo(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    };

    getUsers(req, res) {
        User.find({}, (err, users) => {
            res.json(users);
        });
    };
}