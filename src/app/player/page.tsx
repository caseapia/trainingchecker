"use client";
import { Suspense } from "react";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import PlayerInfo from "@/app/player/components/playerinfo/PlayerInfo";
import PlayerLoader from "@/modules/Loaders/PlayerLoader";

const Result = () => (
  <PageWrapper>
    <h1>Информация об игроке</h1>
    <Suspense fallback={<PlayerLoader/>}>
      <PlayerInfo/>
    </Suspense>
  </PageWrapper>
);

export default Result;
