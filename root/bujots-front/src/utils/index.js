export async function patch(url, payload, token = "") {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
    });
}

export async function post(url, payload, token = "") {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
    });
}

export async function post_form(url, payload, token = "") {
    let headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: payload
    });
}

export async function put(url, payload, token = "") {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
    });
}

export async function put_form(url, payload, token = "") {
    let headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: payload
    });
}

export async function get(url, token = "") {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

export async function getPNG(url, token = "") {
    let headers = {
        'Accept': 'image/png',
        'Content-Type': 'image/png'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

export async function del(url, token = "") {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    return await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: headers,
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
}