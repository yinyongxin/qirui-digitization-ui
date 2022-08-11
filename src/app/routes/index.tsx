import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../index'
import ButtonExemple from '../exemples/ButtonExemple'
import IconExemple from '../exemples/IconExemple'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'button',
        element: <ButtonExemple />,
      },
      {
        path: 'icon',
        element: <IconExemple />,
      },
    ],
  },
];
