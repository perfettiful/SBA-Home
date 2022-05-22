import React from 'react';
import { useQuery } from '@apollo/client';

import AppList from '../components/AppList';
import AppForm from '../components/AppForm';

import { QUERY_AppS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_AppS);
  const Apps = data?.Apps || [];

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
            <AppList
              Apps={Apps}
              title="Some Feed for App(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
