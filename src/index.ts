
import { Request } from './services/Request'
import { Modes } from './structures/enums/Modes'
import { BeatmapOptions } from './structures/interfaces/BeatmapOptions'
import { User } from './structures/User'
import { Beatmap } from './structures/Beatmap'

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
      if(!this.apiKey) return reject(new Error('You haven\'t set an api key'))
      if(!username) return reject(new Error('A username is required to search for a user'))
      if(!mode) mode = Modes.STD
      this.requestHandler.http('/get_user', {k: this.apiKey, u: username, m: mode, eventDays}).then((resp: any) => {
        if(!resp.length) return reject(new Error('Couldn\'t find that user'))
        resolve(new User(resp[0]))
      }).catch(reject)
    })
  }

  getBeatmaps(beatmapID: string, mode: Modes, options: BeatmapOptions) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error('You haven\'t set an api key'))
      if(!beatmapID) return reject(new Error('Please provide a beatmapid'))
      if(!mode) mode = Modes.STD
      let searchOptions = Object.assign(options, { k: this.apiKey, b: beatmapID})
      this.requestHandler.http('/get_beatmaps', searchOptions).then((resp: any) => {
        if(!resp.length) return reject(new Error("Beatmap couldn't be found."))
        resolve(resp.map((b: any) => new Beatmap(b)))
      }).catch(reject)
    })
  }

}

export { Modes } from './structures/enums/Modes'