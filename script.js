const RenderList = () =>
{
    const task_menu = document.querySelector('#task-menu');
    const message = document.querySelector('#input-message');
    const send_button = document.querySelector('#send-message');

    const list = document.querySelector('#list-of-tasks');
    list.classList.add("hide");
    
    send_button.addEventListener("click", () => AddTask(message, list)); 


    const deleteAll = document.createElement('div');
    deleteAll.classList.add("delete-button");
    deleteAll.textContent = "ВИДАЛИТИ ВСЕ";
    deleteAll.addEventListener("click", () => DeleteAll(list)); 
    list.appendChild(deleteAll);
}

const RenderTasks = () =>
{
    const tasks = localStorage.key()
}

const AddTask = (message, list) =>
{
    const welcome = document.querySelector('#welcome');
    if (message.value === "" ) return;
    list.classList.remove("hide");
    welcome.classList.add("hide");

    const group = document.createElement("div");
    group.classList.add("task");
    const task = document.createElement("li");
    task.innerText = message.value;
    console.log(message.value);
    
    const delete_button = document.createElement("div");
    delete_button.innerText = "ВИДАЛИТИ";
    delete_button.classList.add("delete-button");
    delete_button.addEventListener("click", () => DeleteTask(list, group))

    message.value = ""

    group.append(task, delete_button);
    list.appendChild(group)
}


const DeleteTask = (list, el) =>
{
    localStorage.removeItem(el.querySelector("li").innerText);
    const welcome = document.querySelector('#welcome');

    list.removeChild(el)

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
}

RenderList();