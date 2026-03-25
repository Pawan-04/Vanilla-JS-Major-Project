
function runFeatures(){
var allElems = document.querySelectorAll('.elem');
var OuterElem = document.querySelectorAll('.OuterElem')
var OuterElemBackBtn = document.querySelectorAll('.back')

allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        OuterElem[elem.id].style.display='block';
        
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
    sum += `
    <div class="summ">
        <div class="task ${elem.completed ? 'done' : ''}">
            <h4>${elem.task} <span id=${elem.isChecked}>Imp</span></h4>
            <button class='complete'>
                ${elem.completed ? 'Completed' : 'Mark as complete'}
            </button>
        </div>
        <details>
            <summary>Task Description</summary>
            <p>${elem.taskArea}</p>
            <button class='del' style = "background-color:red">Delete</button>
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

// Mark as complete
var complete = document.querySelectorAll('.complete');
complete.forEach(function(btn,i){
    btn.addEventListener('click',function(){
        
       
        currentTask[i].completed = !currentTask[i].completed;

       
        localStorage.setItem("arr",JSON.stringify(currentTask));

       
        renderTask();
    })
});

}
}
runTodo()


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
dailyPlanner();


//MotivationalQuote
function motivationalQuote(){
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

}

motivationalQuote();



function pomodoroTimer(){var start = document.querySelector('.start')
var stop = document.querySelector('.stop')
var reset = document.querySelector('.reset')
var min = document.querySelector('.min')
var sec = document.querySelector('.sec')

var session = document.querySelector('.work')

var isWorking = true;
var totalTime = 25 * 60;



function updateTimer() {
    console.log()
    let mins = Math.floor(totalTime / 60);
    let secs = totalTime % 60

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    min.textContent = mins;
    sec.textContent = secs;

}
updateTimer()


var strInterval = null

stop.addEventListener('click', function () {
    clearInterval(strInterval)
    strInterval = null
})


start.addEventListener('click', function () {
    if (strInterval != null) {
        return;
    }
    strInterval = setInterval(() => {
      totalTime--;

if (totalTime <= 0) {
    clearInterval(strInterval);
    strInterval = null;

    if (isWorking) {
        // Work → Break
        isWorking = false;
        totalTime = 5 * 60;
        session.style.backgroundColor = "red";
        session.textContent = "Break Time";
    } else {
        // Break → Work
        isWorking = true;
        totalTime = 25 * 60;
        session.style.backgroundColor = "green";
        session.textContent = "Work Session";
    }

    updateTimer();
    return;
}
        updateTimer()
        console.log(totalTime)
    }, 1000)
})


reset.addEventListener('click', function () {
    clearInterval(strInterval)
    strInterval = null;
    totalTime = 25 * 60;
    updateTimer();
})

}
pomodoroTimer()
// pomodoroTimer


function weatherSection(){
    var day = document.querySelector('.weather-header h1')
var city = document.querySelector('.weather-header h2')
var temp = document.querySelector('.weather-header2 h1')
var rain = document.querySelector('.weather-header2 h2')
var h3 = document.querySelectorAll('.weather-header2 h3')


// var apiKey = 'API Key'
var cityName = "Delhi"
// openSenseMap API Example

async function fetchWeather(){
    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`);
    var data = await response.json();
    city.innerHTML = data.location.name;
    temp.innerHTML = data.current.temp_c+" °C";
    rain.innerHTML = data.current.condition.text;

    h3[0].innerHTML= "Perception: "+data.current.heatindex_f+'%';
    h3[1].innerHTML= "Rain: "+data.current.windchill_f+"%"

    h3[2].innerHTML="Humadity: "+data.current.humidity+"%";
}
fetchWeather()

var weatherDay = document.querySelector('.weather-header h1')
var weatherDate = document.querySelector('.weather-header p')
function updateDate(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var day = date.getDay()
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    // console.log(day,hours,minutes,seconds)


    if(hours>12){
        hours = hours-12
        weatherDay.innerHTML = `${days[day]}, ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} PM`;
    }
    else{
        weatherDay.innerHTML = `${days[day]}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} AM`;
    }

    weatherDate.innerHTML = `${String(date.getDate()).padStart('2','0')} ${months[date.getMonth()]},${date.getFullYear()}`






    function changeImage(){
        if(hours>0 && hours<10){
        document.querySelector('.weather').style.backgroundImage = "url('https://images.unsplash.com/photo-1762498509471-58f3482089d1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

        }
        else if(hours>10 && hours<18){
        document.querySelector('.weather').style.backgroundImage = "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }
        else if(hours>18 && hours<22){
        document.querySelector('.weather').style.backgroundImage = "url('https://images.unsplash.com/photo-1705516121728-da619fb299a9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        }
    }
    changeImage()
    
}
setInterval(updateDate,1000)
}
weatherSection()



function changeTheme(){
     var flag =1;
     var rootElement = document.documentElement


document.querySelector('.ri-sun-fill').addEventListener('click',function(){
    if (flag == 0) {
            
            rootElement.style.setProperty('--prim', '#0F172A');
            rootElement.style.setProperty('--sec', '#1E293B');
            rootElement.style.setProperty('--tri', '#3B82F6');
            rootElement.style.setProperty('--tri2', '#F8FAFC');
            flag = 1;
        } else if (flag == 1) {
            
            rootElement.style.setProperty('--prim', '#121212');
            rootElement.style.setProperty('--sec', '#1C1C1C');
            rootElement.style.setProperty('--tri', '#D4AF37');
            rootElement.style.setProperty('--tri2', '#FFFFFF');
            flag = 2;
        }  else if (flag == 2) {
            
            rootElement.style.setProperty('--prim', '#2E3440');
            rootElement.style.setProperty('--sec', '#3B4252');
            rootElement.style.setProperty('--tri', '#88C0D0');
            rootElement.style.setProperty('--tri2', '#ECEFF4');
            flag = 4;
        } else if (flag == 3) {
            
            rootElement.style.setProperty('--prim', '#06150D');
            rootElement.style.setProperty('--sec', '#112A1D');
            rootElement.style.setProperty('--tri', '#10B981');
            rootElement.style.setProperty('--tri2', '#F0FDF4');
            flag = 5;
        } else if (flag == 4) {
            
            rootElement.style.setProperty('--prim', '#1C1917');
            rootElement.style.setProperty('--sec', '#292524');
            rootElement.style.setProperty('--tri', '#D97706');
            rootElement.style.setProperty('--tri2', '#FAFAF9');
            flag = 0; 
        }})
    }
    changeTheme()

