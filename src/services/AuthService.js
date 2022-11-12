const AUTH_URL =  `${process.env.REACT_APP_KISARAGI_AUTH_API_URL}`

const login = async(payload) => {
    return await fetch(`${AUTH_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(err => {
        return undefined
    })
}

export {
    login
}