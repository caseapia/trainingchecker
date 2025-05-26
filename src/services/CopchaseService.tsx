"use server"
import { chronoApiClient } from "@/api/axios";
import { CopchaseLobbies } from "@/models/Copchase";
import styles from "@/app/copchase/page.module.scss";

export async function fetchCopchaseLobbies(): Promise<CopchaseLobbies> {
  const response = await chronoApiClient.get("/copchase");

  return response.data;
}

export async function getStatus(chData: CopchaseLobbies[], id: number) {
  const data = chData.find((ch) => ch.number === id);
  if (!data) return null;

  switch (data.status.trim()) {
    case "Подбор":
      return <span className={styles.status__recruitment}>Подбор</span>;
    case "В игре":
      return <span className={styles.status__active}>В игре</span>;
    case "":
    default:
      return <span className={styles.status__waiting}>Ожидание игроков</span>;
  }
}