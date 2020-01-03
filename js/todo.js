// create div for new task creation
const createNewTaskDiv = function(){
    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("newTaskDiv");
    document.body.appendChild(newTaskDiv);

    const taskLabel = document.createElement("label");
    taskLabel.textContent = "Task"; 
    taskLabel.htmlFor = "taskInput1"
    newTaskDiv.appendChild(taskLabel);

    const taskInput = document.createElement("input");
    taskInput.classList.add("taskInputC","enterInput");
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
    scheduleInput.classList.add("scheduleInputC","enterInput");
    scheduleInput.id = "tscheduleInputId";
    scheduleInput.name = "tscheduleInput";
    scheduleInput.placeholder = "E.g : 17/09/2019 13:00";
    taskSchedule.appendChild(scheduleInput);
}

createNewTaskDiv();


// handle task creation (get values and show task created)
const handleTaskCreation = function(event){
    if (event.key === "Enter"){
        newTaskDiv = document.querySelector(".newTaskDiv");
        taskValue = document.querySelector("#taskInputId1").value;
        scheduleValue = document.querySelector("#tscheduleInputId").value;
        
        // If the task input not empty
        if (taskValue != ""){
            const identifier = `created_${Date.now()}`;
            const taskCreated = {"taskValue" : taskValue,
                                "scheduleValue" : scheduleValue,
                                "identifier" : identifier}
            
            let taskList = JSON.parse(localStorage.getItem("task")) || [];
            taskList.push(taskCreated);
            localStorage.setItem(`task`,JSON.stringify(taskList));

            //function to show the task
            function showTask(taskV,scheV,identifier) {
                const savedTaskDiv = document.createElement("div");
                savedTaskDiv.classList.add("savedTaskDiv");
                newTaskDiv.insertAdjacentElement("beforebegin",savedTaskDiv) 

                const savedTaskParagraph = document.createElement("p");
                savedTaskParagraph.classList.add("savedTaskValue");
                if (scheV != ""){
                    savedTaskParagraph.textContent = `${taskV} At ${scheV}`;
                }
                else{
                    savedTaskParagraph.textContent = taskV;
                }
    
                savedTaskDiv.appendChild(savedTaskParagraph);
                taskCheckBox = document.createElement("input");
                taskCheckBox.type = "checkbox";
                taskCheckBox.value = identifier;
                savedTaskParagraph.appendChild(taskCheckBox);
                dropImg = document.createElement("input");
                dropImg.type="image";
                dropImg.classList.add("dropImg"); 
                dropImg.dataset.key = identifier;
                dropImg.src = "./img/drop.jpeg";
                savedTaskParagraph.appendChild(dropImg);
               
            }
            return showTask(taskValue,scheduleValue,identifier);
        }
    
        
        
    };
       
}

// Associate Event handler to new task inputs
const newTaskEventListener = function(){
    createInputs = document.querySelectorAll(".enterInput");
    createInputs.forEach(function(element) {
        element.addEventListener("keypress",handleTaskCreation);
    });
}
newTaskEventListener();

// handle task deletion
const handleTaskDrop = function(event){
    if (event.target.className === "dropImg"){
        const target = event.target
        taskId = target.dataset.key;
        
        //Remove from localstorage selected task
        let items = JSON.parse(localStorage.getItem("task")) || [];
        for (var i =0; i<items.length;i++){
            if (items[i].identifier === taskId){
                items.splice(i,1);
            }
        }

        localStorage.setItem(`task`,JSON.stringify(items));
        target.parentElement.parentElement.remove();
    }
        
}

// Associate Event handler delete button
const dropTaskEventListener = function(){
    document.body.addEventListener("click",handleTaskDrop);
}
dropTaskEventListener();

// handle task completion styling
const handleTaskCompleted = function(event){
    
    if (event.target.checked){
        event.target.parentElement.classList.add("linethrough");
    }
    else {
        event.target.parentElement.classList.remove("linethrough");
    }
        
}

// Associate Event handler checkbox completed task
const completedTaskEventListener = function(){
    document.body.addEventListener("change",handleTaskCompleted);
}
completedTaskEventListener();

// Show tasks in the localstorage
const showDataFromStorage = function(){
    let items = JSON.parse(localStorage.getItem("task")) || [];

    //loop on task items and show
    function showTask(taskV,scheV,taskId) {
        const newTaskDiv = document.querySelector(".newTaskDiv");
        const savedTaskDiv = document.createElement("div");
        savedTaskDiv.classList.add("savedTaskDiv");
        // savedTaskDiv.id = `savedTaskDiv${(counter)}`;
        newTaskDiv.insertAdjacentElement("beforebegin",savedTaskDiv) 

        

        const savedTaskParagraph = document.createElement("p");
        // savedTaskParagraph.id = `savedTaskValue${(counter)}`;
        savedTaskParagraph.classList.add("savedTaskValue");
        if (scheV != ""){
            savedTaskParagraph.textContent = `${taskV} At ${scheV}`;
        }
        else{
            savedTaskParagraph.textContent = taskV;
        }

        savedTaskDiv.appendChild(savedTaskParagraph);
        taskCheckBox = document.createElement("input");
        taskCheckBox.type = "checkbox";
        taskCheckBox.value = taskId;
        savedTaskParagraph.appendChild(taskCheckBox);
        dropImg = document.createElement("input");
        dropImg.type="image";
        dropImg.classList.add("dropImg"); 
        dropImg.dataset.key = taskId;
        dropImg.src = "./img/drop.jpeg";
        savedTaskParagraph.appendChild(dropImg);
       
    }
    return items.forEach(element => showTask(element.taskValue,element.scheduleValue,element.identifier)) ;
}
showDataFromStorage();
localStorage.clear();