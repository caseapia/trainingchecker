"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import UserData from "@/models/Player";
import { toast } from "@/utils/toast";
import { formatToMinutes } from "@/utils/helpers/formatToMinutes";
import { getDaySuffix, getMinuteSuffix } from "@/utils/helpers/getSuffix";
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
        toast.error(`Игрок с ником ${nickname} не найден. Перенаправляем на главную страницу.`, { lifeTime: 5000 });
        router.push("/");
      } else {
        if (nickname !== ".") {
          toast.error("Ошибка при загрузке данных. Проверьте консоль для подробностей.", { lifeTime: 10000 });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [nickname, router]);

  useEffect(() => {
    if (nickname === ".") {
      toast.error("Вы не можете совершить поиск по данному никнейму", { lifeTime: 6000 })
      router.push("/");
      return;
    } else if (!nickname) {
      toast.error("Ник игрока не указан. Возвращаем на главную.", { lifeTime: 6000 });
      router.push("/");
      return;
    } else {
      fetchPlayerData();
    }
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchPlayerData();
    toast.success(`Информация об игроке ${nickname} обновлена`, { lifeTime: 5000 });
    setTimeout(() => setIsRefreshing(false), 5000);
  };

  if (!playerData) {
    return <Loader type="Player"/>;
  }

  const {
    id = "",
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

  return (
    <>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Ник:</strong> {login}</p>
        <strong>Должность:</strong> <Chip label={getModer(moder)}/>
        <p><strong>Верификация:</strong> {`${getVerify(verify)} (ID: ${verify})`}</p>
        {verify > 0 && (
          <p><strong>Текст верификации:</strong> {textFormatter(verifyText)}</p>
        )}
        <p><strong>Время мута:</strong>{" "}
          {mute
            ? `${formatToMinutes(mute)} ${getMinuteSuffix(formatToMinutes(mute))}`
            : <span className={Color.colorGreen}>Нет</span>
          }
        </p>
        <p><strong>Дата регистрации:</strong>
          {regdate === "1970-01-01 03:00:00" ? "Зарегистрирован до 2018 года" : regdate}
        </p>
        <p>
          <strong>Дата последнего входа:</strong>{" "}
          {online
            ? <span className={Color.colorGreen}>Сейчас в сети <span
              className={Color.colorDefaultText}>(ID: {playerid})</span></span>
            : (
              <>
                {new Date(lastlogin).toDateString() === new Date().toDateString()
                  ? lastlogin
                  : `${lastlogin} (${Difference(lastlogin)} ${getDaySuffix(Difference(lastlogin))} назад)`
                }
              </>
            )
          }
        </p>

        <hr className={styles.ProfileLine}/>

        <h5 className={styles.h5}>Значки</h5>
        <BadgeRenderer player={playerData}/>

        <div className={styles.ButtonGroup}>
          <Button
            type="Secondary"
            action="button"
            icon={RefreshIcon}
            onClick={refreshData}
            disabled={isRefreshing}
          >
            Обновить
          </Button>
          <Button
            type="Secondary"
            action="button"
            disabled={!warn.length}
            onClick={() => setIsModalOpen(true)}
            icon={HammerIcon}
          >
            Наказания
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <Punishment
          id={Number(id)}
          login={login}
          warns={warn}
          status={isModalOpen}
          statusAction={setIsModalOpen}/>
      )}
    </>
  );
};

export default PlayerInfo;
