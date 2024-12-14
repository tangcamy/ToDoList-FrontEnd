import { createContext, useState, useEffect, useContext } from 'react';
import { register, login, checkPermission } from 'api/auth';
import * as jwt from 'jsonwebtoken'; //解析token的套件
import { useLocation } from 'react-router-dom';

// 建立：元件共享狀態變數預設值
const defaultAuthContext = {
  isAuthenticated: false, //使用者是否登入判斷依據，預設false,若取得後端有效憑證則切換true
  currentMember: null, //當前使用者相關資料,預設null，成工登入後就會有使用者資料
  register: null, //註冊方法
  login: null, //登入方法
  logout: null, //登出方法
};

// import套件，定義文件並將預設值帶入
const AuthContext = createContext(defaultAuthContext);
// 頁面如何使用：輸出useContext AuthContext (建立的文件）
export const useAuth = () => useContext(AuthContext);
// 管理文件狀態Provider操作功能
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  // 透過解析Token來回傳一些資料
  const [payload, setPayload] = useState(null); //Token獲取的資料
  const { pathname } = useLocation();

  //Header加入頁面驗證資訊
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        SetIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        SetIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        SetIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload,
        //api/auth註冊的api，為非同步，這邊data為api中的payload資訊
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken); //解析Token
          if (tempPayload) {
            //有正確獲取資料，並儲存至localStorage
            setPayload(tempPayload);
            SetIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            SetIsAuthenticated(false);
          }
          //最後並回傳整個註冊的結果
          return success;
        },
        //api/auth 登入的api，這邊data為api中的payload資訊
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            SetIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            SetIsAuthenticated(false);
          }
          return success;
        },
        //登出功能
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          isAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
