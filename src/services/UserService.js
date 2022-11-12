const USER_URL = `${process.env.REACT_APP_KISARAGI_AUTH_API_URL}`

const postUser = async(payload) => {
    return fetch(`${USER_URL}/users`, {
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
    postUser
}