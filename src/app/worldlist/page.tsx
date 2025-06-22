"use client"
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.scss"

import { Table, TBody, Td, Th, Thead, Tr } from "@/components/table/Table";
import Chip from "@/components/chip/Chip";
import Button from "@/components/button/Button";
import worldBlockWorlds from "@/consts/worldBlockWords";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import { toast } from "@/utils/toast";
import textFormatter from "@/utils/helpers/textFormatter";
import Badge from "@/components/inlineBadge/Badge";
import Loader from "@/modules/Loaders/index";
import { World } from "@/models/Worlds";
import { getWorlds } from "@/services/WorldsService";

import BookmarkIcon from "@/icons/page-worldlist/bookmark.svg";
import CpuIcon from "@/icons/page-worldlist/cpu.svg";
import AlertIcon from "@/icons/page-worldlist/alertFill.svg";
import CopyIcon from "@/icons/copy.svg";
import DeblurIcon from "@/icons/page-worldlist/deblur.svg";
import LensBlurIcon from "@/icons/page-worldlist/lensBlur.svg";
import { useTranslation } from "react-i18next";

const WorldList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<World[] | null>(null);
  const [sensMode, setSensMode] = useState<boolean>(false);
  const [originalWorlds, setOriginalWorlds] = useState<World[] | null>(null);
  const [isBadgeLoading, setBadgeLoading] = useState<boolean>(true);
  const [tWorlds] = useTranslation("worlds");

  useEffect(() => {
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

    getWorldsData();
  }, []);

  const formatWorldInfo = (world: World) => {
    const ssmp = world.ssmp ? ` // ${tWorlds("usingSSMP")}` : "";
    const staticW = world.static ? ` // ${tWorlds("static")}` : "";
    return tWorlds("formatted_worldInfo", {
      worldName: world.name,
      worldPlayers: world.players,
      ssmp: ssmp,
      staticW: staticW
    });
  };

  const copyWorlds = async () => {
    if (result?.length) {
      const toCopyContent = result.map(formatWorldInfo).join(";\n");
      const worldsCounter = result.length;
      const isSensModeActive = sensMode ? tWorlds("sensitive_modeActive") : "";

      await navigator.clipboard.writeText(`${isSensModeActive}\n\n${toCopyContent}\n\nВсего миров: ${worldsCounter}`);
      toast.success(tWorlds("successfully_copied"), { lifeTime: 5000 });
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

      const message = sensMode ? tWorlds("sensitive_modeDisabled") : tWorlds("sensitive_modeActive");
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
    <Suspense fallback={
      <Loader
        type="Table"
        rows={3}
        columns={3}/>
    }
    >
      <PageWrapper title={
        <>
          <span>{tWorlds("title")}</span>
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
            {tWorlds("button_copy")}
          </Button>
          <Button
            type="Outlined"
            action="button"
            onClick={sensitiveMode}
            icon={sensMode ? DeblurIcon : LensBlurIcon}
            glow="red"
            ripple={false}
          >
            {sensMode ? tWorlds("button_disableSensitiveMode") : tWorlds("button_enableSensitiveMode")}
          </Button>
        </div>
        <Table>
          {isLoaded ? (
            <>
              <Thead>
                <Tr>
                  <Th>{tWorlds("table_name")}</Th>
                  <Th>{tWorlds("table_online")}</Th>
                  <Th>{tWorlds("table_tags")}</Th>
                </Tr>
              </Thead>
              <TBody>
                {result && result.length > 0 && (
                  result.map((world, index) => (
                    <Tr key={index}>
                      <Td>{textFormatter(world.name)}</Td>
                      <Td>{world.players}</Td>
                      <Td className={styles.ChipContainer}>
                        {world.static ? (
                          <Chip
                            label={tWorlds("static")}
                            size="small"
                            icon={BookmarkIcon}
                          />
                        ) : world.ssmp ? (
                          <Chip
                            label={tWorlds("ssmp")}
                            size="small"
                            icon={CpuIcon}
                          />
                        ) : !(world.static || !world.ssmp) ? null : (
                          <Chip
                            label={tWorlds("no_tags")}
                            size="small"
                            icon={AlertIcon}
                          />
                        )}
                      </Td>
                    </Tr>
                  ))
                )}
              </TBody>
            </>
          ) : (
            <Loader type="Table"
              rows={3}
              columns={3}/>
          )}
        </Table>
      </PageWrapper>
    </Suspense>
  )
}

export default WorldList; 