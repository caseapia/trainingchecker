"use client";
import React, {useState} from "react";
import BadgeProps, { allBadges } from "@/consts/badges";
import styles from "./BadgeRenderer.module.scss";
import BootstrapTooltip from "../Styles/TooltipStyles";
import { Modal } from "../Modal/Modal";
import { isMobileDevice } from "@/shared/hooks/isMobileDevice";
import BadgeRendererProps from './props';

const BadgeRenderer: React.FC<BadgeRendererProps> = ({ player }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedBadge, setSelectedBadge] = useState<BadgeProps | undefined>(undefined);
	const isMobile: boolean = isMobileDevice();
	
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
		return !(badge.nicknameIncludes !== undefined &&
			(
				Array.isArray(badge.nicknameIncludes)
					? badge.nicknameIncludes.some(nick => (player.login ?? '').includes(nick))
					: !(player.login ?? '').includes(badge.nicknameIncludes)
			));
	});
	
	const handleBadgeClick = (badge: BadgeProps) => {
		if (isMobile) {
			setSelectedBadge(badge);
			setIsModalOpen(true);
		} else {
			return false;
		}
	}
	
	return (
		badgesToShow.length > 0 ? (
			<>
				{badgesToShow.map((badge) => (
					<BootstrapTooltip
						title={<><span style={{ color: `${badge.textColor}` }}>{badge.title}</span>{badge.description && <><br />{badge.description}</>}</>}
						key={badge.id || badge.title}
					>
            <span
	            className={styles.badge}
	            style={{ backgroundColor: badge.color }}
	            key={badge.id || badge.title}
	            onClick={() => handleBadgeClick(badge)}
            >
              <span className={styles.BadgeIcon}>
                {badge.icon}
              </span>
            </span>
					</BootstrapTooltip>
				))}
				{selectedBadge && (
					<Modal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						title={selectedBadge.title}
						titleStyle={{ color: `${selectedBadge.textColor}` }}
					>
						<p>{selectedBadge.description}</p>
					</Modal>
				)}
			</>
		) : null
	);
};

export { BadgeRenderer };
