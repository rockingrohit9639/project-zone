import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  ListItemText,
  Button,
} from "@material-ui/core";
import logo from "../Footer/icon.png";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
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
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      color: "#6c6be8",
    },
  },
  button: {
    color: "#fff",
    margin: "0 5px",
    fontWeight: "700",
    textDecoration: "none",
    fontFamily: "QuickSand",
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
  const [{ isAuthenticated, user }] = useDataLayerValues();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Login for Menu Handling
  const muitheme = useTheme();
  const isMobile = useMediaQuery(muitheme.breakpoints.down("sm"));

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
                  {isAuthenticated ? (
                    <Link to="/dashboard" onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemText
                          primary={`Welcome ${user.fname} to Dashboard`}
                        ></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                  <Link to="/" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemText primary="Home"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link to="/projects" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemText primary="Find Projects"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  {!isAuthenticated ? (
                    <Link to="/login" onClick={handleClose}>
                      <StyledMenuItem>
                        <ListItemText primary="Login/Sign up"></ListItemText>
                      </StyledMenuItem>
                    </Link>
                  ) : null}
                  <Link to="/about" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemText primary="About"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link to="/addnew" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemText primary="Add New Project"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                  <Link to="/contact" onClick={handleClose}>
                    <StyledMenuItem>
                      <ListItemText primary="Contact Us"></ListItemText>
                    </StyledMenuItem>
                  </Link>
                </StyledMenu>
              </>
            ) : (
              <>
                {isAuthenticated ? (
                  <Button className={classes.button}>
                    <Link to="/dashboard">
                      Welcome {user.fname} to Dashboard
                    </Link>
                  </Button>
                ) : null}
                <div>
                  <Button className={classes.button}>
                    <Link to="/" className={classes.text}>
                      <i class="fa fa-home"></i>Home
                    </Link>
                  </Button>
                </div>
                  <div>
                  <Button className={classes.button}>
                    <Link to="/about" className={classes.text}>
                      <i class="fa fa-user"></i>About
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button className={classes.button}>
                    <Link to="/projects" className={classes.text}>
                      <i class="fa fa-file"></i>Find Projects
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button className={classes.button}>
                    <Link to="/addnew" className={classes.text}>
                      <i class="fa fa-plus"></i>Add New Project
                    </Link>
                  </Button>
                </div>
                <div>
                  <Button className={classes.button}>
                    <Link to="/contact" className={classes.text}>
                      <i class="fa fa-id-badge"></i>Contact Us
                    </Link>
                  </Button>
                </div>
                  {!isAuthenticated ? (
                  <Link to="/login" className="lobut">
                    
                      <i class="fa fa-sign-in"></i>Login
                     
                    </Link>
                ) : null}
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
