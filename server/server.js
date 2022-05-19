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
        socket.data['challengeData'] = {

        };
        io.fetchSockets()
            .then(sockets => {
                sockets.forEach(s => s.data.username === data.responderUsername && !s.data.username['challengePending'] ? s.emit('sentChallenge', data) : null)
                sockets.forEach(s => s.data.username === data.responderUsername && !s.data.username['challengePending'] ? s.data['challengePending'] = true : null)
            })
    })

    socket.on('challengeResponse', async (data, response) => {
        if (response) {

            let timeLeft = 11;
            let questionIndex = 0;
            let answers;

            const quizData = await fetchQuestions(data.category, data.difficulty);

            const roomId = uuidv4();
            io.fetchSockets()
                .then(sockets => {
                    sockets.forEach(s => s.data.username === data.responderUsername ? s.emit('sentChallenge', data) : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['challengePending'] = false : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['inGame'] = true : null)
                })
            io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    console.log('Starting game...')
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.join(roomId) : null
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.emit("gameStarted", { category: data.category, difficulty: data.difficulty, gameRoom: roomId }) : null
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['currScore'] = 0 : null
                }))

            setInterval(() => {
                if (timeLeft === 0) {
                    questionIndex++;
                    timeLeft = 11;
                }
                if (timeLeft === 11) {
                    io.fetchSockets()
                        .then(sockets => {
                            sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['correct'] = quizData[questionIndex].correct_answer : null)
                        })
                    quizData[questionIndex].incorrect_answers.push(quizData[questionIndex].correct_answer);
                    answers = shuffleAnswers(quizData[questionIndex].incorrect_answers);
                    io.to(roomId).emit("sendQuestion", {
                        question: quizData[questionIndex].question,
                        answers: answers
                    })
                }
                timeLeft--;
                io.fetchSockets()
                    .then(sockets => {
                        sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['timeLeft'] = timeLeft : null)
                    })
                io.to(roomId).emit("tickTimer", timeLeft)
            }, 1000)

        } else {
            io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    s.data.username === data.requesterUsername ? s.emit("challengeNotAccepted", null) : null
                }))
        }
    })

    socket.on("checkAnswer", data => {
        console.log('Sending answer...')
        socket.emit("validatedAnswer", socket.data['correct'])
    })

    //socket.on("")

    socket.on('getOnlineUsers', data => {
        io.fetchSockets().then(sockets => io.emit('sendOnlineUsers', sockets.filter(s => s.data.username).map(s => s.data.username)))
    })
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

app.use(authRoutes);

module.exports = server;
