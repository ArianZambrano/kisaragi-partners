const STORE_URL = `${process.env.REACT_APP_KISARAGI_CORE_API_URL }/stores`

export async function postStore(payload) {
    return await fetch(`${STORE_URL}/save`, {
        method: 'POST',
        body: payload
    })
    .then(res => res.json())
    .catch(err => {
        return {}
    })
}