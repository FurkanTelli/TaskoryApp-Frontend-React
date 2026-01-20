import { useSelector } from 'react-redux';
import './App.css';
import SidebarComponent from './components/Sidebar/SidebarComponent';
import ToolbarComponent from './components/ToolbarConponent/ToolbarComponent';
import AppRoutes from './routes/AppRoutes';
import Cookies from 'js-cookie';

function App() {
  const isLoggedIn = useSelector(state => state?.userStore?.isLogin);

  return (
    <div className='flex'>
      {(isLoggedIn || Cookies.get("userId")) && <SidebarComponent />}
      <div className='flex-1'>
        <ToolbarComponent />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
