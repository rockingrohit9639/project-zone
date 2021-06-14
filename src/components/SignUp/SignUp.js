import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { actions } from '../../reducer';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    height: "91vh" 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  image: {
    backgroundImage:
      "url(https://external-preview.redd.it/nWy4RIyzJvtfD4auPKg4Bq98sXMoffFuyOjioNoDkPk.jpg?auto=webp&s=48b0cc1113f6cbcc0c6be939edae4ee5d2f169cc)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [{ user,isAuthenticated}, dispatch] = useDataLayerValues();

  useEffect(() => {
    isAuthenticated && history.push("/");
  }, [isAuthenticated, history]);

  const [fields,setFields] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })

  const { firstName,lastName,email,password } = fields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    event.preventDefault();
    
    if (firstName === "") {
      toast.error('Please enter your First Name');
    } 
    else if (lastName === "") {
      toast.error('Please enter your Last Name');
    } 
    else if (email === "") {
      toast.error('Please enter your email ');
    } 
    else if (!emailTest.test(email)) {
      toast.error('Please enter a valid email');
    }
    else if (password === "") {
      toast.error('Please enter a secure password');
    }
    else if(password.length < 6 ){
      toast.error('Password should have at least 6 characters');
    } 
    else {
      const userData = {
        ...user,
        fname:firstName,
        lname: lastName,
        email: email,
        password:password
      };

      clearData();
      setUserAuth(userData);
    }
  };

  const clearData = () => {
    setFields({
      firstName:"",
      lastName:"",
      email:"",
      password:""
    });
  };

  const setUserAuth = (userData) => {

    dispatch({
      type: actions.SET_USER,
      user: userData,
    });

    dispatch({
      type: actions.SET_AUTH,
      isAuthenticated: true,
    });

    history.push("/");
  }

  return (
    <div className="signup">
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ToastContainer position="top-right" />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login" style={{textDecoration: "none"}}>
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
      </Grid>
    </div>
  );
}