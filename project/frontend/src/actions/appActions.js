export const setInputA = value => ({
  type: 'SET_INPUT_A',
  value: value,
});

export const setInputB = value => ({
  type: 'SET_INPUT_B',
  value: value,
});

export const validInputA = isValid => ({
  type: 'VALID_A',
  value: isValid,
});

export const validInputB = isValid => ({
  type: 'VALID_B',
  value: isValid,
});

export const setPointA = name => ({
  type: 'SET_POINT_A',
  value: name,
});

export const setPointB = name => ({
  type: 'SET_POINT_B',
  value: name,
});

export const setDistance = distance => ({
  type: 'SET_DISTANCE',
  value: distance,
});
