
export class User {
  userID: String
  username: String
  joinDate: String
  playCount: String
  level: String
  playTime: String
  country: String
  accuracy: String
  counts: Object
  ranks: Object
  performance: Object
  scores: Object
  events: Array<Object>

  constructor(userResponse: any) {
    this.userID = userResponse.user_id
    this.username = userResponse.username
    this.joinDate = userResponse.join_date
    this.playCount = userResponse.playcount
    this.level = userResponse.level
    this.playTime = userResponse.total_seconds_played
    this.country = userResponse.country
    this.accuracy = userResponse.accuracy
    this.counts = {
      '300': userResponse.count300,
      '100': userResponse.count100,
      '50': userResponse.count50
    }
    this.ranks = {
      'SSH': userResponse.count_rank_ssh,
      'SH': userResponse.count_rank_sh,
      'SS': userResponse.count_rank_ss,
      'S': userResponse.count_rank_s,
      'A': userResponse.count_rank_a
    }
    this.performance = {
      rank: userResponse.pp_rank,
      raw: userResponse.pp_raw,
      country: userResponse.pp_country_rank
    }
    this.scores = {
      ranked: userResponse.ranked_score,
      total: userResponse.total_score
    }
    this.events = userResponse.events
  }
}