"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import UserData from "@/models/Player";
import { useTransformTextColor } from "@/utils/helpers/transformToColored";
import { toast } from "@/utils/toast";
import { formatToMinutes } from "@/utils/helpers/formatToMinutes";
import { getDaySuffix, getMinuteSuffix } from "@/utils/helpers/getSuffix";
import { getPlayer, getVerify, getModer } from "@/services/PlayerService";
import Difference from "@/utils/helpers/difference";

import styles from "./PlayerInfo.module.scss";
import Color from "@/components/Styles/colors.module.scss";
import Chip from "@/components/Chip/Chip";
import Button from "@/components/Buttons/Button";
import { Modal } from "@/components/Modal/Modal";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/Table/Table";
import { BadgeRenderer } from "@/components/BadgeRenderer/BadgeRenderer";
import PlayerLoader from "@/modules/Loaders/PlayerLoader";

import RefreshIcon from "@/icons/page-player/refresh.svg";
import HammerIcon from "@/icons/hammer.svg";
import CheckIcon from "@/icons/checkCircle.svg";
import CopyIcon from "@/icons/copy.svg";

const PlayerInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  const [playerData, setPlayerData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const transformedVerificationText = useTransformTextColor;

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
        router.push("../");
      } else {
        toast.error("Ошибка при загрузке данных. Проверьте консоль для подробностей.", { lifeTime: 10000 });
      }
    } finally {
      setIsLoading(false);
    }
  }, [nickname, router]);

  useEffect(() => {
    if (!nickname) {
      toast.error("Ник игрока не указан. Возвращаем на главную.", { lifeTime: 5000 });
      router.push("../");
      return;
    }
    fetchPlayerData();
  }, [nickname, fetchPlayerData, router]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchPlayerData();
    toast.success(`Информация об игроке ${nickname} обновлена`, { lifeTime: 5000 });
    setTimeout(() => setIsRefreshing(false), 5000);
  };

  const copyPunishments = async () => {
    if (!playerData?.warn.length) {
      toast.error(`У игрока ${playerData?.login} нет наказаний.`);
      return;
    }

    const punishmentsText = playerData.warn
      .map(warn => `${warn.admin} // ${warn.reason} // ${warn.bantime}`)
      .join(";\n");

    try {
      await navigator.clipboard.writeText(
        `Список наказаний ${playerData.login} (${playerData.id})\n\n${punishmentsText}\n\nВсего наказаний: ${playerData.warn.length}`
      );
      toast.success(`Наказания игрока ${playerData.login} скопированы в буфер обмена`, { isByModal: true });
    } catch (error) {
      console.error(error);
      toast.error("Не удалось скопировать в буфер обмена.");
    }
  };

  if (!playerData) {
    return <PlayerLoader/>;
  }

  const { id, login, moder, verify, verifyText, mute, regdate, lastlogin, online, playerid, warn } = playerData;

  return (
    <>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Ник:</strong> {login}</p>
        <strong>Должность:</strong> <Chip label={getModer(moder)}/>
        <p><strong>Верификация:</strong> {`${getVerify(verify)} (ID: ${verify})`}</p>
        {verify > 0 && (
          <p><strong>Текст верификации:</strong> {transformedVerificationText(verifyText)}</p>
        )}
        <p><strong>Время мута:</strong> {mute
          ? `${formatToMinutes(mute)} ${getMinuteSuffix(formatToMinutes(mute))}`
          : <span className={Color.colorGreen}>Нет</span>}
        </p>
        <p><strong>Дата
          регистрации:</strong> {regdate === "1970-01-01 03:00:00" ? "Зарегистрирован до 2018 года" : regdate}</p>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Список наказаний ${login} (${id})`}
        firstButtonContent="Скопировать"
        firstButtonIcon={CopyIcon}
        firstButtonAction={copyPunishments}
        secondButtonContent="Закрыть"
        secondButtonIcon={CheckIcon}
        secondButtonAction={() => setIsModalOpen(false)}
      >
        {warn.length > 0 ? (
          <Table width={100}>
            <Thead>
              <Tr>
                <Th>Администратор</Th>
                <Th>Причина</Th>
                <Th>Дата</Th>
              </Tr>
            </Thead>
            <TBody>
              {warn.map((punish, idx) => (
                <Tr key={idx}>
                  <Td>
                    <Link
                      href={`?nickname=${punish.admin}`}
                      onClick={() => setIsModalOpen(false)}
                    >
                      {punish.admin}
                    </Link>
                  </Td>
                  <Td>{punish.reason}</Td>
                  <Td>{new Date(punish.bantime).toLocaleString()}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        ) : (
          <p className={`${Color.colorDanger} ${styles.noPunish}`}>У игрока нет наказаний</p>
        )}
      </Modal>
    </>
  );
};

export default PlayerInfo;
