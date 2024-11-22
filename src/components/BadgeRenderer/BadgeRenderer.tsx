"use client"
import React, { useEffect, useState } from "react";
import { allBadges } from "../../shared/consts/badges";
import styles from "./BadgeRenderer.module.scss";
import BootstrapTooltip from "../Styles/TooltipStyles";

type BadgeRendererProps = {
  player?: {
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
  onBadgeStatusChange?: (hasBadges: boolean) => void;
};

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ player, onBadgeStatusChange }) => {
  const badgesToShow = allBadges.filter((badge) => {
    if (!player) return false; 

    if (badge.moder && badge.moder !== player.moder) return false;
    if (badge.accid) {
      if (Array.isArray(badge.accid)) {
        if (player.id === undefined || !badge.accid.includes(player.id)) return false;
      } else if (player.id === undefined || badge.accid !== player.id) {
        return false;
      }
    }
    if (badge.verify && badge.verify !== player.verify) return false;
    if (
      (badge.minModer !== undefined && (player.moder ?? 0) < badge.minModer) ||
      (badge.maxModer !== undefined && (player.moder ?? 0) > badge.maxModer)
    ) return false;
    if (
      (badge.minAccId !== undefined && (player.id ?? 0) < badge.minAccId) ||
      (badge.maxAccId !== undefined && (player.id ?? 0) > badge.maxAccId)
    ) return false;
    if (
      (badge.minRegDate !== undefined && !(player.regdate ?? '').includes(badge.minRegDate)) ||
      (badge.maxRegDate !== undefined && (player.regdate ?? '').includes(badge.maxRegDate))
    ) return false;
  
    return true;

    allBadges.sort((a, b) => {
      if (a.category < b.category) return 1;
      if (a.category > b.category) return -1;
  
      return a.id - b.id;
    })});
  
  useEffect(() => {
    const hasBadges = badgesToShow.length > 0;
    if (onBadgeStatusChange) {
      onBadgeStatusChange(badgesToShow.length > 0);
    }
  }, [badgesToShow, onBadgeStatusChange])

  return badgesToShow.length > 0 ? (
    <>
      {badgesToShow.map((badge) => (
        <BootstrapTooltip 
          title={<><span style={{ color: `${badge.textColor}` }}>{badge.title}</span>{badge.description && <><br />{badge.description}</>}</>} 
          placement="top" 
          key={badge.id || badge.title}
          arrow
          enterDelay={0}>
          <span
            className={styles.badge}
            style={{ backgroundColor: badge.color }}
            key={badge.id || badge.title}
          >
            <span 
              className={`${styles.BadgeIcon}`} 
              key={badge.id || badge.title}
            >
              {badge.icon}
            </span>
          </span>
        </BootstrapTooltip>
      ))}
    </>
  ) : null;
};

export { BadgeRenderer };