import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  block: {
    height: 20,
  },
  label: {
    float: 'left',
    display: 'block',
  },
  value: {
    paddingLeft: 5,
    color: 'grey',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

const PointInfo = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.block}>
        <span className={classes.label}>Location:</span>
        <span className={classes.value}>{props.location || '...'}</span>
      </div>
      <div className={classes.block}>
        <span className={classes.label}>Geo:</span>
        <span className={classes.value}>{props.geo || '...'}</span>
      </div>
    </>
  );
};

export default PointInfo;
