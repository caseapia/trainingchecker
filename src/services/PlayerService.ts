import UserData from "@/models/Player";
import { trainingApiClient } from "@/api/axios";

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