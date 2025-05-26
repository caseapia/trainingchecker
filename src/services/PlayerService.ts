"use server"
import UserData, { AdditionalUserData } from "@/models/Player";
import { chronoApiClient, trainingApiClient } from "@/api/axios";

const Verifications: { [key: number]: string } = {
  1: "Ютубер",
  2: "Автор сообщества (создатель модов)",
  3: "Разработчик",
  4: "Администратор в отставке",
  5: "Спонсор",
  6: "Создатель миров",
  7: "🤨"
}
const ModerRanks: { [key: number]: string } = {
  1: "Младший модератор",
  2: "Модератор",
  3: "Старший модератор",
}

export async function getPlayer(nickname: string | null): Promise<UserData> {
  const response = await trainingApiClient.get(`/user/${nickname}`);

  return response.data.data;
}

export async function getAdditionalInfo(nickname: string | null): Promise<AdditionalUserData> {
  const response = await chronoApiClient.get(`/user?nickname=${nickname}`);
  const data = response.data;

  return {
    premium: data.premium,
    bonus_points: data.bonus_points,
    social_credits: data.social_credits,
    cop_chase_rating: data.cop_chase_rating,
    achievement: data.achievement,
    prefix: data.prefix,
    descriptions: data.descriptions,
    updated_at: data.updated_at,
  };
}

export function getVerify(verify: number): string {
  return Verifications[verify] || "Нет";
}

export function getModer(moder: number): string {
  if (moder >= 998) {
    return "Администратор";
  } else {
    return ModerRanks[moder] || "Игрок";
  }
}