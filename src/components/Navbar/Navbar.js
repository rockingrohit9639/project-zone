import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";

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
    name: {
        color: "#FFF",
        textDecoration: "none"
    }
}));

function Navbar()
{
    const classes = useStyles();
    const [{ isAuthenticated, user }] = useDataLayerValues();

    console.log(isAuthenticated, user);


    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#1a2639' }}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.name}>
                            Project Zone
                        </Link>
                    </Typography>

                    {
                        isAuthenticated
                            ? (
                                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                    <Button style={{ color: "#FFF" }}> Welcome {user.fname} </Button>
                                </Link>
                            )
                            :
                            (<Link to="/login" style={{ textDecoration: "none" }}>
                                <Button style={{ color: "#FFF" }}>Login</Button>
                            </Link>)
                    }



                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
