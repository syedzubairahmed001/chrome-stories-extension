import React from "react";

import { GlobalContext } from "../../context/globalContext";
import pages from "../../constants/pages";

import logo from "../../images/logos/logo_100x100.png";

const About = (props) => {
  const { globalContext, setGlobalContext } = React.useContext(GlobalContext);

  return (
    <div className="flex flex-column h-100 ">
      <div className="p-10">
        <button
          className={`btn-tertiary closeBtn click-effect`}
          onClick={() =>
            setGlobalContext((prev) => ({ ...prev, currentPage: pages.Home }))
          }
        >
          <div className={`btn-tertiary close close-dark`}></div>
        </button>
      </div>
      <div className="p-10 flex flex-column flex-1">
        <div className="text-center">
          <img src={logo} alt="logo" className="logo-big animate--slide-up" />
          <p className="text-primary font-small font-bold  mb-10 mt-10 animate--slide-up a-delay-1">
            Created with ❤️ by <br />
            <a
              href="https://twitter.com/_syed_zubair"
              target="_blank"
              rel="noopener noreferrer"
              className="link-1"
            >
              Syed Zubair Ahmed
            </a>
          </p>
          <p className="text-secondary font-medium font-vsmall animate--slide-up a-delay-2">
            Got any suggestions or feedback? Reach out to me on{" "}
            <a
              href="https://twitter.com/_syed_zubair"
              target="_blank"
              rel="noopener noreferrer"
              className="link-1"
            >
              twitter
            </a>
            , I'll be very happy to hear from you!
          </p>
        </div>
      </div>
      <footer className="text-center mb-10">
        <div>
          <p className="font-vsmall text-secondary">Browser Stories v0.2.0</p>
        </div>
        <div >
          <a
            href="https://stories.zubs.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="link-2 font-vsmall"
            >
            Website
          </a>
          <span className="font-vsmall"> | </span>
          <a
            href="https://stories-help.zubs.xyz/docs/privacy_policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-2 font-vsmall"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default About;
