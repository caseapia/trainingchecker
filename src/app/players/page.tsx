"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { BadgeRenderer } from "@/components/badgeRenderer/BadgeRenderer";
import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import Loader from "@/modules/Loaders/index";
import { fetchPlayersOnline } from "@/services/PlayersService";
import PlayersInterface from "@/models/Players";
import styles from "./page.module.scss";
import { useTranslation } from "react-i18next";

const Players = () => {
  const [result, setResult] = useState<PlayersInterface | null>(null);
  const [tPlayers] = useTranslation("players");

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
    <Suspense fallback={
      <Loader type="Table"
        rows={3}
        columns={3}/>
    }
    >
      <PageWrapper title={tPlayers("title")}>
        <Table>
          {result ? (
            <>
              <Thead>
                <Tr>
                  <Th>{tPlayers("id")}</Th>
                  <Th>{tPlayers("nickname")}</Th>
                  <Th>{tPlayers("connected")}</Th>
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
          ) : (
            <Loader
              type="Table"
              rows={3}
              columns={3}
            />
          )}
        </Table>
      </PageWrapper>
    </Suspense>
  );
}

export default Players;
