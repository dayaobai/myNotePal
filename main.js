const {app,BrowserWindow,ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')
const {connectToDatabase, queryDatabase} = require('./db');  // 引入数据库连接


// function writeFile(_,data){
//     fs.writeFileSync('D:/hello.txt',data)
// }

// function readFile(){
//     const res = fs.readFileSync('D:/hello.txt').toString()
//     // console.log('###',res)
//     return res
// }



function createwindow() {
    const win = new BrowserWindow({
        width:1280,
        height:720,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js'),
            nodeIntegration: false,
            contextIsolation:true,
            spellcheck: false // 禁用拼写检查
        }

    })
    // ipcMain.on('file-save', writeFile)
    // ipcMain.handle('file-read', readFile)


    win.loadFile('./pages/index.html');
    win.webContents.openDevTools({ mode: 'bottom' }); 
}

app.on('ready', ()=>{
    createwindow()
    app.on('activate', ()=> {
        if (BrowserWindow.getAllWindows().length === 0) createwindow( ) 
    })
    
})

app.on('window-all-closed', ()=> {
    if (process.platform !== 'darwin') app.quit( )
})


ipcMain.on('btn1', (event) => {
    console.log('btn 1'); // 添加调试日志
    const connection = connectToDatabase(); // 连接数据库
    if (connection) {
        event.reply('db-status', '连接成功'); // 发送消息到渲染进程
    } else {
        event.reply('db-status', '连接失败');
    }
});

ipcMain.on('btn2', (event) => {
    console.log('btn2'); // 添加调试日志
    const sql = "SELECT * FROM interview_records"; // 替换成你的查询
    
    queryDatabase(sql, (err, results) => {
        if (err) {
            event.reply('fetch-data-reply', { success: false, error: err.message });
        } else {
            event.reply('fetch-data-reply', { success: true, data: results });
           
        }
    });
});


ipcMain.on('open-edit-window', () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js'),
            nodeIntegration: false,
            contextIsolation:true,
            spellcheck: false // 禁用拼写检查
        }

    })
    win.loadFile('./pages/edit.html');
    win.webContents.openDevTools({ mode: 'bottom' }); 

});


ipcMain.on('add-record', (event, record) => {
    const sql = `INSERT INTO interview_records 
        (status, company, position, city, salary, progress, additional, summary, actions) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        console.log("触发 sql");
        const connection = connectToDatabase(); // 连接数据库
        connection.query(sql, [
        record.status, record.company, record.position, record.city,
        record.salary, record.progress, record.additional, record.summary, record.actions
    ], (err, results) => {
        if (err) {
            console.error("数据库插入失败:", err);
        } else {
            console.log("记录添加成功，ID:", results.insertId);
            event.reply('add-record-success', { id: results.insertId }); // 发送成功消息到渲染进程
        }
    });
});
