const loadSocket = socket => ({ type: 'SET_SOCKET_CONN', payload: socket });
const loadUsername = username => ({ type: 'SET_USERNAME', payload: username });
const toggleChallengePending = challengePending => ({ type: 'SET_CHALLENGE_PENDING', payload: challengePending});
const toggleRequestPending = requestPending => ({ type: 'SET_REQUEST_PENDING', payload: requestPending});
const toggleInGame = requestPending => ({ type: 'SET_IN_GAME', payload: inGame});

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

export const setRequestPending = requestPending => {
    return async dispatch => {
        dispatch(toggleRequestPending(requestPending));
    };
};

export const setInGame = inGame => {
    return async dispatch => {
        dispatch(toggleInGame(inGame));
    };
};

export const setChallengePending = challengePending => {
    return async dispatch => {
        dispatch(toggleChallengePending(challengePending));
    };
};

