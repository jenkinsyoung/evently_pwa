import React from 'react'
import styles from "./DescBox.module.css"
export interface Description {
  icon: string;
  name: string;
  description: string;
}

interface DescriptionBox {
  desc: Description;
}

function DescBox( {desc}: DescriptionBox) {
  return (
    <div className={styles.box}>
        <div className={styles.icon}>
        <svg
          className="w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 22 22"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            d={desc.icon}
          />
        </svg>


        </div>
        <div className={styles.name}>
            {desc.name}
        </div>
        <div className={styles.description}>
            {desc.description}
        </div>
    </div>
  )
}

export default DescBox