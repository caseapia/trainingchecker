"use client";
import React, {useEffect, useRef, useState} from "react";
import styles from "./Header.module.scss";
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {isMobileDevice} from "@/hooks/isMobileDevice";
import {Elements} from "@/shared/consts/headerElements";
import BootstrapTooltip from "@/components/Styles/TooltipStyles";
import BarsIcon from '@/icons/components/header/bars.svg';
import Button from "@/components/Buttons/Button";
import LinkedButton from "@/components/Buttons/LinkedButton";
import Badge from "@/components/InlineBadge/Badge";
import headerVariants from './variant';
import settings from '@/consts/settings';

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("main");
  const router = useRouter();
  const [online, setOnline] = useState<number>(NaN);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [isBadgeLoading, setIsBadgeLoading] = useState<boolean>(true);
  const headerText = settings.find(s => s.option === 'headerText')?.value || '';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpened(false);
      }
    }

    if (isMobileMenuOpened) {
      document.addEventListener('mouseup', handleClickOutside);
    }

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
    if (isMobileMenuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleNavigation = (page: string) => {
    router.push(`/${page}`);
    setActivePage(page || "main");
    if (isMobileMenuOpened) {
      setIsMobileMenuOpened(false);
    }
  };

  const getPlayers = () => {
    const url = process.env.NEXT_PUBLIC_API_ONLINE_URL;

    if (!url) {
      console.error('API URL is not defined.');
      return;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setOnline(jsonResponse.data.length);
        setIsBadgeLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getBadgeColor = () => {
    if (online <= 20) {
      return 'danger';
    } else if (online <= 50) {
      return 'warning';
    }
    return 'blue';
  }

  const renderMenuItems = () => (
    Elements.map(({id, link, icon, text, tooltipText, isDisabled, isNew, style}) => (
      <motion.li
        key={id}
        className={activePage === id ? styles.active : ""}
        draggable="false"
      >
        {isDisabled ? (
          <BootstrapTooltip title={tooltipText}>
            <span className={styles.disabled_element} style={style}>
              {icon} {text}
              {isNew && <Badge type="danger" content="new"/>}
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
          >
            <span>
              {icon} {text}
              {isNew && <Badge type="danger" content="new"/>}
              {id === 'players' && <Badge type={getBadgeColor()} handler={online} isLoading={isBadgeLoading}/>}
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
              <h1 translate={'no'}>
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
            style={{width: 'fit-content'}}
          />
        )}
        {!isMobile && <h1 translate={'no'} dangerouslySetInnerHTML={{__html: headerText}}></h1>}
        {!isMobile && <ul className={styles.list}>{renderMenuItems()}</ul>}
      </header>
    </>
  );
};