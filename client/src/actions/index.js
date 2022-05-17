const loadSocket = socket => ({ type: 'SET_SOCKET_CONN', payload: socket });
const loadUsername = username => ({ type: 'SET_USERNAME', payload: username });
const loadChallengePending = challengePending => ({ type: 'SET_CHALLENGE_PENDING', payload: challengePending});

export const setSocket = socket => {
    return async dispatch => {
        dispatch(loadSocket(socket));
    };
};
<<<<<<< HEAD

export const setUsername = username => {
    return async dispatch => {
        dispatch(loadUsername(username));
    };
};

export const setChallengePending = challengePending => {
    return async dispatch => {
        dispatch(loadChallengePending(challengePending));
    };
};
=======
>>>>>>> 823a1109ec859b3ec126aa46417e7322bb98de49
