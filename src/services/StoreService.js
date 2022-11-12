const STORE_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL }/stores`

const getStoresById = (id) => {
    return fetch(`${STORE_URL}/${id}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(err => {
        return []
    })
}

const postStore = (payload) => {
    return fetch(`${STORE_URL}/save`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .catch(err => {
        return {}
    })
}

export {
    getStoresById,
    postStore
}