import UserData, { AdditionalUserData } from "@/models/Player";
import { trainingApiClient } from "@/api/axios";
import i18n from "i18next";

const verifyKeyMap = {
  1: "youtuber",
  2: "community_author",
  3: "developer",
  4: "retired_admin",
  5: "sponsor",
  6: "world_creator",
  7: "unknown"
} as const;

export type VerifyRole = typeof verifyKeyMap[keyof typeof verifyKeyMap];

const moderKeyMap = {
  0: "player",
  1: "junior",
  2: "regular",
  3: "senior",
  997: "bot"
};

export type ModerRole = typeof moderKeyMap[keyof typeof moderKeyMap];

export async function getPlayer(nickname: string | null): Promise<UserData> {
  const response = await trainingApiClient.get(`/user/${nickname}`);

  return response.data.data;
}

export function getVerify(verify: number): string {
  const role = verifyKeyMap[verify as keyof typeof verifyKeyMap];

  return role ? i18n.t(`verify.${role}`, { ns: "playerinfo" }) : i18n.t("no", { ns: "common" });
}

export function getModer(moder: number): string {
  const role = moderKeyMap[moder as keyof typeof moderKeyMap];

  if (moder >= 998) {
    return i18n.t("moderator.admin", { ns: "playerinfo" });
  } else {
    return i18n.t(`moderator.${role}`, { ns: "playerinfo" });
  }
}