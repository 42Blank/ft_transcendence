import { UserInfoType } from 'types/user';

export interface AchievementType {
  id: number;
  name: string;
  description: string;
  image: string;
  winCount?: number;
  loseCount?: number;
  winStreak?: number;
  loseStreak?: number;
  friendCount?: number;
}

export interface MatchHistoryType {
  id: number;
  winner: UserInfoType;
  loser: UserInfoType;
  createdAt: string; // TODO: replace to Date type ?
}
