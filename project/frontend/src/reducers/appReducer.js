const initialState = {
  inputA: {
    value: '',
    isValid: null,
  },
  inputB: {
    value: '',
    isValid: null,
  },
  pointA: {
    location: null,
    geo: null,
  },
  pointB: {
    location: null,
    geo: null,
  },
  distance: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INPUT_A': {
      return {...state, inputA: {...state.inputA, value: action.value}};
    }
    case 'SET_INPUT_B': {
      return {...state, inputB: {...state.inputB, value: action.value}};
    }
    case 'VALID_A': {
      return {...state, inputA: {...state.inputA, isValid: action.value}};
    }
    case 'VALID_B': {
      return {...state, inputB: {...state.inputB, isValid: action.value}};
    }
    case 'SET_POINT_A': {
      return {...state, pointA: action.value};
    }
    case 'SET_POINT_B': {
      return {...state, pointB: action.value};
    }
    case 'SET_DISTANCE': {
      return {...state, distance: action.value};
    }
    default:
      return state;
  }
};

export default appReducer;
