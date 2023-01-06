import{BrowserRouter,Switch,Route, Router, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import Addedit from "./pages/Addedit";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
   
    <div className="App">
      <ToastContainer position="top-center" />
   <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/addcontact" element={<Addedit/>}/>
       <Route path="/update/:id" element={<Addedit/>}/>
       <Route path="/view/:id" element={<View/>}/>
       </Routes>
      
      </div>
   
    </BrowserRouter>
  );
}

export default App;
