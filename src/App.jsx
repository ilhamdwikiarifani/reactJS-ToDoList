import Home from "./components/Home";
import AddData from "./components/AddData";
import UpdateData from "./components/UpdateData";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddData />} />
        <Route path="/edit/:id" element={<UpdateData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
