export class USERModul {
    confirmPassword: any;
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public password: string,
        public isChecked: boolean,
        public City: string, // Add City property
        public Address: string, // Add Address property
        public cardNumber: string, // Add cardNumber property
        public CVV: string // Add CVV property
    ) { }
}