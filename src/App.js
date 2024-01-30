import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RollButton from './Button/RollButton';
import ResultCard from './Button/ResultCard';
import './App.css';

const AppHeader = () => {
  return (
    <>
      <header>
        <h2>간장되게 나누기</h2>
        <hr />
      </header>
    </>
  );
};

function App() {
  const [membersText, setMembersText] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const handleTextFieldChange = (event) => {
    setMembersText(event.target.value);
  };

  const handleRollButtonClick = () => {
    const membersArray = membersText.split('\n');

    //팀 섞기
    const shuffleMembers = membersArray.sort(() => Math.random() - 0.5);
    const middleIndex = Math.ceil(shuffleMembers.length / 2);

    const team1 = shuffleMembers.slice(0, middleIndex);
    const team2 = shuffleMembers.slice(middleIndex);

    setTeam1(team1);
    setTeam2(team2);
  };

  return (
    <>
      <AppHeader />
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          '& .MuiTextField-root': {
            m: 1,
            width: '300px',
            height: '300px',
            marginTop: '50px',
            marginLeft: '50px',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="loltextfield"
          label="여따가 적으시오"
          placeholder="10명 적으세요"
          multiline
          variant="filled"
          rows={10}
          value={membersText}
          onChange={handleTextFieldChange}
        />
        <ResultCard teamName="블루 팀" members={team1} />
        <ResultCard teamName="레드 팀" members={team2} />
      </Box>
      <RollButton onClick={handleRollButtonClick} />
    </>
  );
}

export default App;
