"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";
import BarsIcon from '@/icons/components/header/bars.svg';
import Button from "@/components/Buttons/Button";

const headerVariants = {
  hidden: {
    x: -500,
    transition: { 
      duration: 0.5 
    }
  },
  visible: {
    x: 0,
    transition: { 
      duration: 0.5 
    }
  },
  exit: {
    x: -500,
    transition: { 
      duration: 0.5 
    }
  },
}

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("main");
  const router = useRouter();
  const [online, setOnline] = useState<number>(0);
  const windowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpened(false);
      };
    }

    if (isMobileMenuOpened) {
      document.addEventListener('mouseup', handleClickOutside);
    };

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [isMobileMenuOpened])

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

  const renderMenuItems = () => (
    Elements.map(({ id, link, icon, text, tooltipText, isDisabled, isNew, style }) => (
      <motion.li 
        key={id} 
        className={activePage === id ? styles.active : ""}
        draggable="false"
      >
        {isDisabled ? (
          <BootstrapTooltip title={tooltipText}>
            <span className={styles.disabled_element} style={style}>
              {icon} {text}
              {isNew && <span className={`${styles.badge} ${styles.new}`}>new</span>}
            </span>
          </BootstrapTooltip>
        ) : (
          <Link
            href={link}
            onClick={() => handleNavigation(id)}
            style={style}
            draggable="false"
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
              <h1>
                TRAINING&nbsp;<span className={styles.redspan}>CHECKER</span>
              </h1>
            </section>
            <section className={styles.mobileMenu__items}>
              {renderMenuItems()}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
        <header className={`${styles.header} ${!isMobile ? styles.pc : ''}`}>
          {isMobile && (
            <Button 
              type="Outlined"
              action="button"
              icon={BarsIcon}
              onClick={toggleMobileMenu}
              style={{ width: 'fit-content' }}
            />
          )}
          {!isMobile && <h1>TRAINING&nbsp;<span className={styles.redspan}>CHECKER</span></h1>}
          {!isMobile && <ul className={styles.list}>{renderMenuItems()}</ul>}
      </header>
    </>
  );
};