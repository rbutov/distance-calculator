import React, {useCallback, useState} from 'react';
import {Button, Paper, makeStyles, Grid} from '@material-ui/core';
import AddressInput from '../../shared/AddressInput';
import ExploreIcon from '@material-ui/icons/Explore';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
import {
  setDistance,
  setInputA,
  setInputB,
  setPointA,
  setPointB,
  validInputA,
  validInputB,
} from '../../../actions/appActions';
import PointInfo from '../../shared/PointInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import {calculateDistance} from '../../../services/api';
import {validateGeo} from '../../../helpers/geo';

const useStyles = makeStyles(styles);

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const inputA = useSelector(state => state.app.inputA);
  const inputB = useSelector(state => state.app.inputB);
  const pointA = useSelector(state => state.app.pointA);
  const pointB = useSelector(state => state.app.pointB);
  const distance = useSelector(state => state.app.distance);

  const onInputChange = useCallback(
    (type, value) => {
      if (type === 'a') {
        dispatch(setInputA(value));
      } else {
        dispatch(setInputB(value));
      }
    },
    [dispatch],
  );

  const onCalculate = () => {
    setIsLoading(true);

    Promise.all([
      validateGeo(dispatch, inputA.value, setPointA, validInputA),
      validateGeo(dispatch, inputB.value, setPointB, validInputB),
    ])
      .then(results => {
        calculateDistance(results[0], results[1])
          .then(res => {
            dispatch(setDistance(res));
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.app}>
        <span className={classes.logo}>
          <ExploreIcon /> Distance Calculator
        </span>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <AddressInput
                name={'a'}
                value={inputA.value}
                error={inputA.isValid === false}
                onChange={onInputChange}
                label={'Point One'}
                placeholder={'Enter you value'}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <AddressInput
                name={'b'}
                value={inputB.value}
                error={inputB.isValid === false}
                onChange={onInputChange}
                label={'Point Two'}
                placeholder={'Enter you value'}
              />
            </Grid>
            {pointA.location || pointB.location ? (
              <Grid item sm={12} xs={12}>
                <Grid container>
                  {pointA.location ? (
                    <Grid item sm={6} xs={12}>
                      <PointInfo location={pointA.location} geo={pointA.geo} />
                    </Grid>
                  ) : (
                    ''
                  )}
                  {pointB.location ? (
                    <Grid item sm={6} xs={12}>
                      <PointInfo location={pointB.location} geo={pointB.geo} />
                    </Grid>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
            ) : (
              ''
            )}
            {distance !== null ? (
              <Grid item sm={8} xs={12}>
                <div className={classes.distance}>
                  <span>Distance is: </span>
                  <b className={classes.distance}>{distance}</b>
                  <span> miles</span>
                </div>
              </Grid>
            ) : (
              <Grid item sm={4} xs={12} />
            )}
            <Grid item sm={4} xs={12}>
              <div className={classes.wrapper}>
                <Button
                  className={classes.button}
                  onClick={onCalculate}
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  Calculate
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
