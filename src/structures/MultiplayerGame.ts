import variables from './variables'
import { Modes } from './enums/Modes'
import { Mods } from './enums/Mods'
export class MultiplayerGame {

  id: String
  start: String
  end: String
  beatmapID: String
  mode: String
  matchType: String
  scoringType: String
  teamType: String
  mods: Array<String>
  constructor(gameData: any) {
    this.id = gameData.game_id,
    this.start = gameData.start_time,
    this.end = gameData.end_time,
    this.beatmapID = gameData.beatmap_id,
    this.mode = Modes[gameData.play_mode],
    this.matchType = gameData.match_type, // Not sure what this is
    this.scoringType = variables.MatchType[gameData.scoring_type],
    this.teamType = variables.TeamType[gameData.team_type],
    this.mods = this.enabledMods(gameData.mods)

  }
  enabledMods(rawMods: any) {
		var mods = [];
		for (let mod in Mods) {
			if (parseInt(rawMods) == Mods[mod])
				mods.push(mod);
    }
		return mods;
	}
}