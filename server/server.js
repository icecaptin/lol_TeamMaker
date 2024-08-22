// server.js
const express = require('express');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const app = express();
const port = 3001;

app.get('/api/time', async (req, res) => {
    try {
        const response = await axios.get('https://www.ticketlink.co.kr', {
            headers: {
                'Content-Type': 'text/html',
            },
        });

        // HTML을 파싱합니다.
        const dom = new JSDOM(response.data);
        const timeElement = dom.window.document.querySelector('#server-time'); // 예시로 #server-time 태그를 가정합니다.

        if (timeElement) {
            res.json({ time: timeElement.textContent });
        } else {
            res.status(500).send('서버 시간 정보를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('Error fetching server time:', error);
        res.status(500).send('Error fetching server time');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
