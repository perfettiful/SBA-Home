import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import githubIcon from "./github-icon.png"

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
          Find us on {' '}
          <a href={`https://github.com/perfettiful/SBA-Home`}><span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            <img src={githubIcon} />

          </span>{' '}
            Github </a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
