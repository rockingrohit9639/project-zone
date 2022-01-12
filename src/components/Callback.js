import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from "../datalayer";
import { magic } from "../magic";
import { actions } from "../reducer";
import { toast } from "react-toastify";
import { googlelogin } from "../axios/instance";
import { Oval } from "react-loading-icons";

function Callback(props) {
  const history = useHistory();
  const [{ isAuthenticated }, dispatch] = useDataLayerValues();

  const finishSocialLogin = async () => {
    const data = await magic.oauth.getRedirectResult();

    // const magicData = await data.magic;
    const oauthData = await data.oauth;

    const user = {
      fname: oauthData.userInfo.givenName,
      lname: oauthData.userInfo.familyName,
      email: oauthData.userInfo.email,
      picture: oauthData.userInfo.picture,
    };

    const dbuser = {
      firstname: oauthData.userInfo.givenName,
      lastname: oauthData.userInfo.familyName,
      email: oauthData.userInfo.email,
      profile: {
        profile_pic: oauthData.userInfo.picture,
      },
      email_acctivation: {
        email_acctivation_token: "",
        email_activated: oauthData.userInfo.emailVerified,
      },
    };

    try {
      const res = await googlelogin(dbuser);
      if (!res.data.error) {
        localStorage.setItem("tokken", res.data.accesstoken);
        dispatch({
          type: "SET_AUTH",
          isAuthenticated: true,
        });
        dispatch({
          type: "SET_USER",
          user: user,
        });

        history.push("/");
      }
    } catch (err) {
      if (err.response) {
        history.push("/login");
        toast.error(`${err.response.data.error}`);
      }
    }
  };

  useEffect(() => {
    const provider = new URLSearchParams(props.location.search).get("provider");

    if (provider) {
      finishSocialLogin();
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [props.location.search]);

  return (
    <div className="loading_indicator">
      <Oval stroke={"#6f6ee1"} />
      <p>
        {" "}
        Please wait. <br /> We are logging you in.{" "}
      </p>
    </div>
  );
}

export default Callback;
