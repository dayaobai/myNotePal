

document.addEventListener('DOMContentLoaded', () => {
    console.log("edit.js 加载完成");
    const form = document.getElementById('editForm');
    console.log("表单对象:", form);

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // 阻止表单默认提交
            console.log("submit被点击了！");

            const record = {
                status: document.getElementById('status').value,
                company: document.getElementById('company').value,
                position: document.getElementById('position').value,
                city: document.getElementById('city').value,
                salary: document.getElementById('salary').value,
                progress: document.getElementById('progress').value,
                additional: document.getElementById('additional').value,
                summary: document.getElementById('summary').value,
                actions: document.getElementById('actions').value,
            };
            console.log("提交数据:", record); // 确保数据获取成功
            window.myAPI.addRecord(record);

        });
    } else {
        console.error("未找到表单！");
    }
});
