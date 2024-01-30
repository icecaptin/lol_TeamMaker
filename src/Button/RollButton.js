import React from 'react';
import Button from '@mui/material/Button';
import Styles from './RollButton.module.css';

const RollButton = ({ onClick }) => {
    return (
        <Button variant="contained" className={Styles.rollButton} onClick={onClick}>테스트</Button>
    );
}

export default RollButton;
