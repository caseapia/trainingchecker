import React from "react";
import { Table, TBody, Td, Thead, Tr } from "@/shared/components/ui/table/Table";
import styles from "./badges.module.scss";
import { useTranslation } from "react-i18next";
import { sortedBadges } from "@/app/badges/components/shared/hooks/sortBadges";

const Badges = () => {
  const [tBadges] = useTranslation("badges");

  return (
    <Table>
      <Thead>
        <Tr>
          <Td>{tBadges("icon")}</Td>
          <Td>{tBadges("name")}</Td>
          <Td>{tBadges("description")}</Td>
        </Tr>
      </Thead>
      <TBody>
        {sortedBadges.map((badge, index) => {
          const key = badge.translationKey;
          return (
            <Tr key={index}>
              <Td>
                <span
                  className={styles.badge}
                  style={{ backgroundColor: badge.color }}
                >
                  <span className={styles.BadgeIcon}>{badge.icon}</span>
                </span>
              </Td>
              <Td style={{ color: badge.textColor }}>
                {tBadges(`items.${key}.title`)}
              </Td>
              <Td>
                {tBadges(`items.${key}.description`)}
              </Td>
            </Tr>
          );
        })}
      </TBody>
    </Table>
  );
};

export default Badges;