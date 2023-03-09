import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TicTacToe from './Pages/TicTacToe/TicTakToe';
import WelcomePage from './Pages/Welcome/WelcomePage';

function App() {
  return (
    <div >
       <BrowserRouter>
       <Routes>
         <Route path='/' element={ <WelcomePage />}/>
         <Route path='/game' element={<TicTacToe />}/>
       </Routes>
       </BrowserRouter>
      
     
    </div>
  );
}

export default App;
