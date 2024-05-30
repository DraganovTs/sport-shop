export interface Iproduct {
    productId: number;
    price: number;
    title: string;
    sku: string;
    description: string;
    categoryName: string;
    brandName: string;
    imgUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
}

export interface iBrand {
    brandId: number;
    name: string;
}

export interface iCategory {
   categoryId: number;
    name: string;
}