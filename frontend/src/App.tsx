import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserBlogsPage from "./pages/UserBlogsPage";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import Layout from "./Layout";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout wraps all the child routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
            <Route path="/add/blog" element={<ProtectedRoute><AddBlogPage /></ProtectedRoute>} />
            <Route path="/user/blogs" element={<ProtectedRoute><UserBlogsPage/></ProtectedRoute>}/>
            <Route path="/blog/:id/edit" element={<ProtectedRoute><EditBlogPage/></ProtectedRoute>}/>
          </Route>
          {/* Auth-specific routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
