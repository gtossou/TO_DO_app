const newTaskDiv = document.createElement("div");
newTaskDiv.classList.add("newTaskDiv");
document.body.appendChild(newTaskDiv);

const taskLabel = document.createElement("label");
taskLabel.textContent = "New Task"; 
taskLabel.htmlFor = "taskInput1"
newTaskDiv.appendChild(taskLabel);

const taskInput = document.createElement("input");
taskInput.classList.add("taskInputC");
taskInput.id = "taskInputId1";
taskInput.name = "taskInput1";
taskInput.placeholder = "E.g : Appeler Rock...";
taskInput.required = true;
taskLabel.appendChild(taskInput);

const taskSchedule = document.createElement("label");
taskSchedule.textContent = "Schedule"; 
taskSchedule.htmlFor = "taskSchedule1"
newTaskDiv.appendChild(taskSchedule);

const scheduleInput = document.createElement("input");
scheduleInput.classList.add("scheduleInputC");
scheduleInput.id = "tscheduleInputId1";
scheduleInput.name = "tscheduleInput1";
scheduleInput.placeholder = "E.g : 17/09/2019 13:00";
taskSchedule.appendChild(scheduleInput);