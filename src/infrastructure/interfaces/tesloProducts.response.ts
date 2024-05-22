export interface TesloProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  // tags: Tag[];
  tags: [];
  images: string[];
  user: TesloUser;
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}

// export enum Tag {
//    Hoodie = "hoodie",
//    Jacket = "jacket",
//    Shirt = "shirt",
// }

export interface TesloUser {
  id: string;
  // email: Email;
  email: string;
  // fullName: FullName;
  fullName: string;
  isActive: boolean;
  // roles: Role[];
  roles: string[];
}

// export enum Email {
//    Test1GoogleCOM = "test1@google.com",
// }

// export enum FullName {
//    JuanCarlos = "Juan Carlos",
// }

// export enum Role {
//    Admin = "admin",
// }
