import React from 'react';
import 'react-redux';
import { RootState } from '../redux/reducers/index';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
  export default DefaultRootState;
}

declare module '*.svg' {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
