export function loginHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOGIN_HAS_ERRORED':
      return action.hasErrored;
    case 'LOGIN_REQUESTED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function loginIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOGIN_IS_LOADING':
      return action.isLoading;
    case 'LOGIN_REQUESTED':
      return action.isLoading;
    default:
      return state;
  }
}

export function loginErrorMessage(state = '', action) {
  switch (action.type) {
    case 'LOGIN_ERROR_MESSAGE':
      return action.loginErrorMessage;
    case 'LOGIN_REQUESTED':
      return action.loginErrorMessage;
    default:
      return state;
  }
}


export function user(state = [], action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.user;
    default:
      return state;
  }
}

export function authenticated(state = false, action) {
  switch (action.type) {
    case 'AUTHENTICATED':
      return action.authenticated;
    default:
      return state;
  }
}

export function metaMask(state = false, action) {
  switch (action.type) {
    case 'METAMASKCONNECTED':
      return action.metaMask;
    default:
      return state;
  }
}