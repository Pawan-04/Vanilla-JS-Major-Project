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

var taskName = document.querySelector('.addTask input');
var taskArea = document.querySelector('.addTask textarea');
var  taskForm = document.querySelector('.addTask form');

var taskCheck = document.querySelector('.addTask form #check')


taskForm.addEventListener('submit',function(e){
    e.preventDefault();
    currentTask.push({task:taskName.value,isChecked:taskCheck.checked})
    renderTask();
})

var currentTask = []
renderTask();

function renderTask(){
var allTask = document.querySelector('.allTask')
var sum='';
    currentTask.forEach(function(elem){
        sum = sum+ `
                <div class="task">
                    <h4>${elem.task} <span id=${elem.isChecked}>Imp</span></h4>
                    <button class = 'complete'>Mark as complete</button>
                </div>`
    })
    allTask.innerHTML = sum;
}


