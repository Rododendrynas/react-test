import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

import { Button, Menu, Notification } from '../../components';

const Add = () => {
  const authContext = useContext(AuthContext);
  const [input, setInput] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/', linkName: 'Home' },
    { path: '/add', linkName: 'Add' },
  ];

  return (
    <div>
      {/* Error handling */}
      {error && <Notification background="red">{error}</Notification>}
      {message && <Notification>{message}</Notification>}
      <Menu logo={logo} links={links} />

      {/* Create a form to add a skill. Save input data in database */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(input);
          fetch(process.env.REACT_APP_BASE_URL + '/v1/content/skills', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${authContext.token || 'none'}`,
            },
            body: JSON.stringify(input),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.err) {
                return setError(data.err || 'Unknown error');
              }
              setInput();
              if (data.msg) {
                return setMessage(data.msg);
              }
              e.target.reset();
            })
            .catch((err) => setError(err.message));
        }}
      >
        {/* Input field for skill title */}
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Input field for skill description */}
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textArea"
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              required
            />
          </div>
        </div>
        <Button className="button" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default Add;
