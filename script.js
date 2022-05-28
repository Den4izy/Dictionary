let mainDoc = document.querySelector('#main');
let lists = document.querySelectorAll('.navigationList');
let xhr = new XMLHttpRequest();
mainDoc.innerHTML = 'Start text';

// присвоюємо кожному списку меню ф-ю rout
for(let i = 0; i < lists.length; i++){
	lists[i].onclick = rout;
}

function dictionary(){
	console.log('func dict');
	senderDict();
}

function practick(){
	console.log('func practick');

}

function addWord(){
	mainDoc.innerHTML = addWordCreateText();
	document.querySelector("#butInputAdd").onclick = function (){
		senderAdd();
	}
}

function category(){
	console.log('func category');
}

function senderDict(){
	console.log('Function senderDict is start');
	//mainDoc.innerHTML = dictionaryCreateText();


	let myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=allWords";
	xhr.open('GET', myUrl, true);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				mainDoc.innerHTML = createAddWordsText(xhr.responseText);
			}
		}
	}
	xhr.send();
}

function createAddWordsText(data){
	let text = dictionaryCreateText();
	let arr = JSON.parse(data)
	//console.log(JSON.parse(data));
	text += '<div id="containerWords">';
	for(let i = 0; i < arr.length; i++){
		let arrWords = arr[i].split('-');
		let eng = arrWords[0];
		let ukr = arrWords[1];
		text +=
			'<div id="strokaDict">' +
				'<div id="strokaEng">' +
					'' + eng +
				'</div>' +
				'<div id="strokaUkr">' +
					'' + ukr +
				'</div>' +
			'</div>'
	}
	text += '</div>';
	return text;
}

// ф-я для кнопки додати слово( відсилає запит зі словами)
function senderAdd(){

	console.log('Function senderAdd is start');
	let docWordEng = document.querySelector('#wordEng');
	let docWordUkr = document.querySelector('#wordUkr');
	let wordEng = docWordEng.value;
	let wordUkr = docWordUkr.value;
	let param = '&wordEng=' + wordEng + '&wordUkr=' + wordUkr;
	let myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=addWord" + param;
	console.log('current url: ' + myUrl);
	xhr.open('GET', myUrl, true);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200 ){
				let text = xhr.responseText + ';<br>';
				console.log('Response text: ' + text);
				docWordEng.value = '';
				docWordUkr.value = '';

				let log = document.querySelector('#logAdd');
				log.innerHTML = '<span style="font-style: italic; font-weight: bolder">' + time() + '</span>' + text + log.innerHTML;
				document.querySelector("#butInputAdd").onclick = function (){
					senderAdd();
				}
				log.style.border = '2px solid orange';
			}
		}
	}
	if(wordEng === ''|| wordUkr === ''){
		document.querySelector('#logAdd').innerHTML = '<span style="color: darkred">' +
			'<span style="font-style: italic; font-weight: bolder">' + time() + '</span>' + 'Не заповнені поля<br></span>' +
			document.querySelector('#logAdd').innerHTML;
		document.querySelector("logAdd").style.border = '2px solid orange';
	}else{
		xhr.send();
	}

}

function rout(event){
	switch (event.target.innerText){
		case 'Словник':
			dictionary();
			break;
		case 'Практика':
			practick();
			break;
		case 'Додати слово':
			addWord();
			break;
		case 'Категорії':
			category();
			break;
	}
	
}

function time(){
	let data = new Date();
	let h = data.getHours();
	let m = data.getMinutes();
	let s = data.getSeconds();
	if(h < 10){
		h = '0' + h;
	}
	if(m < 10){
		m = '0' + m;
	}
	if(s < 10){
		s = '0' + s;
	}
	let text = h + ':' + m + ':' + s + ': ';


	return text;
}

// HTML розмітка для вкладки добавлення слова
function addWordCreateText(){
	let text = '';
	text += '' +
		'<div id="containerAdd">' +
			'<div id="nameAdd">' +
				'Добавте слово' +
			'</div>' +
			'<div id="wordsAdd">' +
				'<div id="engAdd">' +
					'<div id="englishLabelAdd">' +
						'<h2>English</h2>' +
					'</div>' +
					'<div id="englishTextAdd">' +
						'<input type="text" id="wordEng" class="textInputAdd"/>' +
					'</div>' +
				'</div>' +
				'<div id="ukrAdd">' +
					'<div id="ukraineLabelAdd">' +
						'<h2>Ukraine</h2>' +
					'</div>' +
					'<div id="englishTextAdd">' +
						'<input type="text" id="wordUkr" class="textInputAdd"/>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="butAdd">' +
				'<input type="button" value="OK" id="butInputAdd" >' +
			'</div>' +
			'<div id="logAdd">' +

			'</div>' +
		'</div>'
	;
	return text;
}

function dictionaryCreateText(){
	let text = '<div id="containerDict">' +
					'<div id="headerDict">' +
						'<div id="headerEngDict">' +
							'English' +
						'</div>' +
						'<div id="headerUkrDict">' +
							'Ukraine' +
						'</div>' +
					'</div>' +
				'</div>' ;

	return text;
}





// для тестування
//function testBut(dat){
	//let wordEng = document.querySelector('#wordEng').value;
	//console.log(dat);
//}
