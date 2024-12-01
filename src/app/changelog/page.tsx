"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Lottie from "lottie-react";
import Preloader from "@/public/assets/lotties/Preloader.json";
import { isMobileDevice } from "@/shared/hooks/isMobileDevice";
import { useRouter } from "next/navigation";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { changeLog } from "@/consts/changelog";
import Button from "@/components/Buttons/Button";
import { FaClock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";

const Changelog = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const isMobile = isMobileDevice();
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      setIsLoaded(false);
      router.push("/");
    }
  }, [isMobile, router]);

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
                <p>{log.icon}</p>
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
                        <FaClock /> {log.date}
                      </span>
                    </BootstrapTooltip>
                    &nbsp;
                    <BootstrapTooltip 
                      title="Автор"
                      placement="top" 
                      enterDelay={0}
                    >
                      <span className={styles.log__info_container__text__data__author}>
                        <FaUser /> {log.author}
                      </span>
                    </BootstrapTooltip>
                  </section>
                </div>
                <div className={styles.log__info_container__buttonContainer}>
                  <Link href={`/changelog/${log.route}`}>
                    <Button btnType="Transparent" text="Читать" type="button" style={{ borderColor: `${log.color}` }} />
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
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  );
};

export default Changelog;
