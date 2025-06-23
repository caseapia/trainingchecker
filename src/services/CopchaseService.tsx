"use server"
import { chronoApiClient } from "@/api/axios";
import Copchase, { Lobbies } from "@/models/Copchase";
import styles from "@/app/copchase/page.module.scss";
import { useTranslation } from "react-i18next";

export async function fetchCopchaseLobbies(): Promise<Copchase> {
  const response = await chronoApiClient.get("/copchase");

  return response.data;
}

export async function getStatus(chData: Lobbies[], id: number) {
  const data = chData.find((ch) => ch.number === id);
  const [tCopchase] = useTranslation("copchase");
  if (!data) return null;

  switch (data.status.trim()) {
    case "Подбор":
      return <span className={styles.status__recruitment}>{tCopchase("statuses.waiting")}</span>;
    case "В игре":
      return <span className={styles.status__active}>{tCopchase("statuses.inProgress")}</span>;
    case "":
    default:
      return <span className={styles.status__waiting}>{tCopchase("statuses.waitingForPlayers")}</span>;
  }
}