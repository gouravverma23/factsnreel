import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Store from './pages/Store';
import CategoryDetails from './pages/CategoryDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:categoryId" element={<CategoryDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
