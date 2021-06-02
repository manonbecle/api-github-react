import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import './navigation.scss';

const Navigation = () => (
  <Menu className="menu">
    <Menu.Item>
      <NavLink className="navlink" to="/">Recherche</NavLink>
    </Menu.Item>
    <Menu.Item>
      <NavLink className="navlink" to="/faq">FAQ</NavLink>
    </Menu.Item>
  </Menu>
);

export default Navigation;
