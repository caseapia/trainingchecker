"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import UserData from "@/models/Player";
import { toast } from "@/utils/toast";
import { getDaySuffix } from "@/utils/helpers/getSuffix";
import { getModer, getPlayer, getVerify } from "@/services/PlayerService";
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
import { useTranslation } from "react-i18next";

const PlayerInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const [tPlayerInfo] = useTranslation("playerinfo");
  const [tCommon] = useTranslation("common");
  const [tErrors] = useTranslation("errors");

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
        error = tErrors("error_nickname", { nickname: nickname })
        await metric.send(`${error}`, "Error")
        toast.error(error, { lifeTime: 5000 });
        router.push("/");
      } else if (nickname !== ".") {
        error = tErrors("error_dataLoading")
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
      toast.success(tPlayerInfo("success.dataUpdated", { nickname: nickname }), { lifeTime: 5000 });
      await metric.send("Информация об игроке обновлена", "Success")
      setTimeout(() => setIsRefreshing(false), 5000);
    } catch (error: any) {
      await metric.send(`"Ошибка при обновлении информации о игроке", ${error}`, "Error")
      toast.error(tErrors("error_unexpected", { nickname: nickname }), { lifeTime: 5000 });
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
  } = playerData;

  const information: Information[] = [
    { title: tPlayerInfo("info.id"), key: id },
    {
      title: tPlayerInfo("info.nickname"),
      key: <>{login} <BadgeRenderer player={playerData}/></>,
      className: styles.nickname
    },
    { title: tPlayerInfo("info.verify"), key: `${getVerify(verify)} (ID: ${verify})` },
    { title: tPlayerInfo("info.status"), key: <Chip label={getModer(moder)}/> },
    { title: tPlayerInfo("info.verifyText"), key: verifyText ? textFormatter(verifyText) : tCommon("no") },
    {
      title: tPlayerInfo("info.muteTime"),
      key: `${mute ? mute : tCommon("no")}`,
      className: mute ? Color.colorRed : Color.colorGreen
    },
    {
      title: tPlayerInfo("info.registerDate"),
      key: regdate === "1970-01-01 03:00:00" ? tPlayerInfo("info.registerDateBefore2018") : regdate
    },
    {
      title: tPlayerInfo("info.lastConnect"),
      key: `${online ? tPlayerInfo("info.lastConnectNow", { playerid: playerid }) : `${lastlogin} (${Difference(lastlogin)} ${getDaySuffix(Difference(lastlogin))} ${tPlayerInfo("info.timeAgo")})`}`,
      className: online ? Color.colorGreen : ""
    }
  ]

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{tPlayerInfo("title")}</h2>
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
            {tPlayerInfo("button.refresh")}
          </Button>
          <Button
            type="Danger"
            disabled={!warn.length}
            onClick={() => setIsModalOpen(true)}
            icon={HammerIcon}
          >
            {tPlayerInfo("button.punishments")}
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
