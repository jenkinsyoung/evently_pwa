'use client';

import React, { MouseEvent, KeyboardEvent } from 'react';
import Link from 'next/link';
import styles from "./Button.module.css";

interface ButtonProps {
  name: string;
  func_type: 'link_type' | 'submit' | 'reset' | 'create_event' | 'edit_profile';
  href_btn?: string;
  style?: 'purple' | 'gray';
  onClick?: () => void;  // ✅ Только без параметров
}

const Button: React.FC<ButtonProps> = ({ 
  name, 
  func_type, 
  href_btn, 
  style = 'purple',
  onClick 
}) => {
  
  const handleClick = () => {
    onClick?.();  // ✅ Без параметров
  };

  if (func_type === 'link_type' && href_btn) {
    return (
      <Link href={href_btn} className="block">
        <Btn name={name} style={style} onClick={handleClick} />
      </Link>
    );
  }

  if (func_type === 'submit' || func_type === 'reset') {
    return (
      <button 
        type={func_type}
        className={style === 'gray' ? styles.gray_btn : styles.purple_btn}
        onClick={() => onClick?.()}
      >
        {name}
      </button>
    );
  }

  return (
    <div 
      className={style === 'gray' ? styles.gray_btn : styles.purple_btn}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();  // ✅ Без параметров
        }
      }}
    >
      {name}
    </div>
  );
};

interface BtnProps {
  name: string;
  style: 'purple' | 'gray';
  onClick: () => void;  // ✅ Обязательный, без параметров
}

const Btn: React.FC<BtnProps> = ({ name, style, onClick }) => {
  return (
    <div 
      className={style === 'gray' ? styles.gray_btn : styles.purple_btn}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();  // ✅ Без параметров
        }
      }}
    >
      {name}
    </div>
  );
};

export default Button;
