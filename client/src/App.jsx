import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import JsonGenerator from './components/JsonGenerator';
import Header from './components/Header';
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json-generator" element={<JsonGenerator />} />
        </Routes>      
      </div>
      <SpeedInsights/>
    </Router>
  );
}

export default App;
