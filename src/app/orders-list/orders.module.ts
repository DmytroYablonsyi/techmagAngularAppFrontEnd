export interface Order {
    _id: string
    customerName: string;
    product: string;
    quantity: number;
    amount: number;
    delivery: DeliveryDetails;
    createdAt: number
  }

  export interface NewOrder {
    customerName: string;
    product: string;
    quantity: number;
    amount: number;
    delivery: DeliveryDetails;
  }
  
export interface DeliveryDetails {
    method: string;
    time: string;
    price: number;
  }

