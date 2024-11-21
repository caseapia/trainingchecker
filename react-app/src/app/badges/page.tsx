"use client"
import React from 'react'
import styles from './page.module.scss';
import { allBadges } from '@/shared/consts/badges';
import { Table, Thead, Tr, Td, TBody } from '@/components/Table/Table';

const page = () => {
  return (
    <div className={styles.PageWrapper}>
      <h1>Список всех значков</h1>
      <Table width={50}>
        <Thead>
          <Tr>
            <Td>Иконка</Td>
            <Td>Название</Td>
            <Td>Описание</Td>
          </Tr>
        </Thead>
        <TBody>
          {allBadges.map((badge, index) => (
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
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <td>Иконка</td>
            <td>Название</td>
            <td>Описание</td>
          </tr>
        </thead>
        <tbody>
          {allBadges.map((badge, index) => (
            <tr key={index}>
              <td>
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
              </td>
              <td style={{ color: badge.textColor }}>{badge.title}</td>
              <td>{badge.description}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
}

export default page