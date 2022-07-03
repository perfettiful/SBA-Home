import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_APP } from '../utils/queries';

const SingleApp = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { AppId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_APP, {
    // pass URL parameter
    variables: { AppId: AppId },
  });

  const App = data?.App || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {App.AppAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this App on {App.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {App.AppText}
        </blockquote>
      </div>

    </div>
  );
};

export default SingleApp;
