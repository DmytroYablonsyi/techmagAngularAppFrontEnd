export interface DeliveryMethod {
    method: string;
    time: string;
    price: number;
  }
  
export interface Product {
    _id: string,
    name: string;
    description: string;
    price: number;
    delivery: {
      available: boolean;
      methods: DeliveryMethod[];
    };
  }
  