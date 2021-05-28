import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar()
{
    const classes = useStyles();
    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#1a2639' }}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Project Zone
                    </Typography>
                    <Link to="/login" style={{textDecoration: "none"}}>
                        <Button style={ { color: "#FFF" } }>Login</Button>
                    </Link>

                    <Link to="/signup" style={{textDecoration: "none"}}>
                        <Button style={ { color: "#FFF" } }>Signup</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
