'use client';

import React from 'react';

import styles from './Button.module.css';

const TestButton = ({onCreateClick}: {onCreateClick: () => void}) => {
  return (
    <button onClick={() => onCreateClick()} className={styles.button}>
      TEST BUTTON
    </button>
  );
};

export default TestButton;