import { ProfileContent } from '@/components/profile/ProfileContent' 
import { user } from '@/types'
import React from 'react'

import { getUserByID } from '@/lib/api/user-api'
interface PageProps {
params: { id: string }
}

async function AccountIdPage({ params }: PageProps) {
    // const result = await getUserByID(params.id);
    // if (!result.ok) {
    // return (
    //     <div>
    //       Ошибка загрузки: {result.error.message}
    //     </div>

    // );

  //}
    return (
        // <ProfileContent user = {result.data}/>
        <ProfileContent user = {user}/>
    )
}

export default AccountIdPage


