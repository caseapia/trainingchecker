"use client"
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.scss"

import { Table, Thead, Tr, Td, Th, TBody } from "@/components/Table/Table";
import Chip from "@/components/Chip/Chip";
import Button from "@/components/Buttons/Button";
import worldBlockWorlds from "@/consts/worldBlockWords";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { toast } from "@/utils/toast";
import { usePage500 } from "@/shared/hooks/page500";
import { useTransformTextColor } from "@/utils/helpers/transformToColored";
import Badge from "@/components/InlineBadge/Badge";
import Loader from "@/modules/Loaders/index";
import { World } from "@/models/Worlds";
import { getWorlds } from "@/services/WorldsService";

import BookmarkIcon from "@/icons/page-worldlist/bookmark.svg";
import CpuIcon from "@/icons/page-worldlist/cpu.svg";
import AlertIcon from "@/icons/page-worldlist/alertFill.svg";
import CopyIcon from "@/icons/copy.svg";
import DeblurIcon from "@/icons/page-worldlist/deblur.svg";
import LensBlurIcon from "@/icons/page-worldlist/lensBlur.svg";

const WorldList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<World[] | null>(null);
  const [sensMode, setSensMode] = useState<boolean>(false);
  const [originalWorlds, setOriginalWorlds] = useState<World[] | null>(null);
  const [isBadgeLoading, setBadgeLoading] = useState<boolean>(true);
  const triggerPage500 = usePage500();
  const transformedWorldName = useTransformTextColor;

  const getWorldsData = async () => {
    try {
      const response = await getWorlds();
      setResult(response.worlds);
      setOriginalWorlds(response.worlds);
      setIsLoaded(true);
      setBadgeLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        triggerPage500();
      }
    }, 8000);

    getWorldsData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const formatWorldInfo = (world: World) => {
    const ssmp = world.ssmp ? " // Использует SSMP" : "";
    const staticW = world.static ? " // Статичный" : "";
    return `Название: ${world.name} // Игроков: ${world.players}${ssmp}${staticW}`;
  };

  const copyWorlds = async () => {
    if (result?.length) {
      const toCopyContent = result.map(formatWorldInfo).join(";\n");
      const worldsCounter = result.length;
      const isSensModeActive = sensMode ? "Чувствительный режим включен" : "";

      await navigator.clipboard.writeText(`${isSensModeActive}\n\n${toCopyContent}\n\nВсего миров: ${worldsCounter}`);
      toast.success("Список открытых миров скопирован в ваш буфер обмена", { lifeTime: 5000 });
    }
  };

  const toggleSensitiveMode = () => {
    if (result) {
      const filteredWorlds = sensMode
        ? originalWorlds
        : result.filter(world =>
          !worldBlockWorlds.some(forbiddenWord =>
            world.name.toLowerCase().includes(forbiddenWord)
          )
        );

      setResult(filteredWorlds);
      setSensMode(!sensMode);

      const message = sensMode ? "Чувствительный режим выключен" : "Чувствительный режим включен";
      toast.success(message, { lifeTime: 5000 });
    }
  };

  const sensitiveMode = () => toggleSensitiveMode();

  const getBadgeColor = () => {
    const worlds = result?.length ?? 0;

    if (worlds < 4) {
      return "danger";
    }
    return "default";
  }

  return (
    <Suspense fallback={<Loader type="Table" rows={3} columns={3}/>}>
      <PageWrapper title={
        <>
          <span>Список открытых миров</span>
          <Badge
            type={getBadgeColor()}
            handler={result?.length}
            size="medium"
            isLoading={isBadgeLoading}
          />
        </>
      }>
        <div className={styles.buttonGroup}>
          <Button
            type="Primary"
            action="button"
            onClick={copyWorlds}
            icon={CopyIcon}
          >
            Скопировать
          </Button>
          <Button
            type="Outlined"
            action="button"
            onClick={sensitiveMode}
            icon={sensMode ? DeblurIcon : LensBlurIcon}
            glow="red"
            ripple={false}
          >
            {sensMode ? "Выключить чувствительный режим" : "Включить чувствительный режим"}
          </Button>
        </div>
        <Table>
          {isLoaded ? (
            <>
              <Thead>
                <Tr>
                  <Th>Название</Th>
                  <Th>Онлайн</Th>
                  <Th>Метки</Th>
                </Tr>
              </Thead>
              <TBody>
                {result && result.length > 0 && (
                  result.map((world, index) => (
                    <Tr key={index}>
                      <Td>{transformedWorldName(world.name)}</Td>
                      <Td>{world.players}</Td>
                      <Td className={styles.ChipContainer}>
                        {world.static ? (
                          <Chip label="Статичный" size="small" icon={BookmarkIcon}/>
                        ) : world.ssmp ? (
                          <Chip label="SSMP" size="small" icon={CpuIcon}/>
                        ) : !(world.static || !world.ssmp) ? null : (
                          <Chip label="Нет меток" size="small" icon={AlertIcon}/>
                        )}
                      </Td>
                    </Tr>
                  ))
                )}
              </TBody>
            </>
          ) : (
            <Loader type="Table" rows={3} columns={3}/>
          )}
        </Table>
      </PageWrapper>
    </Suspense>
  )
}

export default WorldList;