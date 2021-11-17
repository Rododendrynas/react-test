import React from 'react';

import './Skill.css';

const Skill = (skill) => {
  return (
    <div className="skill">
      <div key={skill.title}>
        <h1 className="skillTitle">{skill.title}</h1>
        <p className="skillDescription">{skill.description}</p>
      </div>
    </div>
  );
};

export default Skill;
