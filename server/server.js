const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
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

    // Upon connection identify the connection with username
    // socket.data can contain anything you want
    socket.on('setUsername', username => {
        socket.data.username = username;
    })

    // Get stats when navigating to stats page
    socket.on('getStats', async () => {
        // Personal player stats
        const playerStats = await User.getPlayerStats(socket.data.username)

        // All other player stats
        const allPlayerStats = await User.getAllPlayerStats()
        allPlayerStats.sort(function (playerA, playerB) {
            return playerA['gameInfo']['totalScore'] - playerB['gameInfo']['totalScore'];
        }).reverse()
        socket.emit('sendStats', {
            totalGames: playerStats.totalGames,
            totalScore: playerStats.totalScore,
            totalWins: playerStats.totalWins,
            totalLosses: playerStats.totalLosses,
            totalDraws: playerStats.totalDraws,
            // Grab just the top 3 players (by score)
            topPlayers: allPlayerStats.slice(0, 3)
        })
    })

    // Sending out challenge request from challenge page
    // This will lock the user's screen until they respond
    socket.on('sendRequestChallenge', data => {
        socket.data['challengePending'] = true;
        socket.data['challengeData'] = {

        };
        io.fetchSockets()
            .then(sockets => {
                // Set challenge pending on socket data and send the challenge to the correct user
                sockets.forEach(s => s.data.username === data.responderUsername && !s.data.username['challengePending'] ? s.emit('sentChallenge', data) : null)
                sockets.forEach(s => s.data.username === data.responderUsername && !s.data.username['challengePending'] ? s.data['challengePending'] = true : null)
            })
    })

    // Responding to challenge request
    socket.on('challengeResponse', async (data, response) => {

        // If Challenge accepted start the game
        if (response) {
            
            // Init game values
            let timeLeft = 11;
            let questionIndex = 0;
            let answers;

            // Get the questions and answers from external API
            const quizData = await fetchQuestions(data.category, data.difficulty);

            // Generate random UUID for room ID
            const roomId = uuidv4();
            io.fetchSockets()
                .then(sockets => {
                    sockets.forEach(s => s.data.username === data.responderUsername ? s.emit('sentChallenge', data) : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['challengePending'] = false : null)
                    sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['inGame'] = true : null)
                })
            io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.join(roomId) : null
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.emit("gameStarted", { category: data.category, difficulty: data.difficulty, gameRoom: roomId }) : null
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['currScore'] = 0 : null
                    s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['gameDifficulty'] = data.difficulty : null
                }))
            
            // Intervals of 1 second
            const gameTick = setInterval(() => {
                // Once timer reaches zero, go to the next question
                if (timeLeft === 0) {
                    questionIndex++;

                    // If no more questions then end the game
                    if (questionIndex === quizData.length) {
                        io.fetchSockets()
                            .then(sockets => sockets.filter(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername))
                            .then(filteredSockets => {
                                User.updateGameInfo('totalScore', filteredSockets[0].data.currScore, filteredSockets[0].data.username)
                                User.updateGameInfo('totalScore', filteredSockets[1].data.currScore, filteredSockets[1].data.username)

                                User.updateGameInfo('totalGames', 1, filteredSockets[0].data.username)
                                User.updateGameInfo('totalGames', 1, filteredSockets[1].data.username)

                                if (filteredSockets[0].data.currScore === filteredSockets[1].data.currScore) {
                                    User.updateGameInfo('totalDraws', 1, filteredSockets[0].data.username)
                                    User.updateGameInfo('totalDraws', 1, filteredSockets[1].data.username)
                                    io.to(roomId).emit("gameOver", null, null, true);
                                    clearInterval(gameTick);

                                } else if (filteredSockets[0].data.currScore > filteredSockets[1].data.currScore) {
                                    User.updateGameInfo('totalWins', 1, filteredSockets[0].data.username)
                                    User.updateGameInfo('totalLosses', 1, filteredSockets[1].data.username)
                                    io.to(roomId).emit("gameOver", filteredSockets[0].data.username, filteredSockets[1].data.username, false);
                                    clearInterval(gameTick);

                                } else {
                                    User.updateGameInfo('totalWins', 1, filteredSockets[1].data.username)
                                    User.updateGameInfo('totalLosses', 1, filteredSockets[0].data.username)
                                    io.to(roomId).emit("gameOver", filteredSockets[1].data.username, filteredSockets[0].data.username, false);
                                    clearInterval(gameTick);
                                }
                            })
                    } else {
                        // Otherwise continue, reset the timer
                        timeLeft = 11;
                    }
                }

                // If at the start of the timer, set the socket's correct answer for both players
                if (timeLeft === 11) {
                    io.fetchSockets()
                        .then(sockets => {
                            sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['correct'] = quizData[questionIndex].correct_answer : null)
                        })

                    // Mix in correct answer with incorrect ones
                    quizData[questionIndex].incorrect_answers.push(quizData[questionIndex].correct_answer);

                    // Shuffle them around
                    answers = shuffleAnswers(quizData[questionIndex].incorrect_answers);

                    // Send out the questions to the players in the room
                    io.to(roomId).emit("sendQuestion", {
                        question: quizData[questionIndex].question,
                        answers: answers
                    })
                }

                // Take 1 second off timer
                timeLeft--;
                io.fetchSockets()
                    .then(sockets => {
                        // Update time left on socket data
                        sockets.forEach(s => s.data.username === data.responderUsername || s.data.username === data.requesterUsername ? s.data['timeLeft'] = timeLeft : null)
                    })
                // Update timers of all players in the room, client side
                io.to(roomId).emit("tickTimer", timeLeft)
            }, 300)

        // Challenge request rejected
        } else {
            io.fetchSockets()
                .then(sockets => sockets.forEach(s => {
                    // Send back to original challenger
                    s.data.username === data.requesterUsername ? s.emit("challengeNotAccepted", null) : null
                }))
        }
    })

    // When a user clicks on an answer, ask for the correct answer
    socket.on("checkAnswer", data => {
        socket.emit("validatedAnswer", socket.data['correct'])
    })

    // If the click answer is correct, calculate the score to add
    socket.on("correctAnswer", username => {

        // Different point multipliers for different difficulties
        const difficultyMulti = {
            'easy': 1, // Easy is 100%
            'medium': 1.5, // Medium is 150% 
            'hard': 2 // Hard is 200%
        }
        io.fetchSockets()
            .then(sockets => sockets.forEach(s => {

                // Calculate and update the score on client side
                // Time taken to answer and the difficulty are taken into account
                s.data.username === username ? s.data['currScore'] += (Math.floor((s.data['timeLeft'] / 10) * difficultyMulti[`${s.data.gameDifficulty}`] * 10)) : null
                s.data.username === username ? s.emit('sendScore', s.data['currScore']) : null
            }))
    })

    // Grab all the usernames that are online on the website right now
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

// Serve up React build
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Logging in/Registration/Validation of JWT
app.use(authRoutes);

module.exports = server;
