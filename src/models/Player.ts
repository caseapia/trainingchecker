interface WarnEntry {
  reason: string;
  admin: string;
  bantime: string; // ISO 8601
}

interface UserData {
  id: number;
  login: string;
  access: number;
  moder: number;
  verify: number;
  verifyText: string;
  mute: number;
  online: number;
  playerid: number;
  regdate: string; // ISO 8601
  lastlogin: string; // ISO 8601
  warn: WarnEntry[];
}

interface AdditionalUserData {
  premium: number;
  bonus_points: number;
  social_credits: number;
  cop_chase_rating: number;
  achievement: string;
  prefix: string;
  descriptions: string[];
  updated_at: number;
}

export default UserData;
export type { AdditionalUserData };