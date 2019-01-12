import variables from './variables'

export class Beatmap {
  public id: string;
  public beatmapSetID: string;
  public status: string;
  public mode: string;
  public tags: string;
  public source: string;
  public hash: string;
  public title: string;
  public version: string;
  public approvedDate: string;
  public lastUpdate: string;
  public artist: string;
  public language: string;
  public genre: string;
  public bpm: string;
  public maxCombo: string;
  public length: string;
  public playCount: string;
  public passCount: string;
  public totalFavorites: string;
  public difficulty: object;
  public creator: object;

  constructor(beatmapData: any) {
    this.id = beatmapData.beatmap_id
    this.beatmapSetID = beatmapData.beatmapset_id
    this.status = variables.BeatmapTypes[beatmapData.approved]
    this.source = beatmapData.source
    this.mode = variables.Modes[beatmapData.mode]
    this.tags = beatmapData.tags
    this.hash = beatmapData.file_md5
    this.title = beatmapData.title
    this.version = beatmapData.version
    this.approvedDate = beatmapData.approved_date
    this.lastUpdate = beatmapData.last_update
    this.artist = beatmapData.artist
    this.language = variables.BeatmapLanguages[beatmapData.language_id]
    this.genre = variables.BeatmapGenres[beatmapData.genre_id]
    this.bpm = beatmapData.bpm
    this.maxCombo = beatmapData.max_combo
    this.length = beatmapData.total_length
    this.playCount = beatmapData.playcount
    this.passCount = beatmapData.passcount
    this.totalFavorites = beatmapData.favourite_count
    this.difficulty = {
      rating: beatmapData.difficultyrating,
      circleSize: beatmapData.diff_size,
      approachRate: beatmapData.diff_approach,
      overallDifficulty: beatmapData.diff_overall,
      drain: beatmapData.diff_drain
    }
    this.creator = {
      id: beatmapData.creator_id,
      username: beatmapData.creator
    }
  }

}