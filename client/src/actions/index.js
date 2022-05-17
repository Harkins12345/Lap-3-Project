const loadSocket = socket => ({ type: 'SET_SOCKET_CONN', payload: socket });
const loadUsername = username => ({ type: 'SET_USERNAME', payload: username });
const loadChallengePending = challengePending => ({ type: 'SET_CHALLENGE_PENDING', payload: challengePending});

export const setSocket = socket => {
    return async dispatch => {
        dispatch(loadSocket(socket));
    };
};

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