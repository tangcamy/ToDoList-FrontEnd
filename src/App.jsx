import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, TodoPage } from './pages';
//實作的useContext
import {AuthProvider} from 'contexts/AuthContext'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      {/* 在AuthProvder包起來的元件都可以取用 */}
        <AuthProvider>
          <Routes>
            {/* 指定page的Route */}
            <Route path="login" element={<LoginPage />} />
            <Route path="todo" element={<TodoPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="home" element={<HomePage />} />
            {/* 任何文字跑到Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
