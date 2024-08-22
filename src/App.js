import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RollButton from './Button/RollButton';
import './App.css';
import ResultCard from './Button/ResultCard';
// import axios from 'axios';

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
  const [serverTime, setServerTime] = useState('');

  // useEffect(() => {
  //   const fetchServerTime = async () => {
  //     try {
  //       const response = await axios.get('https://www.ticketlink.co.kr', {
  //         headers: {
  //           'Content-Type': 'text/html',
  //         },
  //       });
  //       const doc = parser.parseFromString(response.data, 'text/html');
  //       const timeElement = doc.querySelector('#server-time');

  //       if (timeElement) {
  //         setServerTime(timeElement.textContent);
  //       } else {
  //         console.error('서버 시간 정보를 찾을 수 없습니다.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching server time:', error);
  //     }
  //   };

  //   fetchServerTime();
  // }, []);


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
      shuffleTeamsWithConstraints();
      shuffleTeams3sec();
    }
  };

  const checkForDuplicates = () => {
    const uniqueMembers = new Set(membersText.filter(member => member.trim() !== ''));
    return membersText.length !== uniqueMembers.size;
  };

  const shuffleTeamsWithConstraints = () => {
    let validTeams = false;
    while (!validTeams) {
      const membersArray = membersText.filter(member => member.trim() !== '');

      const shuffleMembers = membersArray.sort(() => Math.random() - 0.5);
      const middleIndex = Math.ceil(shuffleMembers.length / 2);

      const team1 = shuffleMembers.slice(0, middleIndex);
      const team2 = shuffleMembers.slice(middleIndex);

      if (!team1.includes('귤') || !team1.includes('브레이커')) {
        setTeam1(team1);
        setTeam2(team2);
        validTeams = true;
      }
    }
  };


  const shuffleTeams3sec = () => {
    const iterations = 30;
    let count = 0;

    const intervalId = setInterval(() => {
      if (count >= iterations) {
        clearInterval(intervalId);
        return;
      }

      shuffleTeamsWithConstraints();
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

      <Box>
        <h1>현재 Ticketlink 서버 시간:</h1>
        <p>{serverTime}</p>
      </Box>
    </>
  );
}

export default App;
