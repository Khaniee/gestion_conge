// apiAbscence.js

export const ABSCENCES_STATUS = {
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    PENDING: "pending",
}

export const getAbscences = async () => {
    const url= "http://localhost:8000/api/abscences/"
    const res = await fetch(url);
    const data = await res.json();
    
    return data["data"];
}

/**
 * Modifie un employée en utilisant l'API
 * @param {Any} data donnéer de l'employée a modifier
 * @returns 
 */
export const putAbscence = async (data) => {
    const url = `http://localhost:8000/api/abscences/${data.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json()
}
