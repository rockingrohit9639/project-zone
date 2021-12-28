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
  const url = `https://project-zone.tech/${ props.id }`;

  const quote = `
Hello everyone,
I found an awesome project for you i.e 
Title : ${ props.title }
${ props.description }

Have a look at it and if you like the project idea go ahead an make it reality.
To know more about the project or to find other similar projects visit - 
`;

  return (
    <div className="share-conatiner" style={props.style}>
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
