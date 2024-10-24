import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';

const TodoPage = () => {
  //todo頁面接收todoinput的value，並更新最新的值
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  //API-GetTodo
  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  //TodoInput
  // 監聽input onchange狀態（TodoInput中的onChange觸發，更新父組件的狀態
  const handelInput = (value) => {
    setInputValue(value);
  };

  // 監聽input onAddTodo狀態（TodoInput中button的clink觸發，更新父組件的狀態）
  const handleAddTodo = async () => {
    //確認inputValue是否有值
    if (inputValue.length === 0) {
      return;
    }
    // 調用createTodoAPI
    const data = await createTodo({
      title: inputValue,
      isDone: false,
    });

    //prevTodos 代表在調用 setTodos時的todos值
    //調整調用createAPI，將返回的資料帶入更新
    setTodos((prevTodos) => {
      return [
        //舊資料用展開運算式...
        ...prevTodos,
        //加入新資料格式
        {
          id: data.id,
          title: data.title,
          isDone: false,
          isEdit: false,
        },
      ];
    });
    // 儲存後清空欄位
    setInputValue('');
  };

  //TodoCollection
  //確認項目是否被打勾完成
  const handleToggleDone = async (id) => {
    //先找到目前這一筆資料
    const currentTodo = todos.find((todo) => todo.id === id);
    //API更新目前這一筆
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleOnSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              id,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnDelete = async ({ id }) => {
    try {
      await deleteTodo(id);//資料庫已經刪除
      //如下是為了渲染畫面
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handelInput}
        onAddTodo={handleAddTodo}
        onKeyDown={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onSave={handleOnSave}
        onDelete={handleOnDelete}
        onChangeMode={handleOnChangeMode}
      />
      <Footer itemCounts={todos.length} />
    </div>
  );
};

export default TodoPage;
