import React from 'react';
import { Link } from 'react-router-dom';

const AppList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {Apps &&
        Apps.map((App) => (
          <div key={App._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${App.AppAuthor}`}
                >
                  {App.AppAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this App on {App.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this App on {App.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{App.AppText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/Apps/${App._id}`}
            >
              Join the discussion on this App.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AppList;
