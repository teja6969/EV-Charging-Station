export class User {
    username : string;
    password: string;

    constructor () {
        this.username = '';
        this.password = '';
    }
}

export class UserResponse {
    username!: string;
    password!: string;
    email!: string;
    role!: string;
    createdAt!: string;
}