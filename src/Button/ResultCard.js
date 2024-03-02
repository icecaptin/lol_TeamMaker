import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ResultCard = ({ teamName, members }) => {
    return (
        <Card sx={{ width: 200, height: 400, marginRight: '15px' }}>
            <CardContent>
                <Typography variant="h4" component="div" style={{ color: teamName === '블루' ? 'blue' : 'red', marginBottom: '30px' }}>
                    {teamName} Team
                </Typography>
                {members.map((member, index) => (
                    <Typography key={index} variant="body2" component="p" fontSize="25px">
                        {member}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default ResultCard;
