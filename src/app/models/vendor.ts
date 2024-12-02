export class SaveVendorStation {
    vendorid: string;
    vendorName: string;
    stationName: string;
    landmark: string;
    city: string;
    state: string;
    pincode: number;
    phone: number;
    email: string;
    slot: number;
    capacity: string;
    vType: string;
    latitude!: number;
    longitude!: number;
    sl: Array<SlotType>;


    constructor() {
        this.vendorid = '';
        this.vendorName = '';
        this.stationName = '';
        this.landmark = '';
        this.city = '';
        this.state = '';
        this.pincode = 0; 
        this.phone = 0;
        this.email = '';
        this.slot = 0;
        this.capacity = '';
        this.vType = '';
        this.sl = [];
    }
}


export class SlotType {
    slotType!: string;
}

export class RetriveVendor {
    vendorid!: string;
}