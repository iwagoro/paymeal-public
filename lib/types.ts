//! ユーザー情報の型定義
export interface userProps {
    email: string;
    token: string;
}

//! チケット情報の型定義
export interface ticketProps {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    img_url: string;
}

//! カート情報の型定義
export interface cartProps {
    items: ticketProps[];
    status: string;
    id: string;
}
