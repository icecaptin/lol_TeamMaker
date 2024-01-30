import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ResultCard = ({ teamName, members }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {teamName}
                </Typography>
                {members.map((member, index) => (
                    <Typography key={index} variant="body2" component="p">
                        {member}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default ResultCard;
