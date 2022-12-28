import { writable } from 'svelte/store';

export const explorerParams = writable({
    filters: {
        name: {
          value: "",
          strict: false,
        },
        ref: {
          value: "",
          strict: false,
        },
        brand: {
          value: "",
          strict: false,
        },
        url: {
          value: "",
          strict: false,
        },
      },
    sortBy: {
        createdAt: "-1"
    },
    dateBarrier: {
        use:false,
        value: new Date().toISOString().split('T')[0],
        after: true
    },
    page: 1,
    limit: 20,
});

export const productCount = writable(0);
export const totalPages = writable(0);