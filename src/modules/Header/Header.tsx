"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/constants/headerElements";
import BootstrapTooltip from "@/components/styles/TooltipStyles";
import BarsIcon from "@/icons/components/header/bars.svg";
import Button from "@/components/button/Button";
import LinkedButton from "@/components/button/LinkedButton";
import Badge from "@/components/inlineBadge/Badge";
import headerVariants from "./variant";
import Color from "@/components/styles/colors.module.scss";
import { useTranslation } from "react-i18next";
import { fetchPlayersCounter } from "@/services/PlayersService";

export const Header = () => {
  const isMobile = useIsMobileDevice();
  const isDevToolsEnable = process.env["NODE_ENV"] === "development";
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [activePage, setActivePage] = useState("main");
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [online, setOnline] = useState(NaN);
  const router = useRouter();
  const windowRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation("nav");

  // Parameters
  const PLAYER_COUNT_DANGER_THRESHOLD = 10;
  const PLAYER_COUNT_WARNING_THRESHOLD = 30;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpened(false);
      }
    };

    if (isMobileMenuOpened) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isMobileMenuOpened]);

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    const pageId = currentPath || "main";
    setActivePage(Elements.some(el => el.id === pageId) ? pageId : "main")
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(prev => !prev);
  };

  const handleNavigation = (page: string) => {
    router.push(`/${page}`);
    setActivePage(page || "main");
    if (isMobileMenuOpened) setIsMobileMenuOpened(false);
  };

  const getPlayers = async () => {
    setIsBadgeLoading(true);
    try {
      const response = await fetchPlayersCounter();
      if (response !== undefined && response !== null) {
        setOnline(response);
      } else {
        console.warn("fetchPlayersCounter вернул undefined или null. Проверьте API.");
        setOnline(NaN);
      }
    } catch (error) {
      console.error("Ошибка при получении счетчика игроков:", error);
      setOnline(NaN);
    } finally {
      setIsBadgeLoading(false);
    }
  };

  useEffect(() => {
    getPlayers();
    const interval = setInterval(getPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeColor = () => {
    if (online <= PLAYER_COUNT_DANGER_THRESHOLD) return "danger";
    if (online <= PLAYER_COUNT_WARNING_THRESHOLD) return "warning";
    return "blue";
  };

  const renderMenuItems = useCallback(() => (
    Elements.map((el) => (
      <motion.li
        key={el.id}
        className={activePage === el.id ? styles.active : ""}
      >
        {el.isDisabled ? (
          <BootstrapTooltip title={el.tooltipText}>
          <span className={styles.disabled_element}
            style={el.style}>
            <el.icon/>
            {t(el.textKey)}
            {el.isNew && <Badge type="danger"
              content="new"/>}
          </span>
          </BootstrapTooltip>
        ) : (
          <LinkedButton
            href={el.link}
            onClick={() => handleNavigation(el.id)}
            style={el.style}
            type="Outlined"
            radius="small"
            classname={styles.linkElement}
            ripple={false}
            icon={el.icon}
            ariaLabel={t(el.textKey)}
          >
          <span>
            {t(el.textKey)}
            {el.isNew && <Badge type="danger"
              content="new"/>}
            {el.id === "players" && (
              <Badge
                type={getBadgeColor()}
                handler={online}
                isLoading={isBadgeLoading}
              />
            )}
          </span>
          </LinkedButton>
        )}
      </motion.li>
    ))
  ), [activePage, online, isBadgeLoading, t]);

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpened && (
          <motion.div
            className={styles.mobileMenu}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={windowRef}
            key="mobileMenu"
          >
            <section className={styles.mobileMenu__title}>
              <h1 translate="no">
                TRAINING&nbsp;<span className={styles.redspan}>CHECKER</span>
              </h1>
            </section>
            <section className={styles.mobileMenu__items}>
              {renderMenuItems()}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`${styles.header} ${!isMobile ? styles.pc : ""}`}>
        {isMobile ? (
          <Button
            type="Outlined"
            action="button"
            icon={BarsIcon}
            onClick={toggleMobileMenu}
            style={{ width: "fit-content" }}
          />
        ) : (
          <>
            <h1 translate="no">
              TRAINING <span className={Color.colorRed}>CHECKER</span>
              {isDevToolsEnable && (
                <Badge type="danger"
                  content="Dev"
                  size="medium"/>
              )}
            </h1>
            <ul className={styles.list}>{renderMenuItems()}</ul>
          </>
        )}
      </header>
    </>
  );
};
