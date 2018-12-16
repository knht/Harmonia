
import { Request } from './services/Request'
import { Modes } from './structures/enums/Modes'
import { AxiosResponse } from 'axios'

export class Harmonia {

  /**
   * Create an instance of harmonia
   * @param {string} apiKey - The api key for accessing the osu api
   * @param {object} options - Options Harmonia will use (Optional)
   * @param {number} [options.maxAge] - Maximum time of which you wish to store the request for. Default is 15 minutes ( 15 * 60 * 1000).
   * @param {string[]} [options.excludedEndpoints=[]] - Endpoints you don't want cached. Default is None.
   */

  apiKey: String
  options: Object
  requestHandler: any
  constructor(key: String, options: Object) {
    this.apiKey = key
    this.options = options
    this.requestHandler = new Request(options)
  }
  
  /**
   * Fetches user data
   * @param {string} username - The username you want the data for
   * @param {string} mode - Specify the mode you want to use (Standard is returned by default)
   * @param {number} [eventDays=1] - How many days you want to search for the last event. Default is 1.
   */

  getUser(username: string, mode: Modes, eventDays: number=1) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) reject(new Error('You haven\'t set an api key'))
      if(!username) reject(new Error('A username is required to search for a user'))
      if(!mode) mode = Modes.STD
      this.requestHandler.http('/get_user', {k: this.apiKey, u: username, m: mode, eventDays}).then((resp: AxiosResponse) => {
        resolve(resp)
      }).catch((err: any) => reject(err))
    })
  }

}

export { Modes } from './structures/enums/Modes'