import './index.less'
import { SideMenu } from '../components'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { exemplesNameList } from './routes';
import { useData } from '../components/utils/hooks';
import '/public/theme/dark/index.css';
// import '/public/theme/light/index.css';

window.matchMedia("prefers-color-scheme").onchange = (themeMedia) => {
  console.log('themeMedia', themeMedia);
}

function App() {
  let navigate = useNavigate();
  const data = useData({
    menuTree: exemplesNameList.map((exemplesName) => {
      const title = exemplesName?.replace(/Exemple/, '').split('').map((item, index) => {
        if (index === 0) {
          return item.toUpperCase()
        } else {
          return item
        }
      }).join('')

      return {
        title: title,
        activeKey: exemplesName,
        icon: 'bars',
      }
    })
  })

  const location = useLocation()

  return (
    <div className='app'>
      <SideMenu
        activeMenuItemChange={(menuItems) => {
          navigate(`/${menuItems?.[0]}`);
        }}
        style={{
          overflow: 'auto',
          maxHeight: '100vh'
        }}
        defaultActiveKeys={[location.pathname.split('/')[1]]}
        menuTree={data.menuTree}
        borders={['right']}
      />
      <div className='appContent'>
        <Outlet />
      </div>
    </div>
  )
}

export default App

