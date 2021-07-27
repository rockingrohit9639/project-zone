import React, { useEffect, useState } from "react";
import "./VerifyEmailPage.css";
import { verifyemail } from "../../axios/instance";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { Helmet } from "react-helmet";

function VerifyEmailPage()
{
  const [{ isemailverified }, dispatch] = useDataLayerValues();
  const [result, setresult] = useState("");
  const { tokenemail } = useParams();
  useEffect(() =>
  {
    fetchresult();
  }, []);
  const fetchresult = async () =>
  {
    const data = {
      emailtoken: tokenemail,
    };
    try
    {
      const res = await verifyemail(data);
      setresult(res.data.error || res.data.msg);
      dispatch({
        type: "SET_EMAIL_VERIFIED",
        isemailverified: true,
      });
    } catch (err)
    {
      if (err.response)
      {
        setresult(err.response.data.error || err.response.data.msg);
      }
    }
  };
  return (
    <div className="main">
      <Helmet title="Project Zone | Verify Email" />
      <h1>{result}</h1>
    </div>
  );
}

export default VerifyEmailPage;
