import React from "react";
import "./ShareProject.css";
import
  {
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinIcon,
    FacebookShareButton,
    FacebookIcon,
  } from "react-share";

function ShareProject(props)
{
  const url = `https://project-zone.netlify.app/`;
  const quote = `Hello,
  I found an awesome project for you i.e ' ${ props.title } '
  ${ props.description }

  Have a look at it and enjoy coding.
  For more interesting project visit `;

  return (
    <div className="share-conatiner">
      <div>
        <TwitterShareButton url={url} title={quote}>
          <TwitterIcon size={35} round />
        </TwitterShareButton>
      </div>
      <div>
        <WhatsappShareButton url={url} title={quote}>
          <WhatsappIcon size={35} round />
        </WhatsappShareButton>
      </div>
      <div>
        <RedditShareButton url={url} title={quote}>
          <RedditIcon size={35} round />
        </RedditShareButton>
      </div>
      <div>
        <FacebookShareButton url={url} title={quote}>
          <FacebookIcon size={35} round />
        </FacebookShareButton>
      </div>
      <div>
        <LinkedinShareButton url={url} summary={quote}>
          <LinkedinIcon size={35} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
}

export default ShareProject;
