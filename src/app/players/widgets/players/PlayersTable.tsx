import React, { FC } from "react";
import { Table, TBody, Td, Th, Thead, Tr } from "@/shared/components/ui/table/Table";
import PlayersInterface from "@/shared/models/Players";
import styles from "@/app/players/page.module.scss";
import Link from "next/link";
import { BadgeRenderer } from "@/entities/player/badgeRenderer/BadgeRenderer";
import { useTranslation } from "react-i18next";
import Loader from "@/widgets/Loaders";

interface PlayersTableEntryData {
  data: PlayersInterface | null;
  isLoading: boolean;
}

const PlayersTable: FC<PlayersTableEntryData> = ({ data, isLoading }) => {
  const [tPlayers] = useTranslation("players");

  if (isLoading) {
    return (
      <Table>
        <Loader type="Table" rows={3} columns={3} />
      </Table>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{tPlayers("id")}</Th>
          <Th>{tPlayers("nickname")}</Th>
          <Th>{tPlayers("connected")}</Th>
        </Tr>
      </Thead>
      <TBody>
        {data.map((player) => (
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
    </Table>
  );
};

export default PlayersTable;