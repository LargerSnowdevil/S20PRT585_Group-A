export class Inventory {
    sku?: number;
    available: number;
    quantity: number;
    shopId: number;
    itemId: number;
    items:{
        id:number;
        name:string;
    };
    shops:{
        shopId:number;
        name:string;
    };
}



 
//     "shops": {
//       "shopId": 1,
//       "name": "Kmart",
//       "contactNumber": null,
//       "address": null,
//       "lat": 0,
//       "long": 0
//     }
//   },