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