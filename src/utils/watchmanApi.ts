type fluxExecutionBody = {
  id: string;
};

function sanitizeParams(params: Object) {
  console.log(params)
  const paramsCopy = JSON.parse(JSON.stringify(params));
  for (const filter in paramsCopy.filters) {
    if (paramsCopy.filters[filter].value === "") {
      delete paramsCopy.filters[filter];
    } else {
      paramsCopy.filters[filter].value = paramsCopy.filters[filter].value
        .split("\n")
        .filter((value) => value !== "");
      if (paramsCopy.filters[filter].value.length === 0) {
        delete paramsCopy.filters[filter];
      }
    }
  }
  if (paramsCopy.dateBarrier?.use === false) {
    delete paramsCopy.dateBarrier;
  }
  return paramsCopy;
}

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

export async function productsExplorer(params: Object = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const paramsCopy = sanitizeParams(params);
  const result = await fetch(`${apiUrl}/product/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paramsCopy),
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

export async function generateCsv(fields: String[], filters: any) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const result = await fetch(`${apiUrl}/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields, filters }),
  });
  const data = await result.text();
  return data;
}

export async function countProducts(params: Object = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const paramsCopy = sanitizeParams(params);
  const result = await fetch(`${apiUrl}/product/count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paramsCopy),
  });
  const data = await result.json();
  return data;
}
