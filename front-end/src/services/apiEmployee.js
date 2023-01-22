/**
 * Crée un employée en utilisant l'API
 * @param {Any} data donnée de l'employée a créer
 * @returns donnée de l'employée créer
 */
export const postEmployee = async (data) => {
    const url = "http://localhost:8000/api/employees/";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json()
}

/**
 * Modifie un employée en utilisant l'API
 * @param {Any} data donnéer de l'employée a modifier
 * @returns 
 */
export const putEmployee = async (data) => {
    const url = `http://localhost:8000/api/employees/${data.id}`;
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

/**
 * Supprime un employée en utilisant l'API
 * @param {int} id identitifiant de l'employée
 */
export const deleteEmployee = async (id) => {
    const url = `http://localhost:8000/api/employees/${id}`;
    
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return true;
}

/**
 * Recupere la liste d'employées via l'api
 * 
 * schemas retourner par l'api:
 * 
 * ```
    {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": [
            {
                "firstname": "John",
                "job": "Commite des disciplines",
                "contact": "0321234567",
                "id": 1,
                "lastname": "Doe",
                "adress": "St street, Versaille, France",
                "user": {
                    "id": 1,
                    "login": "admin",
                    "password": "adminpass",
                    "privilege": "Utilisateur"
                }
            },
            {
                ...
            },
        ]
    }
 * ```
 * 
 * @returns liste d'employées
 */
export const getEmployees = async () => {
    const url= "http://localhost:8000/api/employees/"
    const res = await fetch(url);
    const data = await res.json();
    
    return data["data"];
}

/**
 * Recupere un employée en utilisant l'api
 * 
 * schemas retourner par l'api:
 * 
 * ```
    {
        "status": "success",
        "message": "affichage effectué avec succes",
        "data": {
          "firstname": "John",
          "job": "Commite des disciplines",
          "contact": "0321234567",
          "id": 1,
          "lastname": "Doe",
          "adress": "St street, Versaille, France",
          "user": {
                "id": 1,
                "login": "admin",
                "password": "adminpass",
                "privilege": "Utilisateur"
            }
        }
    }
 * ```

 * @param {int} id identifiant de l'employée
 * @returns employée
 */
export const getEmployee = async (id) => {
    const url= `http://localhost:8000/api/employees/${id}`
    const res = await fetch(url);
    const data = await res.json();
    
    return data["data"];
}