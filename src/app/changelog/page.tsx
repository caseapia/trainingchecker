"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { changeLog } from "@/consts/changelog";
import Button from "@/components/Buttons/Button";
import UserIcon from '@/icons/user.svg';
import ClockIcon from '@/icons/changelog/clock.svg';
import Link from "next/link";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";
import Loader from "@/modules/Loader/Loader";

const Changelog = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (changeLog) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  })

  return isLoaded ? (
    <PageWrapper title="Список изменений" classname={styles.NewWrapper}>
      <div className={styles.blockWrapper}>
        {changeLog.length > 0 ? (
          changeLog.map((log, index) => (
            <div
              className={styles.log__item}
              key={index}
              style={{ background: `linear-gradient(160deg, ${log.color} 0%, #0000008c 100%)` }}
            >
              <div className={styles.log__item__icon_container}>
                {log.icon}
              </div>
              <div className={styles.log__info_container}>
                <div className={styles.log__info_container__text}>
                  <BootstrapTooltip 
                    title={log.title}
                    placement="top"
                    enterDelay={0}
                  >
                    <h3 className={styles.log__info_container__text__title}>{log.title}</h3>
                  </BootstrapTooltip>
                  <section className={styles.log__info_container__text__data}>
                    <BootstrapTooltip 
                      title="Дата" 
                      placement="top" 
                      enterDelay={0}
                    >
                      <span className={styles.log__info_container__text__data__date}>
                        <ClockIcon /> {log.date}
                      </span>
                    </BootstrapTooltip>
                    &nbsp;
                    <BootstrapTooltip 
                      title="Автор"
                      placement="top" 
                      enterDelay={0}
                    >
                      <span className={styles.log__info_container__text__data__author}>
                        <UserIcon /> {log.author}
                      </span>
                    </BootstrapTooltip>
                  </section>
                </div>
                <div className={styles.log__info_container__buttonContainer}>
                  <Link href={`/changelog/${log.route}`}>
                    <Button 
                      type="Transparent" 
                      text="Читать" 
                      action="button" 
                      style={{ borderColor: `${log.color}` }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.log__empty}>
            <p>Список изменений пуст</p>
          </div>
        )}
      </div>
    </PageWrapper>
  ) : (
    <PageWrapper>
      <Loader />
    </PageWrapper>
  );
};

export default Changelog;
