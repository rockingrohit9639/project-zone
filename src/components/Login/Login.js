import React, { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { OAuthExtension } from '@magic-ext/oauth';

const magic = new Magic('pk_live_7D91453D1AE94DA9', {
    extensions: [new OAuthExtension()],
});

const Login = () => {

    const [loading, setLoading] = useState("");

    const handleLogin = async () => {
        setLoading("Loading...");

        const login = await magic.oauth.loginWithRedirect({
            provider: 'google',
            redirectURI: 'http://localhost:3000/login/callback',
        });
    }
    
    const afterLogin = async() => {
            // const result = await magic.oauth.getRedirectResult();
            // console.log(result)
    }
    useEffect(() => {
        afterLogin();
    }, []);

    return (
        <div className="login">
                <p>{loading}</p>
            <button onClick={handleLogin}> Login WIth Google </button>
        </div>
    );
}

export default Login;
