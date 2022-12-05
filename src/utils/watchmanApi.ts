type fluxExecutionBody = {
  id: string;
};

export async function executeFlux(fluxExecutionBody: fluxExecutionBody) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/fluxexecution`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fluxExecutionBody),
  });
  return response.json();
}

export async function productsExplorer(
  page: number,
  filters: Object = {},
  limit: number = 20
) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const result = await fetch(`${apiUrl}/product/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      limit: limit,
      filters: filters,
    }),
  });
  const data = await result.json();
  return data;
}

export async function receiveProduct(id: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const result = await fetch(`${apiUrl}/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data;
}

export async function receiveFluxes() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const result = await fetch(`${apiUrl}/flux`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const data = await result.json();
    return data;
}