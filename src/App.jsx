import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, SignUpPage, TodoPage } from './pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* 指定page的Route */}
          <Route path="login" element={<LoginPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="signtup" element={<SignUpPage />} />
          <Route path="home" element={<HomePage />} />
          {/* 任何文字跑到Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
