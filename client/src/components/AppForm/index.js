import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_APP } from '../../utils/mutations';
import { QUERY_APPS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const AppForm = () => {
  const [formState, setFormState] = useState({});

  const [addApp, { error }] = useMutation(ADD_APP, {
    
    update(cache, { data: { addApp } }) {
      try {
        
        // const { apps } = cache.readQuery({ query: QUERY_APPS });

        // cache.writeQuery({
        //   query: QUERY_APPS,
        //   data: { apps: [addApp, ...apps] },
        // });

      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, apps: [...me.apps, addApp] } },
      // });

    },
  }
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log("-- Form inputs ready: ",{formState} )

    try {
      const { data } = await addApp({
        variables: {
          appTitle: formState.appTitle,
          appDescription: formState.appDescription
          // appAuthor: Auth.getProfile().data.username,
        },
      });

      console.log("Submitted mutation: ", {data})

      setFormState({
        ...formState,
        appTitle: "Add App Title",
        appDescription: "Add App Description"

      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({...formState, [name] : value});

  };

  return (
    <div>
      <h3>Welcome to the SBA Rest API, where businesses and government are made transparent.</h3>

      {Auth.loggedIn() ? (
        <>

          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="appTitle"
                placeholder="Add App Title"
                value={formState?.appText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="appDescription"
                placeholder="Add App Description"
                value={formState?.appText}
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
