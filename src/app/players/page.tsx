"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { BadgeRenderer } from '@/components/BadgeRenderer/BadgeRenderer';
import { Table, Thead, Tr, Td, TBody, Th } from '@/components/Table/Table';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import Loader from '@/modules/Loader/Loader';

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
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setResult(jsonResponse.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    getPlayers();
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <PageWrapper title={`Список игроков в сети (${result?.length || "Загрузка..."})`}>
        {result ? (
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Никнейм</Th>
                <Th>Вошел</Th>
              </Tr>
            </Thead>
            <TBody>
              {result.map((player) => (
                <Tr key={player.id}>
                  <Td>{player.playerid}</Td>
                  <Td>
                    <Link style={{ marginRight: '6px' }} href={`../player?nickname=${player.login}`}>{player.login}</Link>
                    <BadgeRenderer player={player} />
                  </Td>
                  <Td>{player.lastlogin}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        ) : (
          <Loader />
        )}
      </PageWrapper>
    </Suspense>
  );
}

export default Players;
