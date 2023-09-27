const encodeStringToUrl = (text: string) => {
    return encodeURIComponent(text).replace(/%20/g, '+').replace(/!/g, '%21')
}

export default encodeStringToUrl