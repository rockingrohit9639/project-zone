import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from '../datalayer';
import { magic } from '../magic';
import { actions } from '../reducer';
import { toast } from 'react-toastify';
import { googlelogin } from "../axios/instance";

function Callback(props)
{
    const history = useHistory();
    const [{ isAuthenticated }, dispatch] = useDataLayerValues();

    const finishSocialLogin = async () =>
    {
        const data = await magic.oauth.getRedirectResult();
        
        const magicData = await data.magic;
        const oauthData = await data.oauth;
        console.log(oauthData);

        const user = {
            fname: oauthData.userInfo.givenName,
            lname: oauthData.userInfo.familyName,
            email: oauthData.userInfo.email,
            picture: oauthData.userInfo.picture,
        }

        const dbuser = {
            firstname: oauthData.userInfo.givenName,
            lastname : oauthData.userInfo.familyName,
            email: oauthData.userInfo.email,
            profile: {
                profile_pic: oauthData.userInfo.picture,
            },
            email_acctivation: {
                email_acctivation_token: "",
                email_activated: oauthData.userInfo.emailVerified,
            },
        }
        
        try {
            const res = await googlelogin(dbuser);
            if (!res.data.error) {
              localStorage.setItem('tokken', res.data.accesstoken);
              dispatch({
                type: 'SET_AUTH',
                isAuthenticated: true,
              });
              dispatch({
                type: 'SET_USER',
                user: user,
              });

              history.push('/');
            }
          } catch (err) {
            if (err.response) {
                history.push('/login');
                toast.error(`${err.response.data.error}`);
            }
          }
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
