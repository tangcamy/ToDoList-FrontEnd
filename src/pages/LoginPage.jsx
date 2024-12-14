import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from '../assets/images/';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// useNavigate
import Swal from 'sweetalert2'; //引用提示訊息框框
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  //當入成功後導引導下個頁面/todos
  // const navigate = useNavigate(); //引用元件
  const { login, isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  //調整從useAuth獲取是否isAuthenticated認證過，進行頁面跳轉
  useEffect(() => {
    console.log('login:', isAuthenticated);
    if (isAuthenticated) {
      console.log('ok');
      // navigate('/todo');
    }
  }, [isAuthenticated]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick(); // 按下 Enter 時觸發 handleClick
    }
  };

  const handleClick = async () => {
    if (username === 0) {
      return;
    }
    if (password === 0) {
      return;
    }

    const success = await login({
      username,
      password,
    });
    if (success) {
      Swal.fire({
        title: '登入成功!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, //出現時間
        position: 'top', //出現的位置
      });

      return;
    }
    Swal.fire({
      title: '登入失敗!',
      icon: 'error',
      // text: 'Do you want to continue',//注意事項文字
      // showConfirmButton: false, //是否要出現按鈕ok
      timer: 2000, //出現時間
      position: 'top', //出現的位置
    });
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          type="text"
          label="帳號"
          value={username}
          placeholder="請輸入帳號"
          onChange={(usernameInputValue) => setUserName(usernameInputValue)}
          onKeyDown={handleKeyDown}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          onKeyDown={handleKeyDown}
        />
      </AuthInputContainer>

      <AuthButton onClick={handleClick}>登入</AuthButton>

      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
