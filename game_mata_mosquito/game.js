var altura = 0
var largura = 0
var life   = '1'

var level = window.location.search
level = level.replace('?','')

var timeInterval = 1500
var time = 10

if(level === 'easy') {
	timeInterval = 1500
	time = 15
}
else if(level === 'normal') {
	timeInterval = 1250
	time = 30
}
else if (level === 'hard') {
	timeInterval = 750
	time = 45
}
else {
	timeInterval = 500
	time = 60
}

function ajustaTamanhoPalco() {
	altura = window.innerHeight
	largura = window.innerWidth
}

ajustaTamanhoPalco()

var timer = setInterval(function() {
	time--
	if(time < 0) {
		clearInterval(timer)
		clearInterval(createMob)
		window.location.href="victory.html" 
	}
	else {
		document.getElementById('timer').innerHTML = time	
	}
	
}, 1000)
 
function posRandom() {

	//Removing  elements before to crate a new element
	var mosquito = document.getElementById('mosquito') 
	if(mosquito != null) {
		document.getElementById('mosquito').remove()

		if(life > 3 ){
			//Rediret the user to another page, the game over's page.
			window.location.href = 'game_over.html'
		}
		else {
			document.getElementById('life'+life).src="imagens/coracao_vazio.png"
			life++
		}
	}

	var posX = Math.floor(Math.random() * largura) - 90
	var posY = Math.floor(Math.random() * altura) - 90	

	posX = posX < 0 ? 0 : posX
	posY = posY < 0 ? 0 : posY

	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoRandom()+' '+sideRandom()
	mosquito.style.left = posX + 'px'
	mosquito.style.top = posY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function() {
		this.remove()
	}

	document.body.appendChild(mosquito)

	console.log(sideRandom())

}
	
function tamanhoRandom() {
	var classe = Math.floor(Math.random()*3)
	//We don't need a 'break' because the return will stop the
	//process of the function 
	switch(classe) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function sideRandom() {
	var classe = Math.floor(Math.random()*2)
	//We don't need a 'break' because the return will stop the
	//process of the function 
	switch(classe) {
		case 0:
			return 'sideA'

		case 1:
			return 'sideB'
	}
}

