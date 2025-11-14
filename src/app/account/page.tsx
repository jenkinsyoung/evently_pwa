"use client"

import Button from '@/components/common/btn/Button'
import React from 'react'
import styles from '@/styles/pages/ProfilePage.module.css'
import {user} from '@/types'

function AccountPage() {
  return (
    <ProfileContent />
  )
}

export default AccountPage


function ProfileContent(){
    return(
        <div className={styles.content}>
            <div className={styles.about}>
                <div className={styles.main_info}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${user.avatar})`}}/>
                    <div >
                        <div className={styles.nickname}>
                        {user.firstName} {user.lastName}
                        </div>
                        <div className={styles.location}>
                            {user.location}
                        </div>
                        <div className={styles.followers}>
                            {0} подписчиков ● {0} подписок
                        </div>
                    </div>
                </div>
                <div className={styles.act_btns}>
                    <Button name = 'Создать событие' func_type = 'create_event' style='gray'/>
                    <Button name = 'Редактировать профиль' func_type = 'edit_profile'/>
                </div>
                <div className={styles.about_info}>
                    {user.bio} 
                </div>
            </div>


        </div>
    )
}