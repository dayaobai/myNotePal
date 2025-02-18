console.log("preload");

const { contextBridge, ipcRenderer } = require('electron');

// 通过 contextBridge 向渲染进程暴露 API，保证安全性
contextBridge.exposeInMainWorld('myAPI', {
  // 按钮点击事件，发送 'fetch-data' 事件到主进程
  btn1: () => {
    console.log("触发 btn1");
    ipcRenderer.send('btn1');
  },

  // 监听数据库状态，回调函数处理从主进程接收的 'db-status' 消息
  onDBStatus: (callback) => {
    ipcRenderer.on('db-status', (_event, message) => callback(message));
  },



  // 发送 'fetch-data2' 事件到主进程
  btn2: () => {
    console.log("触发 btn2");
    ipcRenderer.send('btn2');
  },

  // 监听 'fetch-data-reply' 事件，处理主进程返回的数据
  onDataReceived: (callback) => {
    ipcRenderer.on('fetch-data-reply', (event, data) => callback(data));
    
  },

  openEditWindow: () => ipcRenderer.send('open-edit-window'),

  addRecord: (record) => ipcRenderer.send('add-record', record)

});
