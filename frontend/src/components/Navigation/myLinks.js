import React from "react";
import { Link } from 'react-router-dom'


function MyLinks() {
  return (
    <div id="my-links">
      <img
        src="https://foundations.projectpythia.org/_images/GitHub-logo.png"
        alt="moran-github"
        onClick={() => {
          <Link herf="https://github.com/MEven44" />;
        }}
      />
      <img
        src="https://blog.waalaxy.com/wp-content/uploads/2021/01/Linkedin-Logo-2048x1280.png"
        alt="moran-linkedin"
        onClick={() => {
          <Link herf="https://www.linkedin.com/in/moran-even/" />;
        }}
      />
    </div>
  );
}

export default MyLinks;
