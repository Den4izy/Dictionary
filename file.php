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

if($_GET['funk'] == 'allWords'){
    $sql = 'SELECT * FROM test1';
    $link = mysqli_connect("localhost", "root", "", "dictionary");
    $result = mysqli_query($link, $sql);
    $arr = [];
//    for($i = 0; $i < count(ar); $i++){
//        //$arr[$i] = [];
//        $arr[$i][0] = mysqli_fetch_array($result)['engWord'];
//        $arr[$i][1] = mysqli_fetch_array($result)['ukrWord'];
//    }
    while ($res = mysqli_fetch_array($result)) {

        $arr[] = $res['engWord'].'-'.$res['ukrWord'];

    }

    //$result = $result['engWord'];
    echo json_encode($arr);
}
?>

