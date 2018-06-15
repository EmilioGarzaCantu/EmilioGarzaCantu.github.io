var mainRGB = document.querySelector('h1');
var body = document.querySelector('body')
var easyButton = document.querySelector('#easy')
var hardButton = document.querySelector('#hard')
var table = document.querySelector('table')
var newColors = document.querySelector('#newColors')
var header = document.querySelector('#header')
var won = false;
var stat = document.querySelector('#status')
var tboddy = document.querySelector("table tbody")
announce('Welcome!',2000)

mainRGB.textContent = randRgb()
easyButton.style.background = 'white';
randTdColors()
function randRgb(){
	return('RGB('+(Math.floor(Math.random() * 255) + 1) + ', ' + 
		(Math.floor(Math.random() * 255) + 1) + ', ' +
		(Math.floor(Math.random() * 255) + 1)) + ')'
}

function announce(x,y){
	stat.style.opacity = '0'
	stat.textContent=x
    $(stat).stop().clearQueue().fadeTo(500,1)
}

function win(){
	announce('Correct!',3000)
	won = true
	for(i=0;i<table.rows.length;i++){
    	for(o=0;o<table.rows[i].cells.length;o++){
        	table.rows[i].cells[o].style.backgroundColor = mainRGB.textContent
        	$(table.rows[i].cells[o]).fadeTo(1000,1)
        }
    }
    header.style.opacity = '.5'
    header.style.backgroundColor = mainRGB.textContent
    $(header).fadeTo(700,1)
}
function randTdColors(x){
	won = false
	header.style.backgroundColor = ''
	var correctColor = randRgb()
	mainRGB.textContent = correctColor
	for(i=0;i<table.rows.length;i++){
    	for(o=0;o<table.rows[i].cells.length;o++){
        	table.rows[i].cells[o].style.backgroundColor = randRgb()
        	table.rows[i].cells[o].style.opacity = '1'
        }
    }

    rowNum = Math.floor(Math.random() * table.rows.length)
    colNum = Math.floor(Math.random() * 3)
    table.rows[rowNum].cells[colNum].style.backgroundColor = correctColor
}

newColors.addEventListener('click', function(){
	announce('New board set')
	randTdColors()
})
 

easyButton.addEventListener('click', function(){
	announce('Easy mode set', 3000)
	this.style.background = 'white'
	hardButton.style.backgroundColor = ''
	if (table.rows.length == 2){
		table.deleteRow(1)
	}
	randTdColors()

})

hardButton.addEventListener('click', function(){
	announce('Hard mode set', 2000)
	this.style.background = 'white'
	easyButton.style.backgroundColor = ''
	if (table.rows.length == 1){
		table.insertRow(1)
		for(i=0;i<3;i++){
			table.rows[1].insertCell(i)
		}
	}
	randTdColors()

})
tboddy.addEventListener("mousedown", function(event) {
  	var td = event.target;
    if(td.style.backgroundColor == mainRGB.textContent.toLowerCase()){
    	if(!won){
    		win()
    	}
    }
    else {
    	$(td).fadeTo(500,0)
    	announce('Try again!',1000)

    }

})