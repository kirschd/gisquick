import axios from 'axios'
import https from 'https'

const HTTP = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

HTTP.login = function (username, password) {
  const params = new FormData()
  params.append('username', username)
  params.append('password', password)
  return HTTP.post('/api/auth/login/', params)
}

HTTP.logout = function () {
  return HTTP.get('/api/auth/logout/')
}

HTTP.project = function (project) {
  return new Promise((resolve, reject) => {
    HTTP.get(`/api/map/project/?PROJECT=${project}`)
      .then(resp => resolve(resp.data))
      .catch(err => {
        if (err.response && err.response.data.status) {
          reject(err.response.data)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ status: 500 })
        }
      })
  })
}

export default HTTP
