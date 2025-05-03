"use client";
import { Suspense, useEffect } from "react";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import PlayerInfo from "@/app/player/components/playerinfo/PlayerInfo";
import PlayerLoader from "@/modules/Loaders/PlayerLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/utils/toast";

const Result = () => {
  const nickname = useSearchParams().get("nickname");
  const router = useRouter();

  useEffect(() => {
    if (nickname === ".") {
      toast.error("Вы не можете совершить поиск по данному никнейму", { lifeTime: 6000 })
      router.push("/");
      return;
    }

    if (!nickname) {
      toast.error("Ник игрока не указан. Возвращаем на главную.", { lifeTime: 6000 });
      router.push("/");
      return;
    }
  }, []);

  return (
    <PageWrapper>
      <h1>Информация об игроке</h1>
      <Suspense fallback={<PlayerLoader/>}>
        <PlayerInfo/>
      </Suspense>
    </PageWrapper>
  );
};

export default Result;
