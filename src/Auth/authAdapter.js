const baseUrl = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login(loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({user:{username: loginParams.username, password:loginParams.password}})
    })
    .then(resp => resp.json())
  }

  static signUp(signUpParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({user:{username: signUpParams.username, password:signUpParams.password}})
    }).then(resp => resp.json())
  }

  static currentUser() {
    return fetch(`${baseUrl}/me`, {
      headers: headers()
    }).then(resp => resp.json())
  }

}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
