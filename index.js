const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  let window = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile("index.html");
}

// アプリケーション起動時の処理
app.whenReady().then(createWindow);

// レンダラープロセスから送られる処理の定義
ipcMain.handle("button-click", (_, count) => {
  // ここで行う処理
  console.log(`メインプロセス: ${count}回目のクリックを検知`);

  // レンダラープロセスに結果を返す
  return {
    count: count,
    message: `${count}回目のクリックを記録しました！`,
  };
});

// Macでもウィンドウが閉じたらアプリを終了するように設定
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
