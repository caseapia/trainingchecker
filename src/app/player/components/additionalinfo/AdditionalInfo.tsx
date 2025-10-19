"use client";
import React, { FC, useState } from "react";
import Types from "./types";
import Button from "@/components/button/Button";
import EyeIcon from "@/icons/page-player/eye.svg";
import { Modal } from "@/components/modal/Modal";
import styles from "./AdditionalInfo.module.scss";
import { information } from "@/app/player/components/additionalinfo/information";
import { useTranslation } from "react-i18next";

const AdditionalInfo: FC<Types> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [tAdditional] = useTranslation("additionalinfo");
  const [tCommon] = useTranslation("common")

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        icon={EyeIcon}
        disabled={isModalOpen}
      >
        {tAdditional("title")}
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          classNameBody={styles.body}
          title={`${tAdditional("title")} ${data.login}`}
        >
          {information(data, tCommon)
            .filter(item => String(item.key).trim() !== "")
            .map((item) => (
              <div
                key={item.labelKey}
                className={styles.row}
              >
                <p className={styles.label}>{tAdditional(item.labelKey)}</p>
                <p className={styles.content}>{item.key}</p>
              </div>
            ))}
        </Modal>
      )}
    </>
  );
};

export default AdditionalInfo;