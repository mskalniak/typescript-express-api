import { UsersController } from '../controllers/users.controller';
import { AuthController } from '../controllers/auth.controller';

export class AppRoutes {
    users: UsersController;
    auth: AuthController;
    app: any;

    constructor(app_: any) {
        this.users = new UsersController;
        this.auth = new AuthController;
        this.app = app_;
    }

    initAnonymousRoutes() {
        this.app.get('/get', this.users.addUser);
        this.app.post('/api/authenticate', this.auth.authenticate);
    }

    initAuthenticatedRoutes() {
        this.app.use(this.auth.verifyToken); //must be the first statement in function

        this.app.get('/api', this.users.getInfo);
        this.app.get('/api/users', this.users.getUsers);
    }
    
}