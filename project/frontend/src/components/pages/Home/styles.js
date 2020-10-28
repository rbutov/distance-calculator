export const styles = theme => ({
  '@global': {
    'html, body': {
      margin: 0,
      padding: 0,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: '100vh',
    background: '#f5f8fa',
  },
  app: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  logo: {
    color: 'grey',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 21,
    display: 'block',
    '& svg': {
      fontSize: 60,
      color: '#4050b5',
      top: 20,
      position: 'relative',
    },
  },
  paper: {
    maxWidth: 550,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: 'green',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  distance: {
    paddingTop: 13,
    fontSize: 20,
  },
});
