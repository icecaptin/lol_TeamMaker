import React from 'react';
import Button from '@mui/material/Button';
import Styles from './RollButton.module.css';

const RollButtonRandom = ({ onClick }) => {
    return (
        <Button variant="contained" className={Styles.rollButton} onClick={onClick}>간장되게 나누기</Button>
    );
}

export default RollButtonRandom;