import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import IndexPage from "@/pages/IndexPage";
import PostDetailPage from "@/pages/posts/PostDetailPage";
import ProfileDetailPage from "@/pages/profile/ProfileDetailPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import GlobalLayout from "@/components/layouts/GlobalLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import OAuth2CallbackPage from "@/pages/auth/OAuth2CallbackPage";
import AuthProvider from "@/contexts/AuthProvider";
import { Role } from "@/types/role";
import AdminPage from "@/pages/admin/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="oauth2/callback" element={<OAuth2CallbackPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={[Role.ADMIN, Role.USER]} />}>
              <Route path="/" element={<IndexPage />} />
              <Route path="post/:postId" element={<PostDetailPage />} />
              <Route path="profile/:userId" element={<ProfileDetailPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />

              <Route path="admin" element={<ProtectedRoute allowedRoles={[Role.ADMIN]} />}>
                <Route index element={<AdminPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
