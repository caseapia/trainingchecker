"use client";
import {Suspense} from 'react';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import Loader from '@/modules/Loader/Loader';
import PlayerInfo from "@/app/player/components/PlayerInfo";

const Result = () => (
  <PageWrapper>
    <h1>Информация об игроке</h1>
    <Suspense fallback={<Loader/>}>
      <PlayerInfo/>
    </Suspense>
  </PageWrapper>
);

export default Result;
