"use client";
import { Suspense } from "react";
import PageWrapper from "@/shared/layouts/pageWrapper/PageWrapper";
import PlayerInfo from "@/app/player/components/playerinfo/PlayerInfo";
import PlayerLoader from "@/widgets/Loaders/PlayerLoader";

const Result = () => {

  return (
    <PageWrapper>
      <Suspense fallback={<PlayerLoader/>}>
        <PlayerInfo/>
      </Suspense>
    </PageWrapper>
  );
};

export default Result;
