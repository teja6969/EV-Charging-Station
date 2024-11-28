export class User {
    email : string;
    password: string;

    constructor () {
        this.email = '';
        this.password = '';
    }
}

export class UserResponse {
    username!: string;
    password!: string;
    email!: string;
    role!: string;
    phone!: string;
    createdAt!: string;
}

export class RegisterUser {
    username!: string;
    password!: string;
    email!: string;
    role!: string;
    phone!: string;
}