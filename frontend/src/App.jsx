import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import QuickFacts from './pages/QuickFacts';
import Store from './pages/Store';
import CategoryDetails from './pages/CategoryDetails';

import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclosure from './pages/Disclosure';

import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import ManagePosts from './pages/ManagePosts';
import ManageFacts from './pages/ManageFacts';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/posts" element={<Layout><Posts /></Layout>} />
        <Route path="/posts/:collectionId" element={<Layout><Posts /></Layout>} />
        <Route path="/facts" element={<Layout><QuickFacts /></Layout>} />
        <Route path="/store" element={<Layout><Store /></Layout>} />
        <Route path="/store/:categoryId" element={<Layout><CategoryDetails /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/disclosure" element={<Layout><Disclosure /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/posts" element={<AdminLayout><ManagePosts /></AdminLayout>} />
        <Route path="/admin/facts" element={<AdminLayout><ManageFacts /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
