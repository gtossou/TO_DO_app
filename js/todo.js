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
        console.log(counter);
        taskValue = document.querySelector("#taskInputId1").value;
        scheduleValue = document.querySelector("#tscheduleInputId1").value;

        if (taskValue != ""){
            counter = counter+1;
            const taskObject = {"taskValue" : taskValue,
                                "scheduleValue" : scheduleValue}

            localStorage.setItem(`task${counter}`,JSON.stringify(taskObject));
            console.log(localStorage.getItem(`task${counter}`));
        }
    
        function showTask(taskV,scheV) {
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
            dropImg = document.createElement("input");
            dropImg.type="image";
            dropImg.classList.add("dropImg"); 
            dropImg.dataset.key = `task${counter}`;
            dropImg.src = "./img/drop.jpeg";
            savedTaskParagraph.appendChild(dropImg);
            console.log(counter);
           
        }
        return showTask(taskValue,scheduleValue);
        
    };
       
    //showTaskSaved(taskValue,scheduleValue);
}

const newTaskEventListener = function(){
    createInputs = document.querySelectorAll(".enterInput");
    createInputs.forEach(function(element) {
        element.addEventListener("keypress",handleTaskCreation);
    });
}

newTaskEventListener();

const handleTaskDrop = function(event){
    
    if (event.target.className === "dropImg"){
        const target = event.target
        taskKey = target.dataset.key;
        // console.log(JSON.parse(localStorage.getItem(taskKey)));
        localStorage.removeItem(taskKey);
        target.parentElement.parentElement.remove();
    }
        // newTaskDiv = document.querySelector(".newTaskDiv");
        // console.log(counter);
        // taskValue = document.querySelector("#taskInputId1").value;
        // scheduleValue = document.querySelector("#tscheduleInputId1").value;

    //     if (taskValue != ""){
    //         counter = counter+1;
    //         localStorage.setItem(`task${counter}`,JSON.stringify({"taskValue" : taskValue,"scheduleValue" : scheduleValue}));
    //         console.log(localStorage.getItem(`task${counter}`));
    //     }
    
    //     function showTask(taskV,scheV) {
    //         const savedTaskDiv = document.createElement("div");
    //         savedTaskDiv.classList.add("savedTaskDiv");
    //         savedTaskDiv.id = `savedTaskDiv${(counter)}`;
    //         newTaskDiv.insertAdjacentElement("beforebegin",savedTaskDiv) 
    //         const savedTaskParagraph = document.createElement("p");
    //         savedTaskParagraph.id = `savedTaskValue${(counter)}`;
    //         savedTaskParagraph.classList.add("savedTaskValue");
        
    //         if (scheV != ""){
    //             savedTaskParagraph.textContent = `${taskV} At ${scheV}`;
    //         }
    //         else{
    //             savedTaskParagraph.textContent = taskV;
    //         }

    //         savedTaskDiv.appendChild(savedTaskParagraph);
    //         dropImg = document.createElement("input");
    //         dropImg.type="image";
    //         dropImg.classList.add("dropImg"); 
    //         dropImg.dataset.key = `task${counter}`;
    //         dropImg.src = "./img/drop.jpeg";
    //         savedTaskParagraph.appendChild(dropImg);
    //         console.log(counter);
           
    //     }
    //     return showTask(taskValue,scheduleValue);
        
    // };
       
    //showTaskSaved(taskValue,scheduleValue);
}

const dropTaskEventListener = function(){
    document.body.addEventListener("click",handleTaskDrop);
}
dropTaskEventListener();