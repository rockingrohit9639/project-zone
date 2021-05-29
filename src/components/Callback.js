import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from '../datalayer';
import { magic } from '../magic';
import { actions } from '../reducer';

function Callback(props)
{
    
    const history = useHistory();
    const [{ isAuthenticated }, dispatch] = useDataLayerValues();

    const finishSocialLogin = async () =>
    {
        const data = await magic.oauth.getRedirectResult();
        
        const magicData = await data.magic;
        const oauthData = await data.oauth;

        const user = {
            email: oauthData.userInfo.email,
            fname: oauthData.userInfo.givenName,
            lname: oauthData.userInfo.familyName,
            picture: oauthData.userInfo.picture,
        }

        dispatch({
            type: actions.SET_USER,
            user: user,
        });

        dispatch({
            type: actions.SET_AUTH,
            isAuthenticated: true,
        });

        history.push("/");
        // console.log(magicData, oauthData);
    }

    useEffect(() => {
        const provider = new URLSearchParams(props.location.search).get('provider');
        
        if (provider)
        {            
            finishSocialLogin();
        }
        
    }, [props.location.search]);

    return (
        <div>
            <h1>This is callback</h1>
        </div>
    )
}

export default Callback;
