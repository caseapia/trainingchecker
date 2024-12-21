"use client"
import MoodSadIcon from '@/icons/page-not-found/moodSad.svg';
import styles from './not-found.module.scss';
import Button from "@/components/Buttons/Button";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const NotFound = () => {

  const report = () => window.open("https://forum.training-server.com/d/19854-training-checker-training-api-tolko-s-interfeysom", "_blank")

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
          />
          <Button 
            type="Transparent" 
            text="Сообщить" 
            action="button" 
            onClick={report} 
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
