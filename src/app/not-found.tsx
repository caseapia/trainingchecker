"use client"
import MoodSadIcon from '@/icons/page-not-found/moodSad.svg';
import styles from './not-found.module.scss';
import Button from "@/components/Buttons/Button";
import LinkedButton from "@/components/Buttons/LinkedButton";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const NotFound = () => {


  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.IconContainer}>
          <MoodSadIcon />
        </div>
        <h1>Эта страница не найдена</h1>
        <p>Мы не смогли найти эту страницу. Возможно, что-то поломалось или страница вовсе не существует.</p>
        <div className={styles.ButtonGroup}>
          <Button 
            type="Primary" 
            text="Вернуться назад" 
            action="button" 
            onClick={() => window.history.back()}
            size="medium"
          />
          <LinkedButton
            type="Transparent" 
            text="Сообщить"
            href={'https://github.com/caseapia/trainingchecker/issues/new?assignees=caseapia&labels=&projects=&template=%D0%BE%D1%82%D1%87%D0%B5%D1%82-%D0%BE%D0%B1-%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B5.md&title=%5B%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%5D+%2A%D0%9A%D0%A0%D0%90%D0%A2%D0%9A%D0%9E+%D0%9E%D0%9F%D0%98%D0%A8%D0%98%D0%A2%D0%95+%D0%9E%D0%A8%D0%98%D0%91%D0%9A%D0%A3%2A'}
            target="_blank"
            size="medium"
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
