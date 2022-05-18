const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const { requireAuth, jwt } = require('./middleware/authMiddleware');
const { fetchQuestions, shuffleAnswers } = require('./models/Quiz');
const bodyParser = require("body-parser");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: "*" }
});
const authRoutes = require('./routes/authRoutes');

let usersOnline = 0;

io.on('connection', (socket) => {
    usersOnline++;
    socket.on('setUsername', username => {
        socket.data.username = username;
    })

    socket.on('sendRequestChallenge', data => {
        socket.data['challengePending'] = true;
        io.fetchSockets()
            .then(sockets => {
                sockets.forEach(s => s.data.username === data.responderUsername ? s.emit('sentChallenge', data) : null)
                sockets.forEach(s => s.data.username === data.responderUsername ? s.data['challengePending'] = true : null)
            })
    })

    socket.on('challengeResponse', response => {
        if (response.accepted) {

            let timeLeft = 10;
            let questionIndex = 0;

            const quizData = fetchQuestions(response.category);

            const roomId = uuidv4();
            io.fetchSockets()
                .then(sockets => {
                    sockets.forEach(s => s.data.username === data.responderUsername ? s.emit('sentChallenge', data) : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['challengePending'] = false : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['inGame'] = true : null)
                })
            io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    s.data.username === response.responderUsername || s.data.username === response.requesterUsername ? s.join(roomId) : null
                    s.data.username === response.responderUsername || s.data.username === response.requesterUsername ? s.emit("gameStarted", { category: response.category, difficulty: response.difficulty, gameRoom: roomId }) : null
                }))

            io.on("checkAnswer", (clientRoomId, username) => {clientRoomId === roomId ? io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    s.data.username === username ? s.emit("validatedAnswer", quizData[questionIndex].correct_answer) : null
                })) : null})
            
            setInterval(() => {
                if (timeLeft === 10){
                    io.to(roomId).emit("sendQuestion", )
                }
                timeLeft--;
                if(timeLeft < 0){
                    questionIndex++;
                    timeLeft = 10;
                }
                io.to(roomId).emit("tickTimer", timeLeft)
            })

        } else {
            io.fetchSockets()
            .then(sockets => sockets.forEach(s => {
                s.data.username === response.requesterUsername ? s.emit("challengeNotAccepted", null) : null
            }))
        }
    })

    socket.on('getOnlineUsers', data => {
        io.fetchSockets().then(sockets => socket.emit('sendOnlineUsers', sockets.filter(s => s.data.username !== socket.data.username).map(s => s.data.username)))
    })

    //socket.on('respondChallenge') -- Create a room and place both users inside
})

//Middleware
app.use(cors('*'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/example', requireAuth, (req, res) => {
    const token = req.headers.cookie.split('=')[1];
    const decodedToken = jwt.decode(token);

    io.fetchSockets().then(sockets => console.log(sockets.length));
});

app.use(authRoutes);

module.exports = server;
