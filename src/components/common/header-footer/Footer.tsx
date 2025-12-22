import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#" className={styles.link}>О нас</a>
        <a href="#" className={styles.link}>Наши контакты</a>
        <a href="#" className={styles.link}>Политика конфиденциальности</a>
      </div>

      <div className={styles.icons}>
        <div className={`${styles.icon} ${styles.vk}`}>V</div>
        <div className={`${styles.icon} ${styles.telegram}`}>T</div>
        <div className={`${styles.icon} ${styles.whatsapp}`}>W</div>
      </div>

      <div className={styles.copyright}>
        ©2025 KuKuda
      </div>
    </footer>
  );
}
