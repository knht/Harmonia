
export class Harmonia {
  /**
   * Create an instance of harmonia
   * @param {string} apiKey - The api key for accessing the osu api
   */
  apiKey: String
  constructor(key: String) {
    this.apiKey = key
  }
  
  /**
   * Fetches user data
   * @param {string} username - The username you want the data for
   * @param {string} mode - Specify the mode you want to use (All modes are returned by default)
   * @param {number} [eventDays=1] - How many days you want to search for the last event. Default is 1.
   */
  getUser() {
    return
  }

}