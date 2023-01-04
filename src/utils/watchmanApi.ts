type fluxExecutionBody = {
  id: string;
};

function sanitizeParams(params: Object) {
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
  for (const filter in paramsCopy.excFilters) {
    if (paramsCopy.excFilters[filter].value === "") {
      delete paramsCopy.excFilters[filter];
    } else {
      paramsCopy.excFilters[filter].value = paramsCopy.excFilters[filter].value
        .split("\n")
        .filter((value) => value !== "");
      if (paramsCopy.excFilters[filter].value.length === 0) {
        delete paramsCopy.excFilters[filter];
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
  try {
    const response = await fetch(`${apiUrl}/fluxexecution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fluxExecutionBody),
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function productsExplorer(params: Object = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const paramsCopy = sanitizeParams(params);
  try {
    const result = await fetch(`${apiUrl}/product/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsCopy),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function receiveProduct(id: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function receiveFluxes() {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/flux`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function generateCsv(fields: String[], filters: any) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/export`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields, filters }),
    });
    const data = await result.text();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function receiveLastReportByFluxId(fluxId: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/report/lastfluxreport/${fluxId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function receiveReports(page: number, limit: number) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/report?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function register(
  email: string,
  username: string,
  password: string
) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export async function login(username: string, password: string) {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const result = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
