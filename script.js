let production = true; // якщо запуск на сервері то true

let mainDoc = document.querySelector('#main');
let lists = document.querySelectorAll('.navigationList');
let xhr = new XMLHttpRequest();
let myUrl = '';
//mainDoc.innerHTML = 'Start text';
dictionary();

// присвоюємо кожному списку меню ф-ю rout
for(let i = 0; i < lists.length; i++){
	lists[i].onclick = rout;
}

function dictionary(){
	console.log('func dict');
	senderDict();
	refreshStats();
}

function practick(){
	console.log('func practick');

}

function addWord(){
	mainDoc.innerHTML = addWordCreateText();
	document.querySelector("#butInputAdd").onclick = function (){
		senderAdd();
		refreshStats();
	}
	//refreshStats();
}

function category(){
	console.log('func category');
}

//ф-я для надсилання запиту для отримання всіх слів для словника
function senderDict(){
	console.log('Function senderDict is start');
	//mainDoc.innerHTML = dictionaryCreateText();
	if (production == true){
		//production
		myUrl = "http://qwertyfour.zzz.com.ua/dictionary/php/file.php?funk=allWords";
	}
	else{
		//develop
		myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=allWords";
	}
	xhr.open('GET', myUrl, false);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				mainDoc.innerHTML = createAddWordsText(xhr.responseText);
				
			}
		}
	}
	xhr.send();
}

//HTML розмітка для кожної пари слів в словнику
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
			'<div class="strokaDict" onclick="word(event)">' +
				'<div id="strokaEng">' +
					'' + eng +
				'</div>' +
				'<div id="strokaUkr">' +
					'' + ukr +
				'</div>' +
			'</div>'
	}
	text += '</div>';
	//refreshStats();
	return text + createWordOptionsText();
}

function word(event){
	let doc = document.querySelector('#wordNameOptions');
	console.log(event.path[1].innerText);
	doc.innerHTML = event.path[1].innerText.replace('\n', ' - ');
	//document.querySelector('#containerOptionsWord').innerHTML = createWordOptionsText();
	
}

function createWordOptionsText(){
	let text = '';
	text += '<div id="containerOptionsWord">' + 
				'<div id="wordNameOptions">' +
				'</div>' +
				'<div id="buttonDeleteWord" class="wordMenu" onclick="deleteWord()">' +
					'Видалити' +
				'</div>' +
				'<div id="buttonChangeWord" class="wordMenu" onclick="changeWord()">' +
					'Редагувати' +
				'</div>' +
				'<div id="buttonAddToCategory" class="wordMenu">' +
					'Додати до категорії' +
				'</div>' +
			'</div>';
	return text;
}

function deleteWord(){
	let doc = document.querySelector('#wordNameOptions');
	let content = doc.innerText;

	console.log(content);
	if(content == ''){
		alert('Не вибране слово');
	}
	else{
		let fullWord = content;
		content = content.split(' - ')[0];
		console.log(content);
		senderDeleteWord(content, fullWord);
	}
	//console.log(content, doc);
}

function changeWord(){
	console.log('function changeWord is start');
	let doc = document.querySelector('#wordNameOptions');
	let content = doc.innerText;
	
	if(content == ''){
		alert('Не вибране слово');
	}
	else{
		let arr = content.split(' - ');
		let oldEng = arr[0];
		let oldUkr = arr[1];
		document.querySelector('#buttonChangeWord').innerHTML = creteChangeWordText(oldEng, oldUkr);
		document.querySelector('#buttonChangeWord').onclick = '';
		document.querySelector('#butChange').onclick = function (){
			let newEng = document.querySelector('#changeFieldTextEng').value;
			let newUkr = document.querySelector('#changeFieldTextUkr').value;
			senderChange(oldEng,oldUkr, newEng, newUkr);
		}

		//senderChangeWord(fullWord);
	}
	
}

