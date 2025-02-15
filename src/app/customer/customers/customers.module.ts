export interface Customer {
    _id?: string;
    name: string;
    address: {
      city: string; 
      street: string; 
    };
    phone: string; 
    contactPerson: string;
  }
  