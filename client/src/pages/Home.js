import React from 'react';
import { useQuery } from '@apollo/client';

import AppList from '../components/AppList';
import AppForm from '../components/AppForm';

import { QUERY_APPS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_APPS);
  const apps = data?.Apps || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <AppForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            null
            // <AppList
            //   apps={apps}
            //   title="."
            // />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
