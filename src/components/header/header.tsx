import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

function Header() {
  return (
    <>
      <Button key="3">
        <NavLink to="/Game">Replay</NavLink>
      </Button>
      ,
      <Button key="2">
        <NavLink to="/notGame">To Lobby</NavLink>
      </Button>
    </>
  );
}

export default Header;
