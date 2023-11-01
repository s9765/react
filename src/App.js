import './App.css';
import Details from './Components/Details';
import Direction from './Components/Direction';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from './Components/UserContext';
import Home from './Components/Home';
import UserDetails from './Components/UserDetails';
import End from './Components/End';


function App() {
  return (
    <div className="App" dir="rtl">
      <BrowserRouter>
        <UserContext>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route path="/Details" element={<Details />} />
              <Route path="/Direction" element={<Direction />} />
              <Route path="/UserDetails" element={<UserDetails />} />
              <Route path="/End" element={<End/>}/>
            </Route>
          </Routes>
        </UserContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
