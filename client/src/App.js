//use npx create-react-app . to create react app in the folder
//use npm installl react-router-dom to allow differenet pages to be connected

import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Books from "./pages/Books";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Books/>} />
          <Route path='/add' element = {<Add/>} />
          <Route path='/update/:id' element = {<Update/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
