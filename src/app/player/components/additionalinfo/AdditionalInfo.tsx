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
import { information } from "@/app/player/components/additionalinfo/information";

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
        onClick={fetchAdditionalInfo}
        icon={EyeIcon}
        isLoading={isLoading}
        disabled={isModalOpen}
      >
        Дополнительная информация
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          classNameBody={styles.body}
          title={`Дополнительная информация ${nickname}`}
        >
          {information(info)
            .filter(item => String(item.key).trim() !== "")
            .map((item) => (
              <div
                key={item.label}
                className={styles.row}
              >
                <p className={styles.label}>{item.label}</p>
                <p className={styles.content}>{item.key}</p>
              </div>
            ))}
        </Modal>
      )}
    </>
  );
};

export default AdditionalInfo;