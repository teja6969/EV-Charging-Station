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

export class CityObject {
    city: string;

    constructor() {
        this.city = '';
    }
}


export class pincodeObject {
    pincode: number;

    constructor() {
        this.pincode = 0;
    }
}

export class predictTime {
    vendorid: string;
    batterycapacity: number;
    currentcharge: number;
    stationid: number

    constructor() {
        this.vendorid = '';
        this.batterycapacity = 0;
        this.currentcharge = 0;
        this.stationid = 1;
    }
}

export class response {
    message!: string;
}

export class reservation {
    evbrand!: string;
    evmodel!: string;
    stationID!: number;
    vendorid!: string;
    batteryStatus!: number;
    sdatet!: string;
    edatet!: string;
    slotType!: string;
    paymentType!: string;
    status!: string;

}