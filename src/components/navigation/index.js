import React, { useEffect, useState } from 'react';
import { getPetTypes } from '../../api/petfinder';
import Logo from '../../assets/logo.svg';
import Search from '../search';

// Import NavLink
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [petTypes, setPetTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPetTypesData() {
      const { types } = await getPetTypes();
      setPetTypes(types);
    }

    getPetTypesData();
  }, []);

  const handleClick = () => {
    return navigate('/');
  };

  return (
    <nav>
      <div className="nav-logo">
        <img src={Logo} alt="Petlover" onClick={handleClick}/>
        <Search />
      </div>
      <ul className="nav-links">
        <li key={'all'}>
          <NavLink to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            All Pets
          </NavLink>
        </li>
        {petTypes
          ? petTypes.map((type) => (
              <li key={type.name}>
                <NavLink to={`/${type._links.self.href.split('/').pop()}`}
                  key={type.name}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {type.name}s
                </NavLink>{' '}
              </li>
            ))
          : 'Loading...'}
      </ul>
    </nav>
  );
};

export default Navigation;
