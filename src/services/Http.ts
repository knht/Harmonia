import axios from 'axios'
import { Options } from '../structures/interfaces/RequestOptions'

export default {
  http: (url: String, options: Options) => {
    return new Promise((resolve, reject) => {
      if(!options.k) reject(new Error("You need to set your api key to use this."))
      axios({ 
        method: 'GET', 
        url: `${url}`, 
        responseType: "json", 
        headers: {
          'User-Agent': `Harmonia ${require('../../package.json').version} (https://github.com/Kotowaru/Harmonia)`
        },
        data: options 
      }).then((response) => {
        if(response.status !== parseInt('200')) {
          return reject(new Error(`Failed to send request: ${response.statusText}`))
        }
        resolve(response.data)
      })
    })
  }
}