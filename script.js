
function runFeatures(){
    var allElems = document.querySelectorAll('.elem');
var OuterElem = document.querySelectorAll('.OuterElem')
var OuterElemBackBtn = document.querySelectorAll('.back')

allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        OuterElem[elem.id].style.display='Block';
    })
});

OuterElemBackBtn.forEach(function(btn){
    btn.addEventListener('click',function(){
        OuterElem[btn.id].style.display = 'none'
    })
})
}
runFeatures()
// feature

var taskName = document.querySelector('.addTask input');
var taskArea = document.querySelector('.addTask textarea');
var  taskForm = document.querySelector('.addTask form');

var taskCheck = document.querySelector('.addTask form #check')


var currentTask = []
currentTask = JSON.parse(localStorage.getItem('arr'))
renderTask();

taskForm.addEventListener('submit',function(e){
    e.preventDefault();
    currentTask.push({task:taskName.value,isChecked:taskCheck.checked,taskArea:taskArea.value})
    localStorage.setItem("arr",JSON.stringify(currentTask))
    renderTask();
})


function renderTask(){
var allTask = document.querySelector('.allTask')
var sum='';
    currentTask.forEach(function(elem){
        sum = sum+ `
        <div class= "summ">
                <div class="task">
                    <h4>${elem.task} <span id=${elem.isChecked}>Imp</span></h4>
                    <button class = 'complete'>Mark as complete</button>
                </div>
                <details>
                    <summary>Task Description</summary>
                    <p>${elem.taskArea}</p>
                    <button class ='del'>Delete</button>
                    </details>
            </div>`
    })
    allTask.innerHTML = sum;

    //Delete
var del = document.querySelectorAll('.del');
del.forEach(function(btn,i){
    btn.addEventListener('click',function(){
        currentTask.splice(i,1)
        localStorage.setItem("arr",JSON.stringify(currentTask))
        renderTask()

    })
});
}




