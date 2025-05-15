"use client";
import React, { useState } from "react";
import BadgeProps, { allBadges } from "@/consts/badges";
import styles from "./BadgeRenderer.module.scss";
import BootstrapTooltip from "@/components/styles/TooltipStyles";
import { Modal } from "@/components/modal/Modal";
import { useIsMobileDevice } from "@/hooks/isMobileDevice";
import BadgeRendererProps from "./props";

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeProps>();
  const isMobile = useIsMobileDevice();

  if (!player) return null;

  const badgesToShow = allBadges.filter((badge) => {
    const {
      id,
      moder,
      verify,
      accid,
      minModer,
      maxModer,
      minAccId,
      maxAccId,
      minRegDate,
      maxRegDate,
      nicknameIncludes
    } = badge;
    const playerModer = player.moder ?? 0;
    const playerId = player.id ?? 0;
    const playerLogin = player.login ?? "";
    const playerRegdate = player.regdate ?? "";

    if (moder && moder !== player.moder) return false;
    if (verify && verify !== player.verify) return false;

    if (accid) {
      if (Array.isArray(accid)) {
        if (!accid.includes(playerId)) return false;
      } else if (accid !== playerId) return false;
    }

    if ((minModer !== undefined && playerModer < minModer) ||
      (maxModer !== undefined && playerModer > maxModer) ||
      (minAccId !== undefined && playerId < minAccId) ||
      (maxAccId !== undefined && playerId > maxAccId) ||
      (minRegDate && !playerRegdate.includes(minRegDate)) ||
      (maxRegDate && playerRegdate.includes(maxRegDate))) {
      return false;
    }

    if (nicknameIncludes) {
      const match = Array.isArray(nicknameIncludes)
        ? nicknameIncludes.some(n => playerLogin.includes(n))
        : playerLogin.includes(nicknameIncludes);
      if (!match) return false;
    }

    return true;
  });

  return badgesToShow.length > 0 ? (
    <div className={styles.container}>
      {badgesToShow.map((badge) => (
        <BootstrapTooltip
          key={badge.id || badge.title}
          title={
            <>
              <span style={{ color: badge.textColor, fontWeight: 600 }}>
                {badge.title}
              </span>
              {badge.description && <><br/>{badge.description}</>}
            </>
          }
        >
          <span
            className={styles.badge}
            style={{ "--color": badge.color } as React.CSSProperties}
            onClick={() => {
              if (isMobile) {
                setSelectedBadge(badge);
                setIsModalOpen(true);
              }
            }}
          >
            <span className={styles.BadgeIcon}>{badge.icon}</span>
          </span>
        </BootstrapTooltip>
      ))}

      {selectedBadge && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedBadge.title}
          titleStyle={{ color: selectedBadge.textColor }}
        >
          <p>{selectedBadge.description}</p>
        </Modal>
      )}
    </div>
  ) : null;
};

export { BadgeRenderer };