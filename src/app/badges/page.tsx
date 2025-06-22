"use client"
import React, { Suspense } from "react"
import styles from "./page.module.scss";
import { allBadges } from "@/shared/consts/badges";
import { Table, TBody, Td, Thead, Tr } from "@/components/table/Table";
import PageWrapper from "@/components/pageWrapper/PageWrapper";
import { useTranslation } from "react-i18next";

const page = () => {
  const [tBadges] = useTranslation("badges");

  const sortedBadges = allBadges.sort((a, b) => {
    if (a.category < b.category) return 1;
    if (a.category > b.category) return -1;

    return a.id - b.id;
  });
  return (
    <Suspense>
      <PageWrapper title={tBadges("title")}>
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
                    <span className={styles.badge}
                      style={{ backgroundColor: badge.color }}>
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
      </PageWrapper>
    </Suspense>
  )
}

export default page