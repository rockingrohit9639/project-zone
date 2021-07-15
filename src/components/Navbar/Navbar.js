import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import logo from "../Footer/icon.png";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { Switch as ToggleSwitch } from "antd";
import { useDataLayerValues } from "../../datalayer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  name: {
    fontFamily: "Poppins",
    color: "#fff",
    textDecoration: "none",
    marginTop: 3,
    fontSize: "calc(1rem + 1vw)",
    fontWeight: "700",
    "&:hover": {
      color: "#fff",
    },
  },
  text: {
    fontFamily: "Poppins",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      color: "#6c6be8",
    },
  },
  button: {
    color: "#fff",
    margin: "0 3px",
    fontWeight: "700",
    textDecoration: "none",
    fontFamily: "Poppins",
    "&:hover": {
      color: "#6c6be8",
      backgroundColor: "#fff",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiListItemIcon-root": {
      minWidth: "30px",
    },
    "& .MuiButton-root": {
      color: "#FFF !important",
    },
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: "#5352ed",
    },
    "&:focus": {
      backgroundColor: "#6c6be8",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    "&:hover": {
      backgroundColor: "#6c6be8",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function Navbar({ themeToggler }) {
  const classes = useStyles();
  const [{ isAuthenticated, user }, dispatch] = useDataLayerValues();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  // Login for Menu Handling
  const muitheme = useTheme();
  const isMobile = useMediaQuery(muitheme.breakpoints.down("sm"));
  const logoutHandler = async () => {
    localStorage.removeItem("tokken");
    const userData = {
      ...user,
      fname: "",
      lname: "",
      email: "",
      password: "password",
    };
    dispatch({
      type: "SET_AUTH",
      isAuthenticated: false,
    });
    dispatch({
      type: "SET_USER",
      user: userData,
    });
    history.push("/");
  };
  return (
    <div>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#6f6ee1", boxShadow: "none" }}
      >
        <Toolbar className="NavWithToggleSwitch">
          <div className="NavHeading">
            <Typography variant="h4">
              <Link to="/" className={classes.name}>
                <img src={logo} alt="logo" className="logo" />
                Project Zone
              </Link>
            </Typography>
          </div>
          <div className="links">
            {isMobile ? (
              <>
                <Button onClick={handleClick}>
                  <MenuIcon />
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <i className="fa fa-home"></i>
                      </ListItemIcon>
                      <ListItemText primary="Home"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  {isAuthenticated ? (
                    <Link to={`/profile/${user.userid}`} onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemIcon>
                          <i className="fa fa-user-circle-o"></i>
                        </ListItemIcon>
                        <ListItemText
                          primary={`Welcome ${user.fname}`}
                        ></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                  <Link to="/projects" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <i className="fa fa-file"></i>
                      </ListItemIcon>
                      <ListItemText primary="Find Projects"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  {!isAuthenticated ? (
                    <Link to="/login" onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemIcon>
                          <i className="fa fa-sign-in"></i>
                        </ListItemIcon>
                        <ListItemText primary="Login/Sign up"></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                  <Link to="/about" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <i className="fa fa-users"></i>
                      </ListItemIcon>
                      <ListItemText primary="About"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  {isAuthenticated ? (
                    <Link to="/addnew" onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemIcon>
                          <i className="fa fa-plus"></i>
                        </ListItemIcon>
                        <ListItemText primary="Add New Project"></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                  {isAuthenticated ? (
                    <Link to="/contact" onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemIcon>
                          <i className="fa fa-id-badge"></i>
                        </ListItemIcon>
                        <ListItemText primary="Contact Us"></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                </StyledMenu>
              </>
            ) : (
              <>
                <div>
                  <Button className={classes.button}>
                    <Link to="/" className={classes.text}>
                      <i className="fa fa-home"></i>Home
                    </Link>
                  </Button>
                </div>
                {isAuthenticated ? (
                  <Button className={classes.button}>
                    <Link
                      style={{ marginBottom: "0.4rem" }}
                      to={`/profile/${user.userid}`}
                      className={classes.text}
                    >
                      <i className="fa fa-user-circle-o"></i> Welcome{" "}
                      {user.fname}
                    </Link>
                  </Button>
                ) : null}
                <div>
                  <Button className={classes.button}>
                    <Link to="/about" className={classes.text}>
                      <i className="fa fa-users"></i> About
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button className={classes.button}>
                    <Link to="/projects" className={classes.text}>
                      <i className="fa fa-file"></i>Find Projects
                    </Link>
                  </Button>
                </div>
                {isAuthenticated ? (
                  <div>
                    <Button className={classes.button}>
                      <Link to="/addnew" className={classes.text}>
                        <i className="fa fa-plus"></i>Add New Project
                      </Link>
                    </Button>
                  </div>
                ) : null}
                {isAuthenticated ? (
                  <div>
                    <Button className={classes.button}>
                      <Link to="/contact" className={classes.text}>
                        <i className="fa fa-id-badge"></i>Contact Us
                      </Link>
                    </Button>
                  </div>
                ) : null}
                {!isAuthenticated ? (
                  <Link to="/login" className="lobut">
                    <i className="fa fa-sign-in"></i>Login
                  </Link>
                ) : (
                  <>
                    <h4 className="lobut" onClick={logoutHandler}>
                      Logout
                    </h4>
                  </>
                )}
              </>
            )}
            <div style={{ marginRight: "5px", marginTop: "5px" }}>
              <ToggleSwitch
                onClick={() => themeToggler()}
                className="toggleBtn"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
