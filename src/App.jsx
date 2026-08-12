import { Routes, Route } from "react-router-dom";
import UserLogin from "./components/Login/index.jsx";
import HomePage from "./components/Home/index.jsx";
import ProfileView from "./components/MyProfile/index.jsx";
import UserDetails from "./components/UserDetails/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;