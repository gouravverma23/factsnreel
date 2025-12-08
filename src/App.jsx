import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Store from './pages/Store';
import CategoryDetails from './pages/CategoryDetails';

import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclosure from './pages/Disclosure';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:collectionId" element={<Posts />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:categoryId" element={<CategoryDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclosure" element={<Disclosure />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
