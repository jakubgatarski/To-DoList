const taskAddBtn = document.getElementById("add-task-button");
const taskInput = document.getElementById("input-task");
const taskList = document.getElementById("task-list");
//const ul = document.getElementById("task-list");

let tasks = [];         // array where task as objects are stored

taskAddBtn.addEventListener('click', function () {
    addTask(taskInput.value);         //clicking on button add task to list
});

function addTask(item) {
    if (item !== '') {
        const task = {      //create task as object with 3 params
            id: Date.now(),
            name: item,
            completed: false
        };
        tasks.push(task); //push task to array
        addToLocalStorage(tasks); //refresh local storage

        taskInput.value = ''; //clear input area
    }
}

function createTask(tasks) {
    taskList.innerHTML = ''; //clear everything in ul

    tasks.forEach(function (item) { //
        const checked = item.completed ? 'checked' : null; //check if task is completed

        const li = document.createElement('li'); //creates parent li element for other 2 buttons and span
        //li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id); // set id attribute to easier differentiate tasks

        const input = document.createElement("input");  //creates checkbox as li child
        input.type = 'checkbox';
        li.append(input);

        const span = document.createElement('span'); //creates span as li child
        span.setAttribute("class", "task"); //set class to span
        span.appendChild(document.createTextNode(item.name)); // put task.name inside span <>...</>
        li.append(span);

        const dltBtn = document.createElement("button"); //creates delete button
        dltBtn.setAttribute("class", "delete-btn");
        li.append(dltBtn);

        if (item.completed === true) { //if task completed, creates class to li named checked to put text decoration in css
            li.classList.add('checked')
        }

        taskList.append(li); // adds li with children to <ul>
    });
}

function addToLocalStorage(task) {
    localStorage.setItem("tasks", JSON.stringify(task)); // add task to local storage
    createTask(tasks); // make task visible on screen
}

function getFromLocalStorage() { // when we reload page func gets data from local storage
    const reference = localStorage.getItem('tasks');

    if (reference) {
        tasks = JSON.parse(reference); //convert json data from storage to array a store data inside it
        createTask(tasks);
    }
}

//localStorage.clear();
getFromLocalStorage(); //gets all the data from local storage


taskList.addEventListener('click', function (e) { //looking for click event in all <ul>
    if (e.target.type == 'checkbox') { //check if it is checkbox
        toggle(e.target.parentElement.getAttribute('data-key'));//if true start function to li element with the same id

    }
    if (e.target.classList.contains('delete-btn')) { // if click on dlt button
        deleteTask(e.target.parentElement.getAttribute('data-key')); //start function for task with the same id

    }

});

function toggle(id) { //changes completed state
    tasks.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed; //if item id == id of our button changes state
        }
    });
    addToLocalStorage(tasks); //refresh local storage
}


function deleteTask(id) { //deletes task from array and refresh storage later
    tasks = tasks.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(tasks); //refresh local storage
}


