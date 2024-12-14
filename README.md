# Todolist-react

- 實作 CRUD Todolist
- JSON Server - API 串接
- 身份驗證 - JWT Token API
  筆記路徑（僅本人） https://hackmd.io/-AY00eIDQyCA-nUJFjKFSw?both

## 操作流程

1. 請先確保您的電腦已安裝 Node.js 和 npm。
2. 開啟終端機 (Terminal)，進入您想要存放此專案的本地位置，然後執行以下指令來複製專案：

```
git clone https://github.com/tangcamy/ToDoList-FrontEnd.git
```

3. 進入存放此專案的資料夾，並在終端機中執行以下指令進行相依套件的安裝：

```
npm install
```

4. 安裝完成後，執行以下指令來啟動程式：

```
npm start
```

如果成功執行，您將會看到以下訊息：

```
webpack compiled successfully
```

5. 在瀏覽器中輸入以下網址：http://localhost:3000。即可查看網頁

## 專案結構 src

- index.js:執行 APP
- index.css:網頁基本設定
- App.js 專案：BrowserRouter/Route 路由頁面設定
- App.scss : 頁面基本特性設定（或引入特定字型＆變數設定）
- 資料夾【api】:串接後端 API 設定,此專案用 JSON Server
- 資料夾【assets】:放專案會用到的素材
  - images：放照片
- 資料夾【components】:元件存放
- 資料夾【Pages】:切版頁面

## src/api ：

- res
