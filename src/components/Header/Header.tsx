"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { isMobileDevice } from "@/hooks/isMobileDevice";
import { Elements } from "@/shared/consts/headerElements";
import BootstrapTooltip from "../Styles/TooltipStyles";
import { FaBars } from "react-icons/fa";

export const Header = () => {
  const isMobile = isMobileDevice();
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("");
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const crntPage = window.location.pathname.split('/')[1];
    setActivePage(crntPage === ""? "../" : crntPage);
    const elementExists = Elements.some((el) => el.id === crntPage);
    if (!elementExists) {
      setActivePage("main");
    }
  }, []);

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
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
    <header className={isMobile === true ? `${styles.header} ${styles.mobile__header}` : styles.header}>
      <h1>
        TRAINING <span className={styles.redspan}>CHECKER</span>
      </h1>
      {!isMobile ? (
        <ul className={styles.list}>
          {Elements.length > 0 &&
            Elements.map((element, index) => (
              <BootstrapTooltip title={element.tooltipText} key={index}>
                <li key={index}>
                  { element.isDisabled === false ? (
                    <Link 
                      href={element.link} 
                      onClick={() => swapPage(element.id)}
                      className={activePage === element.id ? styles.active : ""}
                      style={element.style}
                      key={index}
                    >
                      <span>
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
            ref={buttonRef}
            onClick={handleOpenMobileMenu}
          >
            <FaBars />
          </button>
          {isMobileMenuOpened && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={styles.mobile__menu}
            >
              <ul className={styles.mobile__menu__list}>
                {Elements.length > 0 && (
                  Elements.map((element, idx) => (
                    <li key={idx} className={activePage === element.id ? styles.active : ""}>
                      {!element.isDisabled ? (
                        <Link 
                        href={element.link}
                        onClick={() => swapPage(element.id)}
                        style={element.style}
                      >
                        <span>
                          {element.icon} {element.text}
                          {element.isNew && (
                            <span 
                              className={styles.badge__new} 
                              style={element.style}
                              key={idx}
                            >
                              new
                            </span>
                          )}
                        </span>
                      </Link>
                      ) : (
                        <span 
                          className={styles.disabled_element}
                          style={element.style}
                          key={idx}
                        >
                          {element.icon} {element.text} {element.isNew && <span className={styles.badge__new} style={element.style} key={idx}>new</span>}
                        </span>
                      )}
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          )}
        </>
      )}
    </header>
  );
};
