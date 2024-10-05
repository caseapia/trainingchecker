import styles from './Header.module.scss';

export default function() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__text}>
                <a 
                href="https://forum.training-server.com/d/19854-training-checker-training-api-tolko-s-interfeysom" 
                target="_blank" 
                rel="noopener noreferrer">
                    TRAINING <span className={styles.header__red}>CHECKER</span>
                </a>
            </h1>
            <h4 className={styles.header__list}>
                <a href="../">Главная</a>
                <a href="">Список администраторов</a>
            </h4>
        </header>
    )
}