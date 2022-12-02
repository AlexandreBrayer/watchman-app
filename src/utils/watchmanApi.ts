type fluxExecutionBody = {
    "id": string,
}

export async function executeFlux(fluxExecutionBody: fluxExecutionBody) {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(`${apiUrl}/fluxexecution`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fluxExecutionBody),
    })
    return response.json()
}