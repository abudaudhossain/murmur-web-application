import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Murmur from './pages/Murmur';
import Follower from './pages/Follower';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PublicLayout from './Layout/PublicLayout';
import PrivateLayout from './Layout/PrivateLayout';
import Signup from './pages/Signup';
import { StoreProvider } from './context/StoreContext';
import Following from './pages/Following';
import Users from './pages/Users';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* Public routes (no navbar) */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Route>

          {/* Private routes (with navbar/sidebar/footer) */}
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<><Home /></>} />
            <Route path="/me" element={<><Profile /></>} />
            <Route path="/murmur/me" element={<><Murmur /></>} />
            <Route path="/followers" element={<><Follower /></>} />
            <Route path="/following" element={<><Following /></>} />
            <Route path="/users" element={<><Users /></>} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
