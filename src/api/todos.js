import axios from 'axios';
const baseUrl = 'http://localhost:3004';

//取得資料
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

//新增資料
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error('[POST Todos failed]: ', error);
  }
};

//編輯＆更新資料
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, { title, isDone });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

//刪除資料
export const deleteTodo = async (id) => {
  // http://localhost:3004/todos/2
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
};
