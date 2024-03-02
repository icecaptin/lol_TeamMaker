import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RollButton from './Button/RollButton';
import './App.css';
import ResultCard from './Button/ResultCard';

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
  const [membersText, setMembersText] = useState([...Array(10)].map(() => ''));
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [duplicateMessage, setDuplicateMessage] = useState('');

  const handleTextFieldChange = (event, index) => {
    const newMembersText = [...membersText];
    newMembersText[index] = event.target.value;
    setMembersText(newMembersText);
  };

  const handleRollButtonClick = () => {
    if (checkForDuplicates()) {
      setDuplicateMessage("중복된 닉넴 있음!!");
    } else {
      setDuplicateMessage("");
      shuffleTeams();
      shuffleTeams3sec();
    }
  };

  const checkForDuplicates = () => {
    const uniqueMembers = new Set(membersText.filter(member => member.trim() !== ''));
    return membersText.length !== uniqueMembers.size;
  };

  const shuffleTeams = () => {
    const membersArray = membersText.filter(member => member.trim() !== '');

    const shuffleMembers = membersArray.sort(() => Math.random() - 0.5);
    const middleIndex = Math.ceil(shuffleMembers.length / 2);

    const team1 = shuffleMembers.slice(0, middleIndex);
    const team2 = shuffleMembers.slice(middleIndex);

    setTeam1(team1);
    setTeam2(team2);
  };

  const shuffleTeams3sec = () => {
    const iterations = 30;
    let count = 0;

    const intervalId = setInterval(() => {
      if (count >= iterations) {
        clearInterval(intervalId);
        return;
      }

      shuffleTeams();
      count++;
    }, 100);
  };

  return (
    <>
      <AppHeader />
      <Box style={{ display: 'flex' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', marginLeft: '50px', marginBottom: '50px' }}>
          {[...Array(10)].map((_, index) => (
            <TextField
              key={index}
              id={`loltextfield${index}`}
              variant="outlined"
              label="롤 닉네임"
              value={membersText[index]}
              onChange={(event) => handleTextFieldChange(event, index)}
              inputProps={{ maxLength: 18 }}
              sx={{ width: '332px', height: '30px', mb: '40px', boxSizing: 'border-box' }}
            />
          ))}
        </Box>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'row', marginLeft: '50px' }}>
          <ResultCard teamName="블루" members={team1} />
          <ResultCard teamName="레드" members={team2} />
          <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <RollButton onClick={handleRollButtonClick} />
            {duplicateMessage && <h2 style={{ color: 'red', marginLeft: '10px' }}>{duplicateMessage}</h2>}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
