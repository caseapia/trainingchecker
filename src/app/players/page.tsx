"use client";
import React, { Suspense } from "react";
import PageWrapper from "@/shared/layouts/pageWrapper/PageWrapper";
import { useTranslation } from "react-i18next";
import { useFetchPlayers } from "@/app/players/components/shared/hooks/useFetchPlayers";
import PlayersTable from "@/app/players/widgets/players/PlayersTable";

const Players = () => {
  const {data, isLoading} = useFetchPlayers();
  const [tPlayers] = useTranslation("players");
  return (
    <Suspense>
      <PageWrapper title={tPlayers("title")}>
        <PlayersTable data={data} isLoading={isLoading} />
      </PageWrapper>
    </Suspense>
  );
}

export default Players;
