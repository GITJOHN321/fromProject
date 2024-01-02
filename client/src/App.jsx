import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExamPage from "./pages/ExamPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QuestionProvider } from "./context/QuestionContext";
import { ExamProvider } from "./context/ExamContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/navbar.jsx";
function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ExamProvider>
          <QuestionProvider>
            <BrowserRouter>
              <main className="container mx-auto px-10">
                <Navbar></Navbar>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/create-exam" element={<ExamPage />} />
                    <Route path="/create-exam/:id" element={<ExamPage />} />

                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>
                </Routes>
              </main>
            </BrowserRouter>
          </QuestionProvider>
        </ExamProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
