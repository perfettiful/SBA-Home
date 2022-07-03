import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_APP } from '../../utils/mutations';
import { QUERY_AppS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const AppForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addApp, { error }] = useMutation(ADD_App, {
    update(cache, { data: { addApp } }) {
      try {
        const { Apps } = cache.readQuery({ query: QUERY_AppS });

        cache.writeQuery({
          query: QUERY_APPS,
          data: { Apps: [addApp, ...Apps] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, Apps: [...me.Apps, addApp] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addApp({
        variables: {
          AppText,
          AppAuthor: Auth.getProfile().data.username,
        },
      });

      setAppText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'AppText' && value.length <= 280) {
      setAppText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Welcome to the SBA Rest API, where businesses and government are made transparent.</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="AppText"
                placeholder="Here's a new App..."
                value={AppText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add App
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your Apps. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AppForm;
