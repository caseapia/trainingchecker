"use client"
import React, { Suspense } from "react"
import styles from "./page.module.scss";
import { allBadges } from "@/shared/consts/badges";
import { Table, Thead, Tr, Td, TBody } from "@/components/table/Table";
import PageWrapper from "@/components/pageWrapper/PageWrapper";

const page = () => {
  const sortedBadges = allBadges.sort((a, b) => {
    if (a.category < b.category) return 1;
    if (a.category > b.category) return -1;

    return a.id - b.id;
  });
  return (
    <Suspense>
      <PageWrapper title="Список всех значков">
        <Table>
          <Thead>
            <Tr>
              <Td>Иконка</Td>
              <Td>Название</Td>
              <Td>Описание</Td>
            </Tr>
          </Thead>
          <TBody>
            {sortedBadges.map((badge, index) => (
              <Tr key={index}>
                <Td>
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
                </Td>
                <Td style={{ color: badge.textColor }}>{badge.title}</Td>
                <Td>{badge.description}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </PageWrapper>
    </Suspense>
  )
}

export default page