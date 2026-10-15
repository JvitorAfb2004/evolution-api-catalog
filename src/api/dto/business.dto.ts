export class NumberDto {
  number: string;
}

export class getCatalogDto {
  number?: string;
  limit?: number;
  cursor?: string;
}

export class getCollectionsDto {
  number?: string;
  limit?: number;
}

export class createProductDto {
  name: string;
  retailerId?: string;
  url?: string;
  description: string;
  price: number;
  currency: string;
  isHidden?: boolean;
  originCountryCode?: string;
  images: string[];
}

export class updateProductDto {
  productId: string;
  name?: string;
  retailerId?: string;
  url?: string;
  description?: string;
  price?: number;
  currency?: string;
  isHidden?: boolean;
  images?: string[];
}

export class deleteProductDto {
  productIds: string[];
}
