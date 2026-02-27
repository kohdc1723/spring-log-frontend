import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import IndexPage from "@/pages/IndexPage";
import PostDetailPage from "@/pages/PostDetailPage";
import ProfileDetailPage from "@/pages/ProfileDetailPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import OAuth2CallbackPage from "./pages/OAuth2CallbackPage";
import AuthProvider from "./contexts/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/oauth2/callback" element={<OAuth2CallbackPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<IndexPage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
              <Route path="/profile/:userId" element={<ProfileDetailPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
