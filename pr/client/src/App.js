import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './interceptors/axios';

/*Components*/
import Header from './components/Header/Header';

/* Pages */
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPass from './pages/ResetPass/ResetPass';
import Cod from './pages/Cod/Cod';
import ResetPassEm from './pages/ResPassEm/ResetPassEm'
import DeleteAkk from './pages/DeleteAkk/DeleteAkk';
import DeleteAkkEm from './pages/DeleteAkkEm/DeleteAkkEm'
import NewName from './pages/NewName/NewName';
import NewNameEm from './pages/NewNameEm/NewNameEm';
import NewImg from './pages/NewImg/NewImg';
import NewEmail from './pages/NewEmail/NewEmail';
import NewEmailEm from './pages/NewEmailEm/NewEmailEm';
import NewInfo from './pages/NewInfoMan/NewInfo';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetPass' element={<ResetPass />} />
        <Route path='/resetPassEm/:id/:random' element={<ResetPassEm />} />
        <Route path='/deleteAkk' element={<DeleteAkk />} />
        <Route path='/deleteAkkEm/:id/:random' element={<DeleteAkkEm />} />
        <Route path='/newName' element={<NewName />} />
        <Route path='/newNameEm/:id/:random' element={<NewNameEm />} />
        <Route path='/newImg' element={<NewImg />} />
        <Route path='/newEmailEm/:id/:random' element={<NewEmailEm />} />
        <Route path='/newEmail' element={<NewEmail />} />
        <Route path='/cod/:id' element={<Cod />} />
        <Route path='/newInfos' element={<NewInfo />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
