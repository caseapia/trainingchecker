"use client"
import React, { useEffect, useRef } from 'react'
import styles from './Header.module.scss';
import { SiMainwp } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const mainRef = useRef<HTMLAnchorElement>(null);
  const playersOnlineRef = useRef<HTMLAnchorElement>(null);
  const adminsRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  useEffect(() => {
    const players = playersOnlineRef.current;
    const main = mainRef.current;
    const admins = adminsRef.current;
    const link = window.location.href;

    if (link.includes('/players')) {
      players?.classList.add(styles.active);
    } else if (link.includes('/admins')) {
      admins?.classList.add(styles.active);
    } else {
      main?.classList.add(styles.active);
    }
  }, []);

  const swapPage = (page: string) => {
    mainRef.current?.classList.remove(styles.active);
    playersOnlineRef.current?.classList.remove(styles.active);
    adminsRef.current?.classList.remove(styles.active);
    router.push(page);
    if (page === 'players') {
      playersOnlineRef.current?.classList.add(styles.active);
    } else if (page === 'admins') {
      adminsRef.current?.classList.add(styles.active);
    } else {
      mainRef.current?.classList.add(styles.active);
    }
  };

  return (
    <header className={styles.header}>
      <h1>TRAINING <span className={styles.redspan}>CHECKER</span></h1>
      <ul className={styles.list}>
        <li><Link onClick={() => swapPage('')} href='../' className={styles.element} ref={mainRef}><SiMainwp /> Главная</Link></li>
        <li><Link onClick={() => swapPage('players')} href='../players' className={styles.element} ref={playersOnlineRef}><FaUser /> Игроки в сети</Link></li>
      </ul>
    </header>
  )
}