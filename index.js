
//const toDoList = document.getElementById('list-container');
const toDoList = document.querySelector('#list-container');


const programmStart = () => {
    document.getElementById("submit").addEventListener("click", createListElement);

    const tasksArr =    JSON.parse(localStorage.getItem ("Tasks"));
    console.log(tasksArr);

}

function localstorageSave() {
    const allTasks = document.getElementsByClassName('task-entry');
    const tasksArr = Array.from(allTasks);
    const taskArrvalues = tasksArr.map( task => task.value);
    const json = JSON.stringify(taskArrvalues);
    // console.log(json);
    localStorage.setItem("Tasks", json);
}


const newListElem = () => {
    const newLi = document.createElement("li");
    toDoList.appendChild(newLi);

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('name', 'task');
    newInput.classList = ('task-entry');
    newInput.setAttribute('value', '');
    newInput.setAttribute('readonly', 'readonly');

    newLi.appendChild(newInput);


    const ckb = document.createElement("input");
    ckb.setAttribute("type", "checkbox");
    // ckb.setAttribute("checked", "checked");
    newLi.appendChild(ckb);

    const editButton = createButton('edit-button', 'fa-pencil');
    editButton.addEventListener('click', () => { editListElement(event, newLi); });
    newLi.appendChild(editButton);

    const deleteButton = createButton('delete-button', 'fa-trash-can');
    deleteButton.addEventListener('click', () => { removeListElement(event, newLi); });
    newLi.appendChild(deleteButton);
    return newInput;
}


const createListElement = (event) => {
    
    const inp = newListElem();
    inp.value = document.getElementById('new-task').value;
    document.getElementById('new-task').value = '';
    event.preventDefault();
    localstorageSave();
};

const removeListElement = (event, listElement) => {
    listElement.remove();

    
    localstorageSave();
};

const editListElement = (event, listElement) => {
    event.preventDefault(); // wie form submit am besten verhindern? Woher kommt der Submit überhaupt?
    //console.log(listElement.innerHTML);

    if (listElement.childNodes[2].firstChild.className === "fa-solid fa-floppy-disk") {
        listElement.childNodes[0].setAttribute("readonly", "readonly");
        listElement.childNodes[2].firstChild.className = "fa-solid fa-pencil";
    } else {
        listElement.childNodes[0].removeAttribute("readonly");
        listElement.childNodes[0].focus();
        listElement.childNodes[2].firstChild.className = "fa-solid fa-floppy-disk";
    }

    
    localstorageSave();
};

const checkListElement = (event, listElement) => {
};

let createButton = (className, icon) => {
    const newButton = document.createElement('button');
    newButton.classList = `${className}`;
    newButton.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    return newButton;
};


window.addEventListener("load", programmStart);