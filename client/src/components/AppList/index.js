import React from 'react';
import { Link } from 'react-router-dom';

const AppList = ({
  apps,
  appTitle,
  showTitle = true,
  showUsername = true,
}) => {

  return (
    <div>
      {showTitle && <h3>{appTitle}</h3>}
      {apps &&
        apps.map((app) => (
          <div key={app._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${app.appOwner}`}
                >
                  {app.appOwner} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this App on {app.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this App on {app.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{app.appTitle}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/apps/${app._id}`}
            >
              Join the discussion on this App.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AppList;
