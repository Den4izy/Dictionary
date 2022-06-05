<?php

header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin: *');

function conn(){
	//develop
    $link = mysqli_connect("localhost", "root", "", "dictionary");
	
	//production
	//$link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");
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
    $sql = 'INSERT INTO test1 (engWord, ukrWord) VALUES ("'.$eng .'", "'.$ukr .'")';
    $result = mysqli_query(conn(), $sql);
    $text = 'Слово '.$eng.' добавлено з переводом '.$ukr;
    echo $text;
}

if($_GET['funk'] == 'allWords'){
    $sql = 'SELECT * FROM test1';
	//develop
    $link = mysqli_connect("localhost", "root", "", "dictionary");
	
	//production
	//$link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");

    $result = mysqli_query($link, $sql);
    $arr = [];
    while ($res = mysqli_fetch_array($result)) {
        $arr[] = $res['engWord'].'-'.$res['ukrWord'];
    }
    echo json_encode($arr);
}

if($_GET['funk'] == 'deleteWord'){
    //develop
    $link = mysqli_connect("localhost", "root", "", "dictionary");
    //production
    //$link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");
    $eng = $_GET['wordEng'];

    //production
    $sql = 'DELETE FROM dictionary WHERE engWord ="'.$eng.'"';

    //develop
    //$sql = 'DELETE FROM test1 WHERE engWord ="'.$eng.'"';

    if (mysqli_query($link, $sql)) {
        echo "Запись успешно удалена";
    } else {
        echo "Ошибка при удалении записи: " . mysqli_error($link);
    }

}

if($_GET['funk'] == 'getStats'){
    //develop
    //$link = mysqli_connect("localhost", "root", "", "dictionary");
    //$sql = 'SELECT COUNT(*) FROM test1';

    //production
    $link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");
    $sql = 'SELECT COUNT(*) FROM dictionary';

    if (mysqli_query($link, $sql)) {
        $result = mysqli_query($link, $sql);
        echo "Кількість слів - ".$result;
    }
    else {
        echo "Помилка при зчитуванні статистики: " . mysqli_error($link);
    }
}

if($_GET['funk'] == 'changeWord'){
    $oldEng = $_GET['wordOldEng'];
    $eng = $_GET['wordNewEng'];
    $ukr = $_GET['wordNewUkr'];
    //develop
    //$link = mysqli_connect("localhost", "root", "", "dictionary");
    //$sql = 'SELECT COUNT(*) FROM test1';

    //production
    $link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");
    $sql = 'UPDATE dictionary
    SET engWord="'.$eng.'", ukrWord="'.$ukr.'" WHERE engWord="'.$oldEng.'"';

    if (mysqli_query($link, $sql)) {
        $result = mysqli_query($link, $sql);
        echo "OK";
    }
    else {
        echo "Помилка при зчитуванні статистики: " . mysqli_error($link);
    }
}





?>

