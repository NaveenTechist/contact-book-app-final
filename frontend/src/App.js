import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from './components/Contacts/index.js'
import Form from './components/Form/index.js';
import ContactInDetails from './components/ContactInDetails/index.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Contacts />} />
          <Route exact path='/contacts' element={<Form />} />
          <Route exact path='/contact-details/:id' element={<ContactInDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
