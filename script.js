var todoList = [];
var dueDate=[];
var task=[];
var comdoList = [];
var remList = [];
var dateList=[];
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var todoDate = document.getElementById("todo-date")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected")
addButton.addEventListener("click", add)
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteS)
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.className.split(' ')[0] == 'edit' || e.target.className.split(' ')[0] == 'ed') {
        editTodo(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
    if (e.target.id == "date") {
        viewDate();
    }

})
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete

    })
    remList = todoList.filter((ele) => {
        return !ele.complete
    })
    dateList = todoList.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();

}


function add() {
    var value = todoInput.value;
    var date=todoDate.value;
    if (value === '') {
        alert("😮 Task cannot be empty")
        return;
    }
    if (date === '') {
        alert("😮 Due date cannot be empty")
        return;
    }
    dueDate.push(date);
    task.push(value);
    todoList.push({
        task: value,date:date,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = "";
    todoDate.value="";
    update();
    addinmain(todoList);
}

function addinmain(todoList) {
    allTodos.innerHTML = ""
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <p id="date"> ${element.complete ? `<strike>${element.date}</strike>` : element.date} </p>
    <div class="todo-actions">
                <button class="edit btn btn-edit">
                <i class=" ci bx bx-edit bx-sm"></i>
                </button>
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        allTodos.innerHTML += x
        
    });
}

function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted
    })

    update();
    addinmain(todoList);
}
function editTodo(e) {
    var edited = e.target.parentElement.parentElement.getAttribute('id');
    
    todoList = todoList.filter((ele) => {
        if (ele.id == edited){
        let person = prompt("Please edit your task", ele.task);
        if (person != null) {
             return ele.task=person
        }
    }
    else{
        return ele.task=ele.task
    }
    })
    
    update();
    addinmain(todoList);
}

function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    })

    update();
    addinmain(todoList);
}
function deleteAll(todo) {

    todoList = []
    dueDate=[]
    update();
    addinmain(todoList);

}

function deleteS(todo) {

    todoList = todoList.filter((ele) => {
        return !ele.complete;
    })


    update();
    addinmain(todoList);

}


function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {

    addinmain(remList);
}
function viewAll() {
    addinmain(todoList);
}
function viewDate() {
    addinmain(dateList);
}