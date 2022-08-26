import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './app/routes';

const Main = () => {

  let elements = useRoutes(routes);

  return elements
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  // </React.StrictMode>
)
