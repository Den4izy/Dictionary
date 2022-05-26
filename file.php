<?php
function conn(){
    $link = mysqli_connect("localhost", "root", "", "dictionary");
    if ($link == false){
        print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
    }
    else {
        //print("Успіх<br>");
    }
    return $link;
}



if($_GET['funk'] == 'addWord'){

    $eng = $_GET['wordEng'];
    $ukr = $_GET['wordUkr'];
    // Тут буде код для добалення в базу даних
    $sql = 'INSERT INTO test1 (engWord, ukrWord) VALUES ("'.$eng .'", "'.$ukr .'")';
    $result = mysqli_query(conn(), $sql);
    $text = 'Слово '.$eng.' добавлено з переводом '.$ukr;
    echo $text;



}
?>

