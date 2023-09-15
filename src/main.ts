import './style.css'

interface Todo{
    readonly id: string,
    title: string,
    checked: boolean
}
const todos: Array<Todo> =[];
const todosContainer = document.querySelector('.todoContainer') as HTMLDivElement;
const todoInput = document.getElementsByName('task')[0] as HTMLInputElement;
const myform = document.getElementById('myform') as HTMLFormElement;

myform.onsubmit=(e)=>{
e.preventDefault();
const todo:Todo={
    title:todoInput.value,
    checked:false,
    id:Date.now().toString(),
}
todos.push(todo);
todoInput.value="";
renderTodo(todos);
}

const generateTodoItem=(title:string,checked:boolean,id:string)=>{
    const todoItem = document.createElement('div')!;
    todoItem.className="todo";

    // Creating checkbox
    const check=document.createElement('input')!;
    check.setAttribute('type','checkbox');
    check.className="checked";
    check.checked=checked;
    check.onchange=()=>{
        todos.find(item=>{
            if(item.id===id)
            item.checked=check.checked;
        })
        todoTitle.className=check.checked ? "textCut":"";
    }

    // Creating title
    const todoTitle = document.createElement('p')!;
    todoTitle.innerText=title;
    todoTitle.className=check.checked ? "textCut":"";

    // Creating delete button
    const deleteBtn = document.createElement('button')!;
    deleteBtn.className="deleteBtn";

    // Delete button functionality
    deleteBtn.onclick=()=>{
        todos.splice(todos.findIndex(item=>item.id===id),1);
        renderTodo (todos);
    }
    // Appending all elements to todoItem
    todoItem.append(check, todoTitle, deleteBtn);
    todosContainer.append(todoItem);
}
const renderTodo=(todos:Todo[])=>{
    todosContainer.innerHTML="";
    todos.forEach(item=>{
        generateTodoItem(item.title,item.checked,item.id)
    })
}