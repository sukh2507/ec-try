import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "@/components/Auth";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { VerificationForm } from "@/components/VerificationForm";
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from "@/components/PrivateRoute";
import VerifiedRoute from "@/components/VerifiedRoute";
import ProtectedComp from "@/components/ProtectedComp";
import ChangeEmailVerification from "@/components/ChangeEmailVerification";
import ForgetPwd from "@/components/ForgetPwd";
import ResetPwd from "@/components/ResetPwd";
import TeacherRoute from "@/components/teacher/TeacherRoute";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";
import StudentRoute from "@/components/student/StudentRoute";
import StudentDashboard from "@/components/student/StudentDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/password/verify/:email/:token" element={<ResetPwd />} />
        <Route path="/password/forget" element={<ForgetPwd />} />
        <Route path="/" element={<Auth />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/verify" element={<VerificationForm />} />

          {/* Nested Verified Routes */}
          <Route element={<VerifiedRoute />}>
            <Route
              path="/email/verify/:token"
              element={<ChangeEmailVerification />}
            />
            <Route path="/home" element={<ProtectedComp />} />

            {/* Nested Teacher Routes */}
            <Route element={<TeacherRoute />}>
              <Route path="/teacher" element={<TeacherDashboard />} />
            </Route>

            {/* Nested Student Routes */}
            <Route element={<StudentRoute />}>
              <Route path="/student" element={<StudentDashboard />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
