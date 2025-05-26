"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import UserData from "@/models/Player";
import { toast } from "@/utils/toast";
import { getDaySuffix } from "@/utils/helpers/getSuffix";
import { getPlayer, getVerify, getModer } from "@/services/PlayerService";
import Difference from "@/utils/helpers/difference";

import styles from "./PlayerInfo.module.scss";
import Color from "@/components/styles/colors.module.scss";
import Chip from "@/components/chip/Chip";
import Button from "@/components/button/Button";
import { BadgeRenderer } from "@/components/badgeRenderer/BadgeRenderer";
import Loader from "@/modules/Loaders/index";

import RefreshIcon from "@/icons/page-player/refresh.svg";
import HammerIcon from "@/icons/hammer.svg";
import textFormatter from "@/utils/helpers/textFormatter";
import Punishment from "@/app/player/components/punishments/punishment";
import AdditionalInfo from "@/app/player/components/additionalinfo/AdditionalInfo";
import { Information } from "@/app/player/components/playerinfo/types";
import { metric } from "@/utils/metric";

const PlayerInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  const [playerData, setPlayerData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchPlayerData = useCallback(async () => {
    if (!nickname) return;

    if (!isLoading) {
      setIsLoading(true);
    }

    try {
      const data = await getPlayer(nickname);
      setPlayerData(data);
    } catch (error: any) {
      console.error(error);

      if (error?.response?.status === 404) {
        error = `Игрок с ником ${nickname} не найден. Перенаправляем на главную страницу.`
        await metric.send(`${error}`, "Error")
        toast.error(error, { lifeTime: 5000 });
        router.push("/");
      } else if (nickname !== ".") {
        error = `Ошибка при загрузке данных. Проверьте консоль для подробностей.`
        await metric.send(`${error}`, "Error")
        toast.error(error, { lifeTime: 10000 });
      }
    } finally {
      setIsLoading(false);
    }
  }, [nickname, router]);

  useEffect(() => {
    (async () => {
      try {
        await fetchPlayerData();
      } catch (error: any) {
        console.error(error)
      }
    })();
  }, [fetchPlayerData]);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await fetchPlayerData();
      toast.success(`Информация об игроке ${nickname} обновлена`, { lifeTime: 5000 });
      await metric.send("Информация об игроке обновлена", "Success")
      setTimeout(() => setIsRefreshing(false), 5000);
    } catch (error: any) {
      await metric.send(`"Ошибка при обновлении информации о игроке", ${error}`, "Error")
    }
  };

  if (!playerData) {
    return <Loader type="Player"/>;
  }

  const {
    id,
    login = "",
    moder,
    verify,
    verifyText,
    mute,
    regdate,
    lastlogin,
    online,
    playerid,
    warn = [],
  } = playerData || {};

  const information: Information[] = [
    { title: "ID", key: id },
    { title: "Никнейм", key: <>{login} <BadgeRenderer player={playerData}/></>, className: styles.nickname },
    { title: "Верификация", key: `${getVerify(verify)} (ID: ${verify})` },
    { title: "Статус", key: <Chip label={getModer(moder)}/> },
    { title: "Текст верификации", key: verifyText ? textFormatter(verifyText) : "Нет" },
    { title: "Время мута", key: `${mute ? mute : "Нет"}`, className: mute ? Color.colorRed : Color.colorGreen },
    { title: "Дата регистрации", key: regdate === "1970-01-01 03:00:00" ? "Зарегистрирован до 2018 года" : regdate },
    {
      title: "Последний вход",
      key: `${online ? `Сейчас в сети (ID: ${playerid})` : `${lastlogin} (${Difference(lastlogin)} ${getDaySuffix(Difference(lastlogin))} назад)`}`,
      className: online ? Color.colorGreen : ""
    }
  ]

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Информация об игроке</h2>
      <section className={styles.information}>
        {information.map(({ title, key, className = "" }, index) => (
          <div key={index}
            className={styles.informationItem}>
            <p className={styles.informationItem__title}>{title}:</p>&nbsp;
            <p className={`${styles.informationItem__key} ${className}`}>{key}</p>
          </div>
        ))}
      </section>
      <section className={styles.buttonGroup}>
        <div className={styles.buttonGroup__pair}>
          <Button
            onClick={refreshData}
            disabled={isRefreshing}
            icon={RefreshIcon}
          >
            Обновить
          </Button>
          <Button
            type="Danger"
            disabled={!warn.length}
            onClick={() => setIsModalOpen(true)}
            icon={HammerIcon}
          >
            Наказания
          </Button>
        </div>
        <AdditionalInfo nickname={login}/>
      </section>
      <Punishment
        id={id}
        login={login}
        warns={warn}
        status={isModalOpen}
        statusAction={setIsModalOpen}
      />
    </div>
  );
};

export default PlayerInfo;
