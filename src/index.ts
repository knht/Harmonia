
import { Request } from './services/Request'
import { Modes } from './structures/enums/Modes'
import { User } from './structures/User'
import { Match } from './structures/Match'
import { Beatmap } from './structures/Beatmap'
import { Score } from './structures/Score'

export class Harmonia {

  /**
   * @param {string} apiKey - The api key for accessing the osu api
  **/
  public apiKey: String
  private requestHandler: any
  constructor(apiKey: String) {
    this.apiKey = apiKey
    this.requestHandler = new Request()
    if(!apiKey) {
      throw new Error('An api key is needed in order to use this.')
    }
  }
  
  /**
   * Gets a users stats
   * @param {string} username - The username you want the data for
   * @param {Modes} mode - Specify the mode you want to use (Standard is returned by default)
   * @param {number} [eventDays=1] - How many days you want to search for the last event. Default is 1.
   */
  getUser(username: string, mode: Modes, eventDays: number=1) {
    return new Promise((resolve, reject) => {
      if(!username) return reject(new Error('A username is required to search for a user'))
      if(!mode) mode = Modes.STD
      this.requestHandler.http('/get_user', {k: this.apiKey, u: username, m: mode, eventDays}).then((resp: any) => {
        if(!resp.length) return reject(new Error('Couldn\'t find that user'))
        resolve(new User(resp[0]))
      }).catch(reject)
    })
  }

  /**
   * Get a beatmap by its id.
   * @param {string} beatmapID - The ID of the beatmap __**NOT**__ the beatmap set ID.
   * @param {Modes} mode - Choose the mode you want to search with (standard by default).
   */
  getBeatmapByID(beatmapID: string, mode: Modes) {
    return new Promise((resolve, reject) => {
      if(!beatmapID) return reject(new Error('A Beatmap id is needed to get a beatmap :/'))
      if(!mode) mode = Modes.STD
      this.requestHandler.http('/get_beatmaps', { k: this.apiKey, b: beatmapID, m: mode }).then((resp: any) => {
        if(!resp.length) return reject(new Error("Beatmap couldn't be found."))
        resolve(resp.map((b: any) => new Beatmap(b)))
      }).catch(reject)
    })
  }

  /**
   * Returns a users beatmaps.
   * @param {string} username - The username of the creator.
   * @param {Modes} mode - The mode of the beatmaps.
   * @param {Number=10} limit - (Optional) Amount of beatmaps to return.
   */
  getUserBeatmaps(username: string, mode: Modes, limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!username) return reject(new Error('Please provide a username to retrieve their beatmaps.'))
      if(!mode) mode = Modes.STD
      this.requestHandler.http('/get_beatmaps', { k: this.apiKey, m: mode, b: username, limit: limit}).then((resp: any) => {
        if(!resp.length) return reject([])
        resolve(resp.map((b: any) => new Beatmap(b)))
      }).catch(reject)
    })
  }

  /**
   * Gets scores for a beatmap.
   * @param {string} beatmapID - Beatmap id of the beatmap you want scores for.
   * @param {Modes} mode - Mode of the beatmap.
   * @param {string=} username - Username for a specific score.
   * @param {number=} limit - Amount of scores returned. Default is 10.
   */
  getScores(beatmapID: string, mode: Modes, username: string='', limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!beatmapID) return reject(new Error("I can't get the scores without its Beatmap ID"))
      this.requestHandler.http('/get_scores', {k: this.apiKey, b: beatmapID, m: mode, u: username, limit: limit}).then((resp: any) => {
        if(!resp.length) {
          return reject([])
        }
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }

  /**
   * Gets a users best plays.
   * @param {string} username - Username of the user.
   * @param {Modes} mode - Mode wanted.
   * @param {number=} limit - Amount of plays returned. Default is 10.
   */
  getUserBest(username: string, mode: Modes, limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!username) return reject(new Error('A username is needed to get their recent best scores'))
      this.requestHandler.http('/get_user_best', { k: this.apiKey, u: username, m: mode, limit: limit }).then((resp: any) => {
        if(!resp.length) return reject([])
        if(resp.length) return resolve(resp.map((best: any) => new Score(best)))
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }
  /**
   * Gets a users most recent plays.
   * @param {string} username - Username of the user.
   * @param {Modes} mode - Mode wanted.
   * @param {number=} limit - Amount of plays returned. Default is 10.
   */
  getUserRecent(username: string, mode: Modes, limit: Number=10) {
    return new Promise((resolve, reject) => {
      if(!username) return reject(new Error('A username is needed to get their recent scores'))
      this.requestHandler.http('/get_user_recent', { k: this.apiKey, u: username, m: mode, limit: limit }).then((resp: any) => {
        if(!resp.length) return reject([])
        if(resp.length) return resolve(resp.map((recent: any) => new Score(recent)))
        resolve(new Score(resp[0]))
      }).catch(reject)
    })
  }
  /**
   * Gets a currently on going match.
   * @param {string} matchID - The match ID of the match.
   */
  getMatch(matchID: String) {
    return new Promise((resolve, reject) => {
      if(!matchID) return reject(new Error('A match id is needed to get a match'))
      this.requestHandler.http('/get_match', {k: this.apiKey, mp: matchID}).then((resp: any) => {
        if(!resp) return reject(new Error("Couldn't get this match"))
        resolve(new Match(resp))
      }).catch(reject)
    })
  }
}

export { Modes } from './structures/enums/Modes'