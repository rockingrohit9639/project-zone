import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDataLayerValues } from "../../datalayer";
import { magic } from "../../magic";



const Login = () =>
{
    
    const history = useHistory();
    const [loading, setLoading] = useState("");
    const [{ isAuthenticated }, dispatch] = useDataLayerValues();

    useEffect(() =>
    {
        isAuthenticated && history.push("/")
    }, [isAuthenticated, history]);

    const handleSocialLogin = async () =>
    {
        try
        {
            setLoading("Loading...");

            await magic.oauth.loginWithRedirect({
                provider: "google",
                redirectURI: new URL('/callback', window.location.origin).href,
            })
        }
        catch (err)
        {
            console.log(err)
        }
    }

    return (
        <div className="login">
                <p>{loading}</p>
            <button onClick={handleSocialLogin}> Login WIth Google </button>
        </div>
    );
}

export default Login;
