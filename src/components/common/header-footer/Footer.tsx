import React from 'react'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_info}>
        <div className={styles.link_names}>О нас</div>
        <div className={styles.link_names}>Наши контакты</div>
        <div className={styles.link_names}>Политика конфиденциальности</div>
        <div className={styles.contact_icons}>
          <div className={styles.vk}>V</div>
          <div className={styles.telegram}>T</div>
          <div className={styles.whatsapp}>W</div>
        </div>
        <div className={styles.copyright}>
          ©2025 KuKuda
        </div>
      </div>
    </div>
  )
}
