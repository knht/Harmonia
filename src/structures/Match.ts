import { MultiplayerGame } from './MultiplayerGame'
export class Match {

  id: String
  name: String
  start: String
  end: String
  games: Array<Object>
  constructor(matchData: any) {
    this.id = matchData.match.match_id,
    this.name = matchData.match.name,
    this.start = matchData.match.start_time,
    this.end = matchData.match.end_time || null,
    this.games = matchData.games.map((g: any) => new MultiplayerGame(g))
  }
}