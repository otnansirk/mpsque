export const get = (key = "") => {
    const cookies = document.cookie.split('; ')
    const cookie = Object.fromEntries(cookies.map(item => item.split('=')))

    return key ? cookie[key]: cookie
}