import { TeamRanking } from './teamRanking';

export interface Ranking {
  sourceUrl: string;
  sourceName: string;
  teams: Array<TeamRanking>;
  sourceLogoUrl: string;
}
