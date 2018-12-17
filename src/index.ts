
import { Request } from './services/Request'
import { Modes } from './structures/enums/Modes'
import { BeatmapOptions } from './structures/enums/BeatmapOptions'
import { User } from './structures/User'
import { Match } from './structures/Match'
import { Beatmap } from './structures/Beatmap'
import { Score } from './structures/Score'
import { resolve } from 'path';

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

  /**
   * 
   * @param {string} beatmapID - The ID of the beatmap __**NOT**__ the beatmap setid.
   * @param {string} mode - Choose the mode you want to search with (standard by default).
   * @param {BeatmapOptions} options - (Optional) Options pertaining to the beatmap.
   * @param {string} options.user - Get beatmap data on a given user
   */
  getBeatmaps(beatmapID: string, mode: Modes, options: BeatmapOptions) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error('You haven\'t set an api key'))
      if(!beatmapID) return reject(new Error('Please provide a beatmapid'))
      if(!mode) mode = Modes.STD
      let searchOptions = Object.assign(options, { k: this.apiKey, m: mode, b: beatmapID})
      this.requestHandler.http('/get_beatmaps', searchOptions).then((resp: any) => {
        if(!resp.length) return reject(new Error("Beatmap couldn't be found."))
        resolve(resp.map((b: any) => new Beatmap(b)))
      }).catch(reject)
    })
  }

  getScores(beatmapID: string, mode: Modes, username: string='', options: any) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error('You haven\'t set an api key'))
      if(!beatmapID) return reject(new Error('Please provide a beatmapid'))
      let searchOptions = Object.assign(options, { k: this.apiKey, b: beatmapID, u: username})
      this.requestHandler.http('/get_scores', searchOptions).then((resp: any) => {
        if(!resp.length) {
          return reject(new Error("Couldn't retrieve scores."))
        }
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }

  getUserBest(username: string, mode: Modes, limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error("You haven't set an api key"))
      if(!username) return reject(new Error('A username is needed to get their recent best scores'))
      this.requestHandler.http('/get_user_best', {k: this.apiKey, u: username, m: mode, limit: limit}).then((resp: any) => {
        if(!resp.length) return reject(new Error("Couldn't get recent best"))
        if(resp.length) return resolve(resp.map((best: any) => new Score(best)))
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }

  getUserRecent(username: string, mode: Modes, limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error("You haven't set an api key"))
      if(!username) return reject(new Error('A username is needed to get their recent scores'))
      this.requestHandler.http('/get_user_recent', {k: this.apiKey, u: username, m: mode, limit: limit}).then((resp: any) => {
        if(!resp.length) return reject(new Error("Couldn't get recent scores"))
        if(resp.length) return resolve(resp.map((recent: any) => new Score(recent)))
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }

  getMatch(matchID: String) {
    return new Promise((resolve, reject) => {
      if(!this.apiKey) return reject(new Error("You haven't set an api key"))
      if(!matchID) return reject(new Error('A match id is needed to get a match'))
      this.requestHandler.http('/get_user_recent', {k: this.apiKey, mp: matchID}).then((resp: any) => {
        if(!resp.length) return reject(new Error("Couldn't get this match"))
        resolve(new Match(resp[0]))
      }).catch(reject)
    })
  }
}

export { Modes } from './structures/enums/Modes'