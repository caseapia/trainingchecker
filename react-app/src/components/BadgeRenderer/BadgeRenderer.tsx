import React, { useState } from "react";
import { allBadges } from "../../shared/consts/badges";
import styles from "./BadgeRenderer.module.scss";
import BootstrapTooltip from "../Styles/TooltipStyles";

type BadgeRendererProps = {
  player: {
    id?: number;
    login?: string;
    lastlogin?: string;
    moder?: number;
    access?: number;
    verify?: number;
    verifyText?: string;
    mute?: number;
    online?: number;
    regdate?: string;
  };
};

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ player }) => {
  const badgesToShow = allBadges.filter((badge) =>
    (badge.moder && badge.moder === player.moder) || 
    (badge.accid && badge.accid === player.id) || 
    (badge.verify && badge.verify === player.verify) ||
    (badge.minModer !== undefined && (player.moder ?? 0) >= badge.minModer) &&
    (badge.maxModer !== undefined && (player.moder ?? 0) <= badge.maxModer) ||
    (badge.minAccId !== undefined && (player.id ?? 0) >= badge.minAccId) &&
    (badge.maxAccId !== undefined && (player.id ?? 0) <= badge.maxAccId) ||
    (badge.minRegDate !== undefined && (player.regdate ?? '').includes(badge.minRegDate)) &&
    (badge.maxRegDate !== undefined && !(player.regdate ?? '').includes(badge.maxRegDate))
  );

  return (
    <>
      {badgesToShow.map((badge) => (
        <BootstrapTooltip 
        title={
          <>
            <span style={{ color: `${badge.textColor}` }}>
              {badge.title}
            </span> 
            {
              badge.description && 
                <>
                  <br />{badge.description}
                </>
            }
          </>
        } 
        placement="top" 
        arrow 
        enterDelay={0}>
          <span
            className={`${styles.badge} ${badge.title.toLowerCase().replace(" ", "")}`}
            style={{ backgroundColor: badge.color }}
          >
            <span className={`${styles.BadgeIcon}`}>{badge.icon}</span>
          </span>
        </BootstrapTooltip>
      ))}
    </>
  );
};

export default BadgeRenderer;