const BASE_URL = "https://scm-api.vercel.app"//"http://10.4.21.56:5500";


export const get = async (resource: string, data:any,auth=false) => {
    let headers= {}
    if (auth) {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        if (token) {
            headers = {
                'Authorization': 'Bearer ' + token.access_token ,
            }
        }
    }
    data.resource = resource
    //build the query string of resource
    let queryString = '';
    if (data) {
        queryString += Object.keys(data).map(key => key + '=' + data[key]).join('&')
    }
    const response = await fetch(BASE_URL + '?' + queryString,{
        headers:headers
    })
  return await response.json()
}

export const post = async (resource: string, data: any,auth=false) => {

    let headers= {
        'Content-Type': 'application/json',
        'Authorization' : ''
    }
    if (auth) {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        if (token) {
            headers = {
                ...headers,
                'Authorization': 'Bearer ' + token.access_token,
            };        }
    }
    data.resource = resource
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers:headers ,
    body: JSON.stringify(data),
  })
  return await response.json()
}
