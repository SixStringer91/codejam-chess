import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <NavLink to="/Game">Replay</NavLink>

      <NavLink to="/notGame">To Lobby</NavLink>
    </>
  );
}

export default Header;
