import axios from 'axios'
import https from 'https'


const HTTP = axios.create({
  // baseURL: 'https://localhost',
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

HTTP.absUrl = function (url) {
  return HTTP.defaults.baseURL + url
}

HTTP.login = function (username, password) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)

  return HTTP.post('/login/', params)
}

HTTP.project = function (project) {
  const opts = {
    transformResponse (text) {
      const urlFields = ['mapcache_url', 'legend_url', 'ows_url']
      const data = JSON.parse(text)
      urlFields.forEach(param => {
        if (data[param]) {
          data[param] = HTTP.defaults.baseURL + data[param]
        }
      })
      return data
    }
  }
  return HTTP.get(`/project.json?PROJECT=${project}`, opts)
}

export default HTTP
