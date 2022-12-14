/// <reference types="svelte" />
/// <reference types="vite/client" />

type Filters = {
  name: {
    value: string;
    strict: boolean;
  };
  ref: {
    value: string;
    strict: boolean;
  };
  brand: {
    value: string;
    strict: boolean;
  };
  url: {
    value: string;
    strict: boolean;
  };
};

type Product = {
  _id: string;
  name: string;
  ref: string;
  brand: string;
  url: string;
  price: number;
  currency: string;
  images: [string];
  reducedPrice: number;
  updatedAt: string;
  createdAt: string;
  meta: any;
};

type ExplorerParams = {
  sortBy: {
    createdAt: "-1" | "1";
  };
  dateBarrier: {
    use: boolean;
    value: string;
    after: boolean;
  };
  page: number;
  limit: number;
  filters: Filters;
};