function senderChange(oldEng, oldUkr, newEng, newUkr){
	console.log('Function senderChange is start');
	let param = '&wordOldEng=' + oldEng + '&wordNewEng=' + newEng + '&wordNewUkr=' + newUkr ;


				//dictionary();
	if(production == true){
		//production
		myUrl = "http://qwertyfour.zzz.com.ua/dictionary/php/file.php?funk=changeWord" + param;
	}
	else{
		//develop
		myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=changeWord" + param;
	}
	xhr.open('GET', myUrl, false);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200 ){
				console.log(xhr.responseText);
				dictionary();
				let doc = document.querySelector("#buttonChangeWord");
				doc.innerHTML = 'редагувати';
				doc.onclick = function(){
					changeWord();
				}
				document.querySelector("#containerOptionsWord").innerHTML += time() + '"' +
					oldEng + '-' + oldUkr +  '" було замінено на: ' + '"' + newEng + '-' + newUkr + '"';
				document.querySelector('#wordNameOptions').innerHTML = '';
				
				
				


			}
		}
	}
	xhr.send();
	
}

function creteChangeWordText(eng, ukr){
	let text = '';
	text += '<div id="changeFieldEng" class="changeField">' + 
				'<input type="text" id="changeFieldTextEng" value="' + eng + '"/>' + 
			'</div>' + 
			'<div id="changeFieldEng" class="changeField">' + 
				'<input type="text" id="changeFieldTextUkr" value="' + ukr + '"/>' + 
			'</div>' + 
			'<div id="butChange">' +
				'<input type="button" value="OK" id="butChange" >' +
			'</div>';
	return text;
}

function senderDeleteWord(data, fullWord){
	console.log('Function senderDeleteWord is start');
	let wordEng = data
	let param = '&wordEng=' + wordEng;
	if(production == true){
		//production
		myUrl = "http://qwertyfour.zzz.com.ua/dictionary/php/file.php?funk=deleteWord" + param;
	}
	else{
		//develop
		myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=deleteWord" + param;
	}
	xhr.open('GET', myUrl, true);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200 ){
				let text = xhr.responseText + ';<br>';
				console.log('Response text: ' + text);

				dictionary();
				document.querySelector("#containerOptionsWord").innerHTML += time() + '"' +
					fullWord + '" було видалено';
				document.querySelector('#wordNameOptions').innerHTML = '';


			}
		}
	}
	xhr.send();



}

// ф-я для кнопки додати слово( відсилає запит зі словами)
function senderAdd(){
	console.log('Function senderAdd is start');
	let docWordEng = document.querySelector('#wordEng');
	let docWordUkr = document.querySelector('#wordUkr');
	let wordEng = docWordEng.value;
	let wordUkr = docWordUkr.value;
	let param = '&wordEng=' + wordEng + '&wordUkr=' + wordUkr;
	if(production == true){
		//production
		myUrl = "http://qwertyfour.zzz.com.ua/dictionary/php/file.php?funk=addWord" + param;
	}
	else{
		//develop
		myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=addWord" + param;
	}
	console.log('current url: ' + myUrl);
	xhr.open('GET', myUrl, false);
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
					refreshStats();
				}
				log.style.border = '2px solid orange';
			}
		}
	}
	if(wordEng === ''|| wordUkr === ''){
		document.querySelector('#logAdd').innerHTML = '<span style="color: darkred">' +
			'<span style="font-style: italic; font-weight: bolder">' + time() + '</span>' + 'Не заповнені поля<br></span>' +
			document.querySelector('#logAdd').innerHTML;
		document.querySelector("#logAdd").style.border = '2px solid orange';
	}else{
		xhr.send();
	}
}

//ф-я визначає на який пункт було нажато і запускає відповідну ф-ю
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

//ф-я для відображення часу в логі добавлення слова
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

//HTML розмітка для вкладки добавлення слова
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

//HTML розмітка для вкладки словника
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

//ф-я оновлення статистики
function refreshStats(){
	senderStats();
	
	
}

//HTML розмітка для вкладки статистики
function statsCreateText(data){
	let text = data;
	return text;

}

// ф-я запиту для статистики
function senderStats(){
	console.log('Function sendeStats is start');
	if(production == true){
		//production
		myUrl = "http://qwertyfour.zzz.com.ua/dictionary/php/file.php?funk=getStats";
	}
	else{
		//develop
		myUrl = "http://localhost/www/Projects/Dictionary/file.php?funk=getStats";
	}
	let doc = document.querySelector('#stats');
	xhr.open('GET', myUrl, false);
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				
				doc.innerHTML = statsCreateText(xhr.responseText);
			}
		}
	}
	xhr.send();	
}



// для тестування
//function testBut(dat){
	//let wordEng = document.querySelector('#wordEng').value;
	//console.log(dat);
//}
