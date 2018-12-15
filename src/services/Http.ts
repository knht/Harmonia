import axios from 'axios'
import { Options } from '../structures/RequestOptions'

export default {
  http: (url: String, options: Options) => {
    return new Promise((resolve, reject) => {
      if(!options.k) reject("You need to set your api key to use this.")
    })
  }
}