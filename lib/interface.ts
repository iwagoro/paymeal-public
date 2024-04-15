export interface menuProps {
    name: string;
    price: number;
    stock: number;
    image: string;
    content: string[];
}

export interface bagProps {
    name: string;
    price: number;
    image: string;
}

export interface userDataProps {
    email: string;
    bag: string[];
    orders: string[];
}
