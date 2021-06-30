import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './game/game';

function Main() {
  return (
    <>
      <Switch>
        <Route exact path="/" />
        <Route path="/Game" component={Game} />
        <Route path="/lobby" />
      </Switch>
    </>
  );
}

export default Main;
