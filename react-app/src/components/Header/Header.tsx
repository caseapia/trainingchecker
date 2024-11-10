"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss';
import { SiMainwp } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import Link from 'next/link';

export const Header = () => {
  const mainRef = useRef<HTMLAnchorElement>(null)
  const playersOnlineRef = useRef<HTMLAnchorElement>(null)
  const adminsRef = useRef<HTMLAnchorElement>(null)
  const resultRef = useRef<HTMLAnchorElement>(null)
  const [isResult, setIsResult] = useState(false);
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
  }, [])
  return (
    <header className={styles.header}>
      <h1>TRAINING <span className={styles.redspan}>CHECKER</span></h1>
      <ul className={styles.list}>
        <li><Link href='../' className={styles.element} ref={mainRef}><SiMainwp /> Главная</Link></li>
        <li><Link href='../players' className={styles.element} ref={playersOnlineRef}><FaUser /> Игроки в сети</Link></li>
      </ul>
    </header>
  )
}