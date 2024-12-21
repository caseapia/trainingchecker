"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";
import BarsIcon from '@/icons/components/header/bars.svg';

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("main");
  const router = useRouter();
  const [online, setOnline] = useState<number>(0);

  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1] || "main";
    setActivePage(Elements.some((el) => el.id === currentPath) ? currentPath : "main");
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const handleNavigation = (page: string) => {
    router.push(`/${page}`);
    setActivePage(page || "main");
    if (isMobileMenuOpened) {
      setIsMobileMenuOpened(false);
    }
  };

  useEffect(() => {
    const getPlayers = async () => {
      const url = process.env.NEXT_PUBLIC_API_ONLINE_URL;

      if (!url) {
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setOnline(jsonResponse.data.length);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    getPlayers();
  }, []);

  const renderMenuItems = (isMobileView = false) => (
    Elements.map(({ id, link, icon, text, tooltipText, isDisabled, isNew, style }) => (
      <motion.li 
        key={id} 
        className={activePage === id ? styles.active : ""}
        whileTap={{ scale: '.93' }}
      >
        {isDisabled ? (
          <span className={styles.disabled_element} style={style}>
            {icon} {text}
            {isNew && <span className={`${styles.badge} ${styles.new}`}>new</span>}
          </span>
        ) : (
          <Link
            href={link}
            onClick={() => handleNavigation(id)}
            style={style}
          >
            <span>
              {icon} {text}
              {isNew && <span className={`${styles.badge} ${styles.new}`}>new</span>}
              {id === 'players' && <span className={styles.badge}>{online}</span>}
            </span>
          </Link>
        )}
      </motion.li>
    ))
  );

  return (
    <header className={isMobile ? `${styles.header} ${styles.mobile__header}` : styles.header}>
      <h1>
        TRAINING <span className={styles.redspan}>CHECKER</span>
      </h1>
      {isMobile ? (
        <>
          <button className={styles.mobile__button} onClick={toggleMobileMenu}>
            <BarsIcon />
          </button>
          {isMobileMenuOpened && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={styles.mobile__menu}
            >
              <ul className={styles.mobile__menu__list}>{renderMenuItems(true)}</ul>
            </motion.div>
          )}
        </>
      ) : (
        <ul className={styles.list}>{renderMenuItems()}</ul>
      )}
    </header>
  );
};