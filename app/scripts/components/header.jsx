import React from 'react';
import { Link } from 'react-router';

const Header = (props) => {
  return (
    <header className="clearfix">
      Hockey Live
      <nav className="clearfix">
        <div className="nav-item">
          <Link to="home">Liste des matchs</Link>
        </div>
        <div className="nav-item">
          <Link to="info">Info</Link>
        </div>
      </nav>
    </header>
  )
};

export default Header;
