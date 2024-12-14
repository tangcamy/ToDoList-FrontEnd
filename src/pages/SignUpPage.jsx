import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //引用提示訊息框框
import { useAuth } from 'contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  //當入成功後導引導下個頁面（像是/todos)
  const navigate = useNavigate(); //引用元件

  const { register, isAuthenticated } = useAuth();

  //Header加入頁面驗證資訊
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    }
  }, [navigate, isAuthenticated]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRegisterClick(); // 按下 Enter 時觸發 handleClick
    }
  };

  const handleRegisterClick = async () => {
    if (username === 0) {
      return;
    }
    if (email === 0) {
      return;
    }
    if (password === 0) {
      return;
    }

    const success = await register({
      username,
      email,
      password,
    });

    if (success) {
      Swal.fire({
        title: '註冊成功!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000, //出現時間
        position: 'top', //出現的位置
      });
      //清除欄位清除欄位
      setUserName('');
      setPassword('');
      setEmail('');
      return;
    }
    Swal.fire({
      title: '註冊失敗!',
      icon: 'error',
      // text: 'Do you want to continue',//注意事項文字
      // showConfirmButton: false, //是否要出現按鈕ok
      timer: 2000, //出現時間
      position: 'top', //出現的位置
    });
    //清除欄位清除欄位
    setUserName('');
    setPassword('');
    setEmail('');
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

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
          type="text"
          label="Email"
          value={email}
          placeholder="請輸入Email"
          onChange={(emailInputValue) => setEmail(emailInputValue)}
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
      <AuthButton onClick={handleRegisterClick}>註冊</AuthButton>

      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
