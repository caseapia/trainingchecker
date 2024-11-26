"use client"
import { TbMoodSadFilled } from "react-icons/tb";
import styles from './not-found.module.scss';
import Button from "@/components/Buttons/Button";

const NotFound = () => {

  const report = () => window.open("https://forum.training-server.com/d/19854-training-checker-training-api-tolko-s-interfeysom", "_blank")

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.container}>
        <div className={styles.IconContainer}>
          <TbMoodSadFilled />
        </div>
        <h1>Эта страница не найдена</h1>
        <p>Мы не смогли найти эту страницу. Возможно, что-то поломалось или страница вовсе не существует.</p>
        <div className={styles.ButtonGroup}>
          <Button btnType="Primary" text="Вернуться назад" type="button" onClick={() => window.history.back()} />
          <Button btnType="Transparent" text="Сообщить" type="button" onClick={report} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
