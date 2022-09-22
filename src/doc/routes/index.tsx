import React from 'react';
import { RouteObject } from 'react-router-dom';
import App from '../index'
import lazyload from '../../fns/lazyload';

const exemples = import.meta.glob('../exemples/*.tsx')

export const exemplesNameList: string[] = Object.keys(exemples).map(key => {
  const path = key.split('/').pop()?.split('.')[0]
  return path as string
})

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: Object.keys(exemples).map(key => {
      const Exemple = lazyload(exemples[key])
      const path = key.split('/').pop()?.split('.')[0]
      return {
        path,
        element: <Exemple />,
      }
    })
  },
];
