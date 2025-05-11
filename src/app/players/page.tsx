"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { BadgeRenderer } from "@/components/badgeRenderer/BadgeRenderer";
import { Table, Thead, Tr, Td, TBody, Th } from "@/components/table/Table";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import Loader from "@/modules/Loaders/index";
import { fetchPlayersOnline } from "@/services/PlayersService";
import PlayersInterface from "@/models/Players";
import styles from "./page.module.scss";

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
    <Suspense fallback={<Loader type="Table"
      rows={3}
      columns={3}/>}>
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
                    <Td className={styles.username}>
                      <Link href={`../player?nickname=${player.login}`}>
                        {player.login}
                      </Link>
                      <BadgeRenderer player={player}/>
                    </Td>
                    <Td>{player.lastlogin}</Td>
                  </Tr>
                ))}
              </TBody>
            </>
          ) : (<Loader type="Table"
            rows={3}
            columns={3}/>)}
        </Table>
      </PageWrapper>
    </Suspense>
  );
}

export default Players;
