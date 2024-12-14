import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

// 登入
export const login = async ({ username, password }) => {
  try {
    const res = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    const { authToken } = res.data;
    if (authToken) {
      return { success: true, ...res.data };
    }
    return res.data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

// 註冊
export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });
    console.log(res.data);
    const { authToken } = res.data;
    if (authToken) {
      return { success: true, ...res.data };
    }
    return res.data;
  } catch (error) {
    console.error('[register Failed]:', error);
  }
};

//Axios（一個流行的 HTTP 客戶端）發送 GET 請求，獲取包含伺服器的回應
export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
