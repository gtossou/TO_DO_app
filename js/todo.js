//check strings not empty including spaces

let counter = 0;

const createNewTaskDiv = function(){
    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("newTaskDiv");
    document.body.appendChild(newTaskDiv);

    const taskLabel = document.createElement("label");
    taskLabel.textContent = "New Task"; 
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
    scheduleInput.id = "tscheduleInputId1";
    scheduleInput.name = "tscheduleInput1";
    scheduleInput.placeholder = "E.g : 17/09/2019 13:00";
    taskSchedule.appendChild(scheduleInput);
}

createNewTaskDiv();



const handleTaskCreation = function(event){

    if (event.key === "Enter"){
        newTaskDiv = document.querySelector(".newTaskDiv");
        console.log(newTaskDiv);
        taskValue = document.querySelector("#taskInputId1").value;
        scheduleValue = document.querySelector("#tscheduleInputId1").value;

        if (taskValue != ""){
            localStorage.setItem("taskName",{"taskValue" : taskValue,"scheduleValue" : scheduleValue});
        }
        console.log(taskValue);
    
        function create(taskV,scheV) {
            counter =+ 1;
            const savedTaskDiv = document.createElement("div");
            savedTaskDiv.classList.add("savedTaskDiv");
            savedTaskDiv.id = `savedTaskDiv${(counter)}`;
            newTaskDiv.insertAdjacentElement("beforebegin",savedTaskDiv) 
            const savedTaskParagraph = document.createElement("p");
            savedTaskParagraph.id = `savedTaskValue${(counter)}`;
            savedTaskParagraph.classList.add("savedTaskValue");
        
            if (scheV != ""){
                savedTaskParagraph.textContent = `${taskV} At ${scheV}`;
            }
            else{
                savedTaskParagraph.textContent = taskV;
            }

            savedTaskDiv.appendChild(savedTaskParagraph);
            dropImg = document.createElement("img");
            dropImg.classList.add("dropImg"); 
            dropImg.src = "./img/drop.jpeg";
            savedTaskParagraph.appendChild(dropImg);
            console.log(counter);
           
        }
        return create (taskValue,scheduleValue);
        
    };
       
    //showTaskSaved(taskValue,scheduleValue);
}

const addEnterEventListener = function(){
    enterInputs = document.querySelectorAll(".enterInput");
    enterInputs.forEach(function(element) {
        element.addEventListener("keypress",handleTaskCreation)
    });
}

addEnterEventListener();

