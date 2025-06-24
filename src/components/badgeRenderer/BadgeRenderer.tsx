"use client";
import React, { useState } from "react";
import BadgeProps, { allBadges } from "@/shared/constants/badges";
import styles from "./BadgeRenderer.module.scss";
import BootstrapTooltip from "@/components/styles/TooltipStyles";
import { Modal } from "@/components/modal/Modal";
import { useIsMobileDevice } from "@/hooks/isMobileDevice";
import BadgeRendererProps from "./props";
import { useTranslation } from "react-i18next";

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeProps>();
  const isMobile = useIsMobileDevice();
  const [tBadges] = useTranslation("badges");

  if (!player) return null;

  const badgesToShow = allBadges.filter((badge) => {
    const {
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
      {badgesToShow.map((badge) => {
        const key = badge.translationKey;
        return (
          <BootstrapTooltip
            key={badge.id}
            title={
              <>
              <span style={{ color: badge.textColor, fontWeight: 600 }}>
                {tBadges(`items.${key}.title`)}
              </span>
                {tBadges(`items.${key}.description`) &&
                  <><br/>{tBadges(`items.${key}.description`)}</>
                }
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
        )
      })}

      {selectedBadge && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`items.${selectedBadge.translationKey}.title`}
          titleStyle={{ color: selectedBadge.textColor }}
        >
          <p>{`items.${selectedBadge.translationKey}.description`}</p>
        </Modal>
      )}
    </div>
  ) : null;
};

export { BadgeRenderer };