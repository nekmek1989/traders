import {BrowserRouter, Route, Routes} from "react-router";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Header from "../components/Header/Header.tsx";


function App() {


  return (
    <div className='app'>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/Register'} element={<Register />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
