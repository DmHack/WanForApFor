import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './interceptors/axios';

/*Components*/
import Header from './components/Header/Header';

// PAGES
import SerLogin from './pages/SerLogin/SerLogin';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Prog from './pages/Prog/Prog';
import CreateStat from './pages/CreateStat/CreateStat';
import Users from './pages/Users/Users';
import Progs from './pages/HmProgs/Progs';
import Scripts from './pages/HmScripts/Scripts';
import Saits from './pages/HmSaits/Saits';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/serLog/:id/:acc/:rf' element={<SerLogin />} />
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pr/:id' element={<Prog />} />
        <Route path='/createStat' element={<CreateStat />} />
        <Route path='/progs' element={<Progs />} />
        <Route path='/saits' element={<Saits />} />
        <Route path='/scripts' element={<Scripts />} />
        <Route path='/user/:id' element={<Users />} />
      </Routes>
    </BrowserRouter>

  );
}


export default App;
