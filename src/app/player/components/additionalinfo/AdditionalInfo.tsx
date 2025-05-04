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
import textFormatter from "@/utils/helpers/textFormatter";
import formatUnixDate from "@/utils/helpers/formatUnixDate";

const AdditionalInfo: FC<Types> = ({ nickname }) => {
  const [info, setInfo] = useState<AdditionalUserData | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchAdditionalInfo = async () => {
    setLoading(true);
    try {
      const response = await getAdditionalInfo(nickname);

      setInfo(response);
      setModalOpen(true);

      setLoading(false);
    } catch (error: any) {
      console.error(error);

      if (error?.response?.status !== 200) {
        toast.error("Произошла ошибка при получении дополнительной информации, обратитесь в консоль для получения" +
          " информации об ошибке", { lifeTime: 6000 })
      }

      setLoading(false);
    }
  }


  return (
    <>
      <Button
        type="Secondary"
        onClick={fetchAdditionalInfo}
        icon={EyeIcon}
        isLoading={isLoading}
        disabled={isModalOpen}
      >
        Открыть
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          classNameBody={styles.body}
          title={`Дополнительная информация ${nickname}`}
        >
          <section className={styles.labels}>
            {info?.achievement && <p>Прикрепленное достижение</p>}
            {info?.bonus_points && <p>Бонусные поинты</p>}
            {info?.cop_chase_rating && <p>Рейтинг Copchase</p>}
            {/*{info?.descriptions && <p>Подписи</p>}*/}
            {info?.prefix && <p>Префикс</p>}
            {info?.social_credits && <p>Социальный кредит</p>}
          </section>
          <section className={styles.content}>
            {info?.achievement && <p>{textFormatter(String(info?.achievement))}</p>}
            {info?.bonus_points && <p>{info?.bonus_points}</p>}
            {info?.cop_chase_rating && <p>{info?.cop_chase_rating}</p>}
            {/*{info?.descriptions && <p>{info?.descriptions}</p>}*/}
            {info?.prefix && <p>{textFormatter(info?.prefix)}</p>}
            {info?.social_credits && <p>{info?.social_credits}</p>}
            <p>Последнее обновление было: {formatUnixDate(Number(info?.updated_at))}</p>
          </section>
        </Modal>
      )}
    </>
  );
};

export default AdditionalInfo;