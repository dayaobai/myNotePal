console.log("render");

const tbody = document.getElementById('question-list');



document.addEventListener('DOMContentLoaded', () => {
    console.log("render.js 加载完成");

    const fetchButton1 = document.getElementById('btn1');
    const addButton = document.getElementById('addbtn');

    // 按钮点击事件，触发数据查询
    fetchButton1.onclick = () => {
        console.log("按钮被点击了！");
        window.myAPI.btn1();
    };

    // 监听数据库连接状态，弹出提示
    window.myAPI.onDBStatus((message) => {
        alert("数据库状态: " + message);
    });

    // 按钮点击事件，触发数据查询
    addButton.onclick = () => {
        console.log("addButton被点击了！");
        window.myAPI.openEditWindow();
    };
            

    myAPI.onDataReceived((data) => {
        if (data.success) {
            console.log("查询完成", data.data);
            renderUsers(data.data);
        } else {
            alert('查询失败: ' + data.error);
        }
    });
    
    const renderUsers = (users) => {
        const tbody = document.getElementById('question-list');
        tbody.innerHTML = ''; // 清空旧数据
        users.forEach(user => {
            const row = `<tr>
                <td>${user.status}</td>
                <td>${user.company}</td>
                <td>${user.position}</td>
                <td>${user.city}</td>
                <td>${user.salary}</td>
                <td>${user.progress}</td>
                <td>${user.additional}</td>
                <td>${user.summary}</td>
                <!--<td><button class="action-btn" data-id="${user.id}">${user.actions}</button></td>-->

                <td><button class="submit-button" 
                data-id="${user.id}">${user.actions}</button></td>
            </tr>`;
            tbody.innerHTML += row;
        });
    };
    



    // 页面加载后自动获取数据
    //fetchQuestions();
});




// 按钮：查询数据
const fetchButton2 = document.getElementById('btn2');
fetchButton2.addEventListener('click', () => {
    alert("查询中...");
    myAPI.btn2();
});


// 监听从主进程返回的数据
myAPI.onDataReceived((data) => {
    if (data.success) {
        console.log("查询完成");

        // 获取表格 tbody 元素
        const tableBody = document.getElementById("question-list");

        // 清空旧数据
        tableBody.innerHTML = '';

        // 遍历查询结果并添加到表格
        data.data.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                
                <td>${user.status}</td>
                <td>${user.company}</td>
                <td>${user.position}</td>
                <td>${user.city}</td>
                <td>${user.salary}</td>
                <td>${user.progress}</td>
                <td>${user.additional}</td>
                <td>${user.summary}</td>
                <td>${user.actions}</td>
                
            `;
            tableBody.appendChild(row);
        });
    } else {
        alert('查询失败: ' + data.error);
    }
});


// 渲染用户列表到 HTML
const renderUsers = (users) => {
    // usersTableBody.innerHTML = ''; // 清空旧数据
 console.log(users.id);
    console.log(users.name);
    console.log(users.email);

 
};