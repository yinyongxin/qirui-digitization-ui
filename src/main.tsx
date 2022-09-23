import ReactDOM from 'react-dom/client'
import { HashRouter, useRoutes } from 'react-router-dom';
import { routes } from './doc/routes';

const Main = () => {
  let elements = useRoutes(routes);
  return elements
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <HashRouter>
    <Main />
  </HashRouter>
  // </React.StrictMode>
)
