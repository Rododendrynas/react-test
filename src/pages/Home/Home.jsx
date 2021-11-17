import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Skill, Notification, Loading } from '../../components';

import './Home.css';

const Home = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/', linkName: 'Home' },
    { path: '/add', linkName: 'Add' },
  ];

  //Get skills data from database and show
  const getData = () => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/skills', {
      headers: {
        authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then((res) => res.json())
      .then((skills) => {
        if (skills.err) {
          return setError(skills.err || 'Unknown error');
        }

        if (skills.length === 0) {
          return setError('There are no items yet. Please add.');
        }
        return setData(skills);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      {error && <Notification background="red">{error}</Notification>}
      {loading && <Loading />}
      <Menu logo={logo} links={links} />
      <div className="content">
        {data &&
          data.map((skill) => (
            <Skill
              key={skill.title}
              title={skill.title}
              description={skill.description}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
