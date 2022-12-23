const PRODUCT_CATEGORIES_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL }/product_categories`

const postProductCategories = (payload) => {
    return fetch(`${PRODUCT_CATEGORIES_URL}/save`, {
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

const getProductCategoriesByStore = (storeId) => {
    return fetch(`${PRODUCT_CATEGORIES_URL}/by_store`, {
        method: 'POST',
        body: JSON.stringify({id: storeId}),
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
    postProductCategories,
    getProductCategoriesByStore
}