const AUTH_URL =  `${process.env.REACT_APP_KISARAGI_AUTH_API_URL}`

const login = (payload) => {
    return fetch(`${AUTH_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        if (res.hasOwnProperty('detail')) {
            return false;
        }
        localStorage.setItem('token', res.token)
        localStorage.setItem('c_user', JSON.stringify(res.user))
        return true
    })
    .catch(err => {
        return undefined
    })
}

const isAuth = () => {
    if (localStorage.hasOwnProperty('c_user')){
        return localStorage.getItem('c_user')
    }
    return undefined
}

export {
    login,
    isAuth
}