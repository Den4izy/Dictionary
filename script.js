import {addWordCreateText} from "./content/addWord/addWordTextContent.js";

let mainDoc = document.querySelector('#main');
let lists = document.querySelectorAll('.navigationList');
let xhr = new XMLHttpRequest();

mainDoc.innerHTML = 'Hello';

for(let i = 0; i < lists.length; i++){
	lists[i].onclick = rout;
}

function dictionary(){
	console.log('func dict');
}

function practick(){
	console.log('func practick');

}

function addWord(){
	mainDoc.innerHTML = addWordCreateText()
	console.log('func addWord');
	// xhr.open('GET', 'http://localhost/www/Projects/Dictionary/file.php?func=addWord', true);
	// xhr.onreadystatechange = function (){
	// 	if(xhr.readyState === 4){
	// 		if(xhr.status === 200 ){
	// 			let text = xhr.responseText;
	// 			mainDoc.innerHTML = text;
	// 		}
	// 	}
	// }
	// xhr.send();
}

function category(){
	console.log('func category');
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