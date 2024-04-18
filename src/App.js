import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Createpost from './pages/Createpost';
import Getpost from './pages/Getpost';
import Header from './components/Header';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route element={<Createpost/>} path='/'/>
      <Route element={<Getpost/>} path='/getpost'/>
    </Routes>
    </>
  );
}

export default App;
