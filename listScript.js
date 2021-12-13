let addBtn = document.getElementById("add-task-button");


addBtn.addEventListener("click", function () {
    let ul = document.getElementById("task-list");
    let li = document.createElement("li");
    let task = document.getElementById("input-task").value;
    if (task !== '') {

        ul.appendChild(li);

        let input = document.createElement("input"); //creating input checkbox class item
        input.type = "checkbox";
        li.append(input);

        let span = document.createElement("span"); //create span with task inside
        span.setAttribute("class", "task");
        span.appendChild(document.createTextNode(task));
        li.append(span);

        let dltBtn = document.createElement("button"); // create delete button inside li
        dltBtn.setAttribute("class", "delete-btn");
        li.append(dltBtn);

    }

    document.getElementById("input-task").value = ''; //clear input value after clicking button
});


document.querySelector("#task-list").addEventListener('click', event => {
    if (event.target.matches(".delete-btn")) {
        event.target.parentElement.remove();
    }
});


