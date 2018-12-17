import { Mods } from './enums/Mods'
import { Modes } from './enums/Modes';
export class Score {

  score: String
  rank: String
  pp: String
  perfect: Boolean
  date: String
  rawMods: any
  mods: any
  combo: String
  counts: Object

  constructor(scoreData: any) {
    this.score = scoreData.score
    this.rank = scoreData.rank
    this.pp = scoreData.pp
    this.perfect = scoreData === '1'
    this.date = scoreData.date
    this.rawMods = scoreData.enabled_mods
    this.mods = this.enabledMods
    this.combo = scoreData.maxcombo
    this.counts = {
      '300': scoreData.count300,
      '100': scoreData.count100,
      '50': scoreData.count50,
      katu: scoreData.countkatu,
      geki: scoreData.countgeki,
      misses: scoreData.countmiss
    }
  }
  
	get enabledMods() {
		var mods = [];
		for (let mod in Mods) {
			if (parseInt(this.rawMods) == Mods[mod])
				mods.push(mod);
    }
		return mods;
	}
}