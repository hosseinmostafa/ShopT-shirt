export class USERModul {
    confirmPassword: any;
    constructor(
        public name: string,
        public phone: string,
        public email: string,
        public password: string,
        public isChecked: boolean,
        public City: string,
        public Address: string,
        public cardNumber: string,
        public CVV: string
    ) { }
}