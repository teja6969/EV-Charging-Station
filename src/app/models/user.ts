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
    phone!: number;
    createdAt!: string;
    userId!: string;
    id!: number;
}

export class RegisterUser {
    username!: string;
    password!: string;
    email!: string;
    role!: string;
    phone!: string;
}