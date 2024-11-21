"use client"
import React from 'react'
import styles from './page.module.scss';
import { allBadges } from '@/shared/consts/badges';

const page = () => {
  return (
    <div className={styles.PageWrapper}>
      <h1>Список всех значков</h1>
      <table className={styles.BadgesWrapper}>
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
      </table>
    </div>
  )
}

export default page