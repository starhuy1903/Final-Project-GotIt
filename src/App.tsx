import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from './components/layout/Layout';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        {/* protected routes */}
      </Route>

    </Routes>
  );
}

export default App;
