const STORE_CATEGORIES_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL}/store_categories`


const getCategories = () => {
    return fetch(`${STORE_CATEGORIES_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return {}
    })
}

const getCategoriesByStore = (storeId) => {
    return fetch(`${STORE_CATEGORIES_URL}/id`, {
        method: 'POST',
        body: JSON.stringify({id: Number(storeId)}),
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
    getCategories,
    getCategoriesByStore
}