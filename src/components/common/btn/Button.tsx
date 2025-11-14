import React from 'react'
import styles from "./Button.module.css"
import Link from 'next/link';

interface ButtonProps{
  name: string,
  func_type: 'link_type' | 'submit' | 'reset' | 'create_event' | 'edit_profile' 
  href_btn?: string,
  style?: 'purple' | 'gray'
}

function Button({name, func_type, href_btn, style}: ButtonProps) {
  return (
    <>
    {func_type == 'link_type' && href_btn != null ?  
      <Link href={href_btn}>
      <Btn name={name} func_type={func_type} style={style}/>
      </Link>
      :
      <Btn name={name} func_type={func_type} style={style}/>
    }
    </>
  )
}

export default Button

const handleClick = () => {
    console.log('Button clicked!');
};

function Btn({name, func_type, style}: ButtonProps){
  return(
    <>
    {style == 'gray' ? 
      <div className={styles.gray_btn} onClick={handleClick}>
        {name}
      </div>
      :
      <div className={styles.purple_btn} onClick={handleClick}>
        {name}
      </div>
    }
    </>
    
  )
}