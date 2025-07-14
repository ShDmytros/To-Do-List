const TASKS_LIST_SAVED = "tasks-list"


const RenderList = () =>
{
    const message = document.querySelector('#input-message');
    const send_button = document.querySelector('#send-message');

    const list = document.querySelector('#list-of-tasks');
    list.classList.add("hide");
    
    send_button.addEventListener("click", () => AddInputTask(list, message)); 

    const deleteAll = document.createElement('div');
    deleteAll.classList.add("delete-button");
    deleteAll.textContent = "ВИДАЛИТИ ВСЕ";
    deleteAll.addEventListener("click", () => DeleteAll(list)); 
    list.appendChild(deleteAll);

    RenderTasks(list);
};


const AddInputTask = (list, message) =>
{
    if (message.value === "" ) return;
    AddTask(list, message.value);
    message.value = "";
};


const AddTask = (list, text) =>
{
    const welcome = document.querySelector('#welcome');
    list.classList.remove("hide");
    welcome.classList.add("hide");

    const group = document.createElement("div");
    group.classList.add("task");
    const task = document.createElement("li");
    task.innerText = text;
    
    const delete_button = document.createElement("div");
    delete_button.innerText = "ВИДАЛИТИ";
    delete_button.classList.add("delete-button");
    delete_button.addEventListener("click", () => DeleteTask(list, group))

    group.append(task, delete_button);
    list.appendChild(group);

    UpdateTasks(list);
};


const DeleteTask = (list, el) =>
{
    const welcome = document.querySelector('#welcome');

    list.removeChild(el)

    UpdateTasks(list);

    if (list.querySelectorAll('.task').length === 0)
    {
        welcome.classList.remove("hide");
        list.classList.add("hide");
    }
}


const DeleteAll = (list) =>
{
    const tasks = list.querySelectorAll('.task');
    tasks.forEach(task => DeleteTask(list, task));
};


const UpdateTasks = (tasks_div) => 
{
    const tasks_li = tasks_div.querySelectorAll("li");
    const tasks = [];

    tasks_li.forEach(li => tasks.push(li.textContent.trim()));

    localStorage.setItem(TASKS_LIST_SAVED, JSON.stringify(tasks));

    if (JSON.parse(localStorage.getItem(TASKS_LIST_SAVED)).length === 0) localStorage.removeItem(TASKS_LIST_SAVED);
};


const GetTasks = () => JSON.parse(localStorage.getItem(TASKS_LIST_SAVED)) || [];


const RenderTasks = (list) =>
{
    tasks = GetTasks();
    
    tasks.forEach(task => AddTask(list, task));
}


RenderList();