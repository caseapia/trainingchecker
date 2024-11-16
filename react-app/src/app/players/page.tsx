"use client";
import React, { useEffect, useState, Suspense } from 'react';
import styles from './page.module.scss'
import Link from 'next/link';
import BadgeRenderer from '@/components/BadgeRenderer/BadgeRenderer';
import Lottie from 'lottie-react';
import Preloader from '../../../public/assets/lotties/Preloader.json';

interface Player {
  id: number;
  login: string;
  playerid: number;
  lastlogin: string;
  moder: number;
}

function Players() {
  const [result, setResult] = useState<Player[] | null>(null);

  useEffect(() => {
    const getPlayers = async () => {
      const url = process.env.NEXT_PUBLIC_API_ONLINE_URL;

      if (!url) {
        console.debug('API URL is not defined');
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setResult(jsonResponse.data);
        console.log(jsonResponse.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    getPlayers();
  }, []);
  return (
    <Suspense fallback={<Lottie animationData={Preloader} />}>
      <div className={styles.PageWrapper} id='players'>
        <h1>Список игроков в сети</h1>
        {result ? (
          <table className={styles.Table}>
            <thead className={styles.head}>
              <tr>
                <th>ID</th>
                <th>Никнейм</th>
                <th>Вошел</th>
              </tr>
            </thead>
            <tbody>
              {result.map((player) => (
                <tr key={player.id}>
                  <td>{player.playerid}</td>
                  <td>
                    <Link style={{ marginRight: '6px' }} href={`../result?nickname=${player.login}`}>{player.login}</Link>
                    <BadgeRenderer player={player} />
                  </td>
                  <td>{player.lastlogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Lottie animationData={Preloader} />
        )}
      </div>
    </Suspense>
  );
}

export default Players;
