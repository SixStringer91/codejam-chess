import React from 'react';
import { IReplayRes } from '../../../interfaces/interfaces';

export const replayListRender = (
  Component: React.FC<any>,
  list: IReplayRes[]
) => list.map((replay) => <Component key={replay._id} {...replay} />);
