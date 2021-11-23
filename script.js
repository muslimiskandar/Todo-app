//Select elements

const clear = document.querySelector(".clear");

const list = document.querySelector("#list");

const input = document.querySelector("#input");

const leftItems = document.querySelector(".left-items");

const mode = document.querySelector(".mode");

//Variables
let myList = [];
let id = 0;
let trash = false;
let done = false;
let count;



//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";



//Add to do function
function addToDo( toDo, id, done, trash ) {
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co complete" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-times de delete" job="delete" id="${id}"></i>
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//Complete to do
function completeToDo ( element ) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    myList[element.id].done = myList[element.id].done ? false : true;

}

//Remove to do
function removeToDo ( element ) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    myList[element.id].trash = true;

}



document.addEventListener("keyup", function(event){
    if( event.keyCode === 13){
        const toDo = input.value;
        
        if(toDo){
            addToDo(toDo, id, false, false);
            myList.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            //Add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(myList));
            count = myList.filter((obj) => obj.done === done && obj.trash === trash).length;
            leftItems.innerHTML = count;
            id++;
        }
        input.value = "";
    }

});


// Target the items dynamically
list.addEventListener("click", function buttonFunc(event){
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;

    if(elementJOB == "complete"){
        completeToDo(element);
    }
    else if (elementJOB == "delete") {
        removeToDo(element);        
    }
    count = myList.filter((obj) => obj.done === done && obj.trash === trash).length;
    leftItems.innerHTML = count;

    //Add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(myList));
})



//Get item from localstorage
let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data){
    myList = JSON.parse(data);
    id = myList.length;
    loadList(myList);
}
//if data is empty
else{
    myList = [];
    id = 0;
}

//Load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Clear localstorage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

count = myList.filter((obj) => obj.done === done && obj.trash === trash).length;
leftItems.innerHTML = count;

document.querySelector('.uncompleted').addEventListener("click", function(){
    const uncomp = myList.filter((obj) => obj.done === done && obj.trash === trash);
    list.innerHTML = uncomp.map(el => `<li class="item">
                    <i class="fa ${UNCHECK} co complete" job="complete" id="${el.id}"></i>
                    <p class="text">${el.name}</p>
                    <i class="fas fa-times de delete" job="delete" id="${el.id}"></i>
                </li>`).join("");
    leftItems.innerHTML = uncomp.length;

})

document.querySelector('.completed').addEventListener("click", function(){
    const comp = myList.filter((obj) => obj.done === true && obj.trash === trash);
    list.innerHTML = comp.map(el => `<li class="item">
                    <i class="fa ${CHECK} co complete" job="complete" id="${el.id}"></i>
                    <p class="text ${LINE_THROUGH}">${el.name}</p>
                    <i class="fas fa-times de delete" job="delete" id="${el.id}"></i>
                </li>`).join("");
    leftItems.innerHTML = comp.length;
})

document.querySelector('.all').addEventListener("click", function(){
    const all = myList.filter((obj) => obj.trash === trash);
    list.innerHTML = all.map(el => `<li class="item">
                    <i class="fa ${el.done === done ? UNCHECK : CHECK} co complete" job="complete" id="${el.id}"></i>
                    <p class="text ${el.done === true ? LINE_THROUGH : ' '}">${el.name}</p>
                    <i class="fas fa-times de delete" job="delete" id="${el.id}"></i>
                </li>`).join("");
    leftItems.innerHTML = all.length;

});

//To switch night/day mode

document.querySelector('.nightmode').addEventListener("click", function(){
    document.querySelector('.nightmode').style.display = "none";
    document.querySelector('.daymode').style.display = "block";
    document.body.classList.add('dark-img')
    document.querySelector('.content').classList.add('dark-background')
    document.querySelector('.center').classList.add('night-shadow')
    document.querySelector('.center').classList.add('dark-background')
    document.querySelector('ul').classList.add('item-in-dark')
    document.querySelector('.add-to-do').classList.add('dark-background')
    document.querySelector('.add-to-do > input').classList.add('input-colorist')
    document.querySelector('.clear').classList.add('hovered')

})
document.querySelector('.daymode').addEventListener("click", function(){
    document.querySelector('.daymode').style.display = "none";
    document.querySelector('.nightmode').style.display = "block";
    document.body.classList.remove('dark-img');
    document.querySelector('ul').classList.remove('item-in-dark')
    document.querySelector('.content').classList.remove('dark-background')
    document.querySelector('.add-to-do').classList.remove('dark-background')
    document.querySelector('.center').classList.remove('night-shadow')
    document.querySelector('.add-to-do > input').classList.remove('input-colorist')
    document.querySelector('.center').classList.remove('dark-background')
    document.querySelector('.clear').classList.remove('hovered')
})
