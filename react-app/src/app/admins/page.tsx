"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss'

interface Player {
  id: number;
  login: string;
  playerid: number;
  lastlogin: string;
}

export const Admins = () => {
  const [result, setResult] = useState<Player[] | null>(null);

  useEffect(() => {
    const getAdmins = async () => {
      const url = `https://training-server.com/api/admin`;

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

    getAdmins();
  }, []);

  return (
    <>
      <div className={styles.PageWrapper}>
        <h1>Список администраторов</h1>
        {result ? (
          <table className={styles.Table}>
            <thead className={styles.head}>
              <tr>
                <th>ID</th>
                <th>Никнейм</th>
                <th>ID игрока</th>
                <th>Последнее вход</th>
              </tr>
            </thead>
            <tbody>
              {result.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.login}</td>
                  <td>{player.lastlogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Информация об администраторах загружается...</p>
        )}
      </div>
    </>
  )
}
export default Admins