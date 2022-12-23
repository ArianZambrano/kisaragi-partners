const STORE_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL }/stores`

const getStoresById = (adminId) => {
    return fetch(`${STORE_URL}/admin_id`, {
        method: 'POST',
        body: JSON.stringify({adminId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return []
    })
}

const getStore = (storeId) => {
    return fetch(`${STORE_URL}/id`, {
        method: 'POST',
        body: JSON.stringify({id: storeId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return []
    })
}

const postStore = (payload) => {
    return fetch(`${STORE_URL}/save`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {}
    })
}

const postStoreCategories = (storeId, storeCategoriesIds) => {
    return fetch(`${STORE_URL}/set_categories`, {
        method: 'POST',
        body: JSON.stringify({storeId, storeCategoriesIds}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {}
    })
}

export {
    getStoresById,
    postStore,
    getStore,
    postStoreCategories,
}