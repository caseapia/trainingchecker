"use client";
import React, {useEffect, useState, Suspense} from 'react';
import Link from 'next/link';
import {BadgeRenderer} from '@/components/BadgeRenderer/BadgeRenderer';
import {Table, Thead, Tr, Td, TBody, Th} from '@/components/Table/Table';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import TableLoader from "@/modules/Loaders/TableLoader";
import {fetchPlayersOnline} from "@/services/PlayersService";
import PlayersInterface from "@/models/Players";

const Players = () => {
  const [result, setResult] = useState<PlayersInterface | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const result = await fetchPlayersOnline();
        setResult(result);
      } catch (error: any) {
        console.error(error);
      }
    }

    fetchPlayers();
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
