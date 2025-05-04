"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";
import BootstrapTooltip from "@/components/styles/TooltipStyles";
import BarsIcon from "@/icons/components/header/bars.svg";
import Button from "@/components/button/Button";
import LinkedButton from "@/components/button/LinkedButton";
import Badge from "@/components/inlineBadge/Badge";
import headerVariants from "./variant";
import { fetchPlayersCounter } from "@/services/PlayersService";
import Color from "@/components/styles/colors.module.scss";
import settings from "@/consts/settings";

export const Header = () => {
  const isMobile = isMobileDevice();
  const isDevToolsEnable = Boolean(settings.find(s => s.option === "devTools")?.value);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [activePage, setActivePage] = useState("main");
  const [isBadgeLoading, setIsBadgeLoading] = useState(true);
  const [online, setOnline] = useState(NaN);
  const router = useRouter();
  const windowRef = useRef<HTMLDivElement | null>(null);

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
    const currentPath = window.location.pathname.split("/")[1] || "main";
    setActivePage(Elements.some(el => el.id === currentPath) ? currentPath : "main");
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(prev => !prev);
    document.body.style.overflow = isMobileMenuOpened ? "hidden" : "";
  };

  const handleNavigation = (page: string) => {
    router.push(`/${page}`);
    setActivePage(page || "main");
    if (isMobileMenuOpened) setIsMobileMenuOpened(false);
  };

  const getPlayers = async () => {
    const response = await fetchPlayersCounter();
    if (response) {
      setOnline(response);
      setIsBadgeLoading(false);
    } else {
      console.error("API URL is not defined.");
    }
  };

  useEffect(() => {
    getPlayers();
    const interval = setInterval(getPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeColor = () => {
    if (online <= 20) return "danger";
    if (online <= 50) return "warning";
    return "blue";
  };

  const renderMenuItems = () => (
    Elements.map(({ id, link, icon: Icon, text, tooltipText, isDisabled, isNew, style }) => (
      <motion.li key={id}
        className={activePage === id ? styles.active : ""}>
        {isDisabled ? (
          <BootstrapTooltip title={tooltipText}>
            <span className={styles.disabled_element}
              style={style}>
              <Icon/> {text}
              {isNew && <Badge type="danger"
                content="new"/>}
            </span>
          </BootstrapTooltip>
        ) : (
          <LinkedButton
            href={link}
            onClick={() => handleNavigation(id)}
            style={style}
            type="Outlined"
            radius="small"
            classname={styles.linkElement}
            ripple={false}
            icon={Icon}
            ariaLabel={text}
          >
            <span>
              {text}
              {isNew && <Badge type="danger"
                content="new"/>}
              {id === "players" && (
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
  );

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
