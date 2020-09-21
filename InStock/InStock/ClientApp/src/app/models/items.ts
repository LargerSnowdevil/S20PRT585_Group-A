export class Items {
    id?: number;
    name: string;
    sku: number;
    price: number;
    inStock: boolean;
    quantity: number;
    shop:{
      shopId?:number;
      name:string;
    }
  }