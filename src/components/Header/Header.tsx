"use client";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiTabsOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";
import BootstrapTooltip from "../Styles/TooltipStyles";

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const crntPage = window.location.pathname.split('/')[1];
    setActivePage(crntPage === ""? "../" : crntPage);
    const elementExists = Elements.some((el) => el.id === crntPage);
    if (!elementExists) {
      setActivePage("main");
    }
  }, []);

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpened((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        document.body.style.overflow = isOpen? "hidden" : "auto";
      }
      return isOpen;
    })
  };

  const swapPage = (page: string) => {
    router.push(`/${page}`);
    if (page === "") {
      setActivePage("../")
    }
    setActivePage(page);
    if (isMobileMenuOpened) {
      setIsMobileMenuOpened(false);
    } else {
      return;
    }
  };

  return (
    <header className={styles.header}>
      <h1>
        TRAINING <span className={styles.redspan}>CHECKER</span>
      </h1>
      {!isMobile ? (
        <ul className={styles.list}>
          {Elements.length > 0 &&
            Elements.map((element, index) => (
              <BootstrapTooltip title={element.tooltipText}>
                <li key={index}>
                  { element.isDisabled === false ? (
                    <Link 
                      href={element.link} 
                      onClick={() => swapPage(element.id)}
                      className={activePage === element.id ? styles.active : ""}
                      style={element.style}
                      key={index}
                    >
                      {element.icon} {element.text}
                      {element.isNew && (
                        <span 
                          className={styles.badge__new} 
                          style={element.style}
                          key={index}
                        >
                          new
                        </span>
                      )}
                    </Link>
                  ) : (
                    <span 
                      className={styles.disabled_element} 
                      style={element.style}
                      key={index}
                    >
                      {element.icon} {element.text}
                      {element.isNew && (
                        <span 
                          className={styles.badge__new} 
                          style={element.style}
                          key={index}
                        >
                          new
                        </span>
                      )}
                    </span>
                  )}
                </li>
              </BootstrapTooltip>
            ))}
        </ul>
      ) : (
        <>
          <button
            className={styles.mobile__button}
            onClick={handleOpenMobileMenu}
          >
            <TiTabsOutline />
          </button>
          {isMobileMenuOpened && (
            <motion.div 
              className={styles.mobile__menu}
              layout
              animate={{ width: "100%", opacity: 1 }}
            >
              <div className={styles.mobile__menu__header}>
                <button className={styles.mobile__button} onClick={handleOpenMobileMenu}>X</button>
              </div>
              <div className={styles.mobile__menu__body}>
              <motion.ul className={styles.mobile__menu__body__list} animate={{ width: "100%" }}>
                {Elements.length > 0 &&
                  Elements.map((element, index) => (
                    <motion.li 
                      key={index}
                      style={element.style}
                      className={activePage === element.id ? styles.active : ""}
                      animate={{ width: "100%" }}
                    >
                      <Link 
                        href={element.link}
                        onClick={() => swapPage(element.id)}
                        style={element.style}
                      >
                        {element.icon} {element.text}
                        {element.isNew && (
                          <span className={styles.badge__new}>NEW</span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
              </motion.ul>
              </div>
            </motion.div>
          )}
        </>
      )}
    </header>
  );
};
