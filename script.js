
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
//runFeatures()
// feature


function runTodo(){
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
taskName.value = ''
taskCheck.checked=false
taskArea.value = ''

}
}
//runTodo()


// Daily Planner
function dailyPlanner(){
    var hours = Array.from({length: 18},function(e,i){
    return `<div class="addPlan">
                <p class = 'timeClass'>${i}:00 - ${i+1}:00</p>
                <input placeholder = ... type="text"class="timeInput"/>
            </div>`
})
// console.log(hours)

document.querySelector('.planner-container').innerHTML=hours.join('')






var inp = document.querySelectorAll('.timeInput');
var arr3 =[]

// inp.forEach(function(inputs,ind){
//         arr3.push({key:""})
// })                                                                    NOT REQUIRED
// console.log(arr3)

inp.forEach(function(ele,i){
    ele.addEventListener('input',function(){
        arr3[i] = {key:ele.value}
        console.log(arr3)
        localStorage.setItem('comments',JSON.stringify(arr3))
    })
})

function hr(){
    var data = localStorage.getItem('comments')
    if(data){
            arr3 = JSON.parse(data)
    }
    
    inp.forEach(function(elem,i){
        elem.value = arr3[i]?.key || ""
    })
}
hr()}
//dailyPlanner();


var motivationalContent = document.querySelector('.motivation-content p')
var author = document.querySelector('.motivation-footer h2')

var rand = Math.round(Math.random()*100)

async function quoteApi(){
    let temp = await fetch('https://motivational-spark-api.vercel.app/api/quotes')
    data = await temp.json();
    

motivationalContent.textContent = data[rand]['quote']
author.textContent = data[rand]['author']
}
quoteApi()


