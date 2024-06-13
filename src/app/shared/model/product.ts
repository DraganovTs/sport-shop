export interface Iproduct {
    productId: number;
    price: number;
    title: string;
    sku: string;
    description: string;
    categoryName: string;
    brandName: string;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
}

export interface iBrand {
    brandId: number;
    brandName: string;
}

export interface iCategory {
   categoryId: number;
   categoryName: string;
    
}