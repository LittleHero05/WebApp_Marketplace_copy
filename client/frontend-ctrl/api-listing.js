const create = async (formData) => {
    try {
        let response = await fetch('/api/listings/', {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const list = async (signal) => {
    try {
        let response = await fetch('/api/listings/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/listings/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, user) => {
    try {
        let response = await fetch('/api/listings/' + params.listingId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params) => {
    try {
        console.log("Listing ID:", params.listingId); // Log listingId

        const response = await fetch('/api/listings/' + params.listingId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        console.log("Response Status:", response.status); // Log response status

        const data = await response.json();
        console.log("Response Data:", data); // Log response body

        return data;
    } catch (err) {
        console.error("Error in remove function:", err);
        throw err; // Re-throw to handle it in the calling function
    }
};

export { create, list, read, update, remove }