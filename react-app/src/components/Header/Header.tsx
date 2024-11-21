"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { FaUser, FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiTabsOutline } from "react-icons/ti";
import { motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const crntPage = window.location.pathname.split('/')[1];
    setActivePage(crntPage);
  }, []);

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const swapPage = (page: string) => {
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
              <li key={index}>
                <Link 
                  href={element.link} 
                  onClick={() => swapPage(element.id)}
                  className={activePage === element.id ? styles.active : ""}
                  style={element.style}
                >
                  {element.icon} {element.text}
                </Link>
              </li>
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
              <ul className={styles.mobile__menu__body__list}>
                {Elements.length > 0 &&
                  Elements.map((element, index) => (
                    <li 
                      key={index}
                      style={element.style}
                      className={activePage === element.id ? styles.active : ""}
                    >
                      <Link 
                        href={element.link}
                        onClick={() => swapPage(element.id)}
                        style={element.style}
                      >
                        {element.icon} {element.text}
                      </Link>
                    </li>
                  ))}
              </ul>
              </div>
            </motion.div>
          )}
        </>
      )}
    </header>
  );
};
