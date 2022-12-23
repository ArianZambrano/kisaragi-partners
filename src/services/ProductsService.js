const PRODUCTS_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL }/products`

const getProductsByStore = (storeId) => {
    return fetch(`${PRODUCTS_URL}/by_store`, {
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

const getProductsByCategory = (categoryId) => {
    return fetch(`${PRODUCTS_URL}/by_category`, {
        method: 'POST',
        body: JSON.stringify({id: categoryId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return []
    })
}

const postProduct = (payload) => {
    return fetch(`${PRODUCTS_URL}/save`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return []
    })
}

export {
    getProductsByStore,
    getProductsByCategory,
    postProduct
}