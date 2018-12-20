import { MultiplayerGame } from './MultiplayerGame'
export class Match {

  match: Object
  games: Array<Object>
  constructor(matchData: any) {
    this.match = {
      id: matchData.match.match_id,
      name: matchData.match.name,
      start: matchData.match.start_time,
      end: matchData.match.end_time || null,
    }
    this.games = matchData.games.map((g: any) => new MultiplayerGame(g))
  }
}