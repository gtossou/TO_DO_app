const newTaskDiv = document.querySelector(".new-task-div");
getSavedTasks().forEach(task => showTask(task));

createInputs = document.querySelectorAll("input");
createInputs.forEach(function(element) {
    element.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            const taskValue = document.querySelector("#task-input-id-1").value;
            const scheduleValue = document.querySelector("#t-schedule-input-id").value;
    
            // If the task input not empty
            if (taskValue != "") {
                const identifier = `created_${Date.now()}`;
                const taskCreated = {
                    taskValue: taskValue,
                    scheduleValue: scheduleValue,
                    identifier: identifier
                };
    
                let taskList = JSON.parse(localStorage.getItem("task")) || [];
                taskList.push(taskCreated);
                localStorage.setItem(`task`, JSON.stringify(taskList));
                showTask(taskCreated);
            }
        }
    });
});

function getSavedTasks() {
	return JSON.parse(localStorage.getItem("task")) || [];
}

function showTask(task) {
	const savedTaskDiv = document.createElement("div");
	savedTaskDiv.classList.add("saved-task-div");
	// savedTaskDiv.id = `savedTaskDiv${(counter)}`;
	newTaskDiv.appendChild(savedTaskDiv);

	const savedTaskParagraph = document.createElement("p");
	// savedTaskParagraph.id = `savedTaskValue${(counter)}`;
	savedTaskParagraph.classList.add("saved-task-value");
	if (task.scheduleValue != "") {
		savedTaskParagraph.textContent = `${task.taskValue} At ${task.scheduleValue}`;
	} else {
		savedTaskParagraph.textContent = task.taskValue;
	}

    const checkbox = createCheckbox(task);
    const deleteImg = createDeleteButton(task);
    savedTaskDiv.appendChild(savedTaskParagraph);
    savedTaskParagraph.appendChild(checkbox);
    savedTaskParagraph.appendChild(deleteImg);


	
}

function createCheckbox(task){
    const taskCheckBox = document.createElement("input");
	taskCheckBox.type = "checkbox";
	taskCheckBox.value = task.identifier;
	taskCheckBox.addEventListener("change", function(event) {
		if (event.target.checked) {
			event.target.parentElement.classList.add("linethrough");
		} else {
			event.target.parentElement.classList.remove("linethrough");
		}
    });
    
    return taskCheckBox;
}

function createDeleteButton(task){
    const dropImg = document.createElement("input");
	dropImg.type = "image";
	dropImg.classList.add("drop-img");
	dropImg.dataset.key = task.identifier;
	dropImg.src = "./img/drop.jpeg";
	dropImg.addEventListener("click", function(event) {
		if (event.target.className === "drop-img") {
			const target = event.target;
			taskId = target.dataset.key;

			//Remove from localstorage selected task
			let items = JSON.parse(localStorage.getItem("task")) || [];
			for (var i = 0; i < items.length; i++) {
				if (items[i].identifier === taskId) {
					items.splice(i, 1);
				}
			}

			localStorage.setItem(`task`, JSON.stringify(items));
			target.parentElement.parentElement.remove();
		}
    });
    return dropImg;

}
