import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddProduct from './pages/AddProduct';
import ViewProduct from './pages/ViewProduct';
import ViewStock from './pages/ViewStock';
import AddStock from './pages/AddStock';
import ReleaseStock from './pages/ReleaseStock';
import ViewEditStock from './pages/ViewEditStock';
import Footer from './components/Footer';
import Home from './pages/Home';
import ViewRelease from './pages/ViewRelease';
import DashboardSummary from "./pages/DashboardSummary";
import './index.css';


const App = () => {
    return (
        <Router>
          <div id='navcontent'>
            <Header />
          </div >
          <div id = 'bodycontent'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<DashboardSummary />} /> 
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/view-product" element={<ViewProduct />} />
                <Route path="/view-stock" element={<ViewStock />} />
                <Route path="/add-stock" element={<AddStock />} />
                <Route path="/release-stock" element={<ReleaseStock />} />
                <Route path="/edit" element={<ViewEditStock />} />
                <Route path="/view-release" element={<ViewRelease />} />
            </Routes>
          </div>
          <div id='footercontent'>
            <Footer />
          </div>
      </Router>
    );
};

export default App;
