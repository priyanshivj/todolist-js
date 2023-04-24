const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList= document.querySelector(".todoList");
const deleteAllBtn= document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //input which user entered
    if(userData.trim()!= 0){   //if user input value is not  only spaces
    addBtn.classList.add("active"); //highlights the add button when input is provided
    }else{
        addBtn.classList.remove("active");// fades the add button when input is removed
    }
}
showTasks(); //calling the function

addBtn.onclick = ()=>{
    let userData = inputBox.value; //input which user entered
    let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
  if(getLocalStorage==null){// if localStorage is null then we will create a blank array.
   listArr= [];
}else{
   listArr= JSON.parse(getLocalStorage); //transforming json string into js object
  }
 listArr.push(userData);// step to push user data.
 localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
 showTasks(); //calling the function
}
// this is the function to add the task provided in the input field to the ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");//getting local storage
    if(getLocalStorage == null)// if localStorage is null then we will create a blank array.
    { listArr= [];
    }else{
     listArr= JSON.parse(getLocalStorage); //transforming json string into js object
    }

    const pendingTasksNumb= document.querySelector(".pendingTasksNumb");
    pendingTasksNumb.textContent=listArr.length //passing the length value(total todo's) value to the (pendingTasksNumb)in html
    if(listArr.length>0){
        deleteAllBtn.classList.add("active");
    }
    
    let newLiTag= '';
    listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML= newLiTag; //ADDING NEW TODO ITEMS IN UL
    inputBox.value="";
}


//delete button function
function deleteTask(index){

    let getLocalStorage = localStorage.getItem("New Todo");
    listArr= JSON.parse(getLocalStorage);
    listArr.splice(index,1); //removing or replacing particular index li

    //after removing li this code will update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); 
    showTasks(); 
}

//clear all task button code

deleteAllBtn.onclick = ()=>{
    listArray = []; //empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
  }