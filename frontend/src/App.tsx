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
import CreateQuiz from "./components/teacher/CreateQuiz";
import AllQuizzes from "./components/teacher/AllQuizzes";
import ShowAllQuizzes from "./components/teacher/ShowAllQuizzes";
import BrowseAllQuizzes from "./components/student/BrowseAllQuizzes"
import MyQuizzesOverview from "./components/student/MyQuizzesOverview";
import QuizSolvingPage from "./components/student/QuizSolvingPage";

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
            {/* <Route path="/home" element={<ProtectedComp />} /> */}

            {/* Nested Teacher Routes */}
            <Route element={<TeacherRoute />}>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/create-quiz" element={<CreateQuiz/>}/>
              <Route path="/teacher/all-quizzes" element={<ShowAllQuizzes/>}/>
            </Route>

            {/* Nested Student Routes */}
            <Route element={<StudentRoute />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/all-quizzes" element={<BrowseAllQuizzes />} />
              <Route path="/student/my-quizzes" element={<MyQuizzesOverview />} />
              <Route path="/student/my-quizzes/purchased" element={<MyQuizzesOverview />} />
              <Route path="/student/my-quizzes/pending" element={<MyQuizzesOverview />} />
              <Route path="/solve" element={<QuizSolvingPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
