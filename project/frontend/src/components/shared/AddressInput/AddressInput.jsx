import React from 'react';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {styles} from './styles';

const useStyles = makeStyles(styles);

const AddressInput = props => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      error={props.error || false}
      value={props.value}
      placeholder={props.placeholder || ''}
      label={props.label || ''}
      onChange={({target: {value: v}}) => props.onChange(props.name, v)}
      helperText={props.error ? 'Not valid Geo or Location' : ''}
    />
  );
};

export default AddressInput;
