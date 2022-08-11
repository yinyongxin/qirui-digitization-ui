import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../index'
import ButtonExemple from '../exemples/ButtonExemple'
import IconExemple from '../exemples/IconExemple'
import TitleExemple from '../exemples/TitleExemple'
import CardExemple from '../exemples/CardExemple'
import TabsExemple from '../exemples/TabsExemple'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'buttonExemple',
        element: <ButtonExemple />,
      },
      {
        path: 'iconExemple',
        element: <IconExemple />,
      },
      {
        path: 'titleExemple',
        element: <TitleExemple />,
      },
      {
        path: 'cardExemple',
        element: <CardExemple />,
      },
      {
        path: 'tabsExemple',
        element: <TabsExemple />,
      },
    ],
  },
];
