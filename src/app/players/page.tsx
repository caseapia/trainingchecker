"use client";
import React, {useEffect, useState, Suspense} from 'react';
import Link from 'next/link';
import {BadgeRenderer} from '@/components/BadgeRenderer/BadgeRenderer';
import {Table, Thead, Tr, Td, TBody, Th} from '@/components/Table/Table';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import Loader from '@/modules/Loader/Loader';
import {usePage500} from '@/shared/hooks/page500';
import Player from './types';
import TableLoader from "@/modules/Loaders/TableLoader";

const Players = () => {
  const [result, setResult] = useState<Player[] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const triggerPage500 = usePage500();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const getPlayers = async () => {
      const url = process.env.NEXT_PUBLIC_API_ONLINE_URL;

      if (!url) {
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          setIsLoaded(false);
          console.log(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setResult(jsonResponse.data);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error:', err);
        setIsLoaded(false);
      } finally {
        clearTimeout(timeoutId);
      }
    };

    getPlayers();

    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        triggerPage500();
      }
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <Suspense fallback={<TableLoader rows={3} columns={3}/>}>
      <PageWrapper title="Список игроков в сети">
        <Table>
          {result ? (
            <>
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
                      <Link
                        style={{marginRight: '6px'}}
                        href={`../player?nickname=${player.login}`}>
                        {player.login}
                      </Link>
                      <BadgeRenderer player={player}/>
                    </Td>
                    <Td>{player.lastlogin}</Td>
                  </Tr>
                ))}
              </TBody>
            </>
          ) : (<TableLoader rows={3} columns={3}/>)}
        </Table>
      </PageWrapper>
    </Suspense>
  );
}

export default Players;
