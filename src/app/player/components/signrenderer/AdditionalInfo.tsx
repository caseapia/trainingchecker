"use client";
import React, { FC, useState } from "react";
import { getAdditionalInfo } from "@/services/PlayerService";
import Types from "./types";
import Button from "@/components/button/Button";
import EyeIcon from "@/icons/page-player/eye.svg";
import { AdditionalUserData } from "@/models/Player";
import { Modal } from "@/components/modal/Modal";
import { toast } from "@/utils/toast";
import styles from "./AdditionalInfo.module.scss";
import formatUnixDate from "@/utils/helpers/formatUnixDate";
import textFormatter from "@/utils/helpers/textFormatter";

const AdditionalInfo: FC<Types> = ({ nickname }) => {
  const [info, setInfo] = useState<AdditionalUserData | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const fetchAdditionalInfo = async () => {
    try {
      const response = await getAdditionalInfo(nickname);

      setInfo(response);
      console.debug(response);
      setModalOpen(true);
    } catch (error: any) {
      console.error(error);

      if (error?.response?.status !== 200) {
        toast.error("Произошла ошибка при получении дополнительной информации, обратитесь в консоль для получения" +
          " информации об ошибке", { lifeTime: 6000 })
      }
    }
  }


  return (
    <>
      <Button
        type="Secondary"
        onClick={fetchAdditionalInfo}
        icon={EyeIcon}
      >
        Открыть
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        classNameBody={styles.body}
        title={`Дополнительная информация ${nickname}`}
      >
        <section className={styles.labels}>
          <p>Прикрепленное достижение</p>
          <p>Бонусные поинты</p>
          <p>Рейтинг Copchase</p>
          {/*{info?.descriptions && <p>Подписи</p>}*/}
          {info?.prefix && <p>Префикс</p>}
          <p>Социальный кредит</p>
        </section>
        <section className={styles.content}>
          <p>{textFormatter(String(info?.achievement))}</p>
          <p>{info?.bonus_points}</p>
          <p>{info?.cop_chase_rating}</p>
          {/*{info?.descriptions && <p>{info?.descriptions}</p>}*/}
          {info?.prefix && <p>{info?.prefix}</p>}
          <p>{info?.social_credits}</p>
        </section>
      </Modal>
    </>
  );
};

export default AdditionalInfo;