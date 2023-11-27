export interface Address {
    address: string;
    balance: number;
    label: string;
    sent: number;
    received: number;
}

export class Address implements Address {
    constructor(
        public address: string,
        public balance: number,
        public label: string,
        public sent: number,
        public received: number
    ) { }
}
