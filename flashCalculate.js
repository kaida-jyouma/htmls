var digit = 0;
var time = 0;
var second = 0;
var checker = 0;
var l = [];
var j, k;
function keyact(){
    if (checker === 0 && event.keyCode === 13) setread();
    else if (checker === 2 && event.keyCode === 13) lcheck(l);
    else if (checker === 0 && event.keyCode === 82 && bk !== 17 && bk !== 18 && bk !== 91) setauto();
    var bk = event.keyCode;
}
function setauto() {
    //format = Math.floor( Math.random() * (max + 1 - min) ) + min;
    digit = document.getElementById('digits').value = Math.floor(Math.random() * (3 + 1 - 1)) + 1;
    if (digit === 3){
        time = document.getElementById('times').value = Math.floor(Math.random() * (8 + 1 - 2)) + 2;
    }else{
        time = document.getElementById('times').value = Math.floor(Math.random() * (20 + 1 - 3)) + 3;
    }
    var rs = (Math.floor(Math.random() * (100 + 1 - 20)) + 20);
    var x = 0;
    if (rs >= 100){
        x = Math.ceil(rs);
        var y = rs - (x * 100);
        second = document.getElementById('seconds').value = x + "." + y;
    }else{
        second = document.getElementById('seconds').value = "0." + rs;
    }
}
function clearparam() {
    document.getElementById('digits').value = "";
    document.getElementById('times').value = "";
    document.getElementById('seconds').value = "";
}
function setread() {
    digit = document.getElementById('digits').value;
    time = document.getElementById('times').value;
    second = document.getElementById('seconds').value;
    checker = 1;
    if (digit !== "" && digit !== 0 && time !== "" && time !== 0 && second !== "" && second !== 0){
        var ck1 = window.confirm("Is this OK?\n" + "digit: " + digit + "\ntime: " + time + "\nseconds: " + second);
        if (ck1) {
            document.getElementById('result').innerHTML = "";
            document.getElementById('restart').innerHTML = "";
            document.getElementById('paramnav').innerHTML = "";
            document.getElementById('btn1').innerHTML = "";
            document.getElementById('digits').disabled = true;
            document.getElementById('times').disabled = true;
            document.getElementById('seconds').disabled = true;
            setTimeout(game([]), 3000);
        }
    }else{
        window.alert("Fill out paramator...");
    }
}
function cl(idname){
    document.getElementById(idname).innerHTML = "";
}
function innerhtml(idname, text){
    document.getElementById(idname).innerHTML = text;
}
function writeans(list_name) {
    checker = 2;
    l = list_name;
    setTimeout(function () {document.getElementById('gamewin').innerHTML = "<h1 class='result1'>answer?</h1>" + '<style type="text/css">.diver{text-align: center;}.btnans{text-align: center;border-color: #000000;border-width: 1px;}.pans01{/*border-color: #000000;border-width: 1px;*/border-style: none;width: 200px;height: 40px;font-size: 25px;}.pans01:focus{outline: none;background-color: #9fc3fd;}</style><div class="diver"><input class="pans01" type="text" id="pans" autofocus="autofocus" placeholder="answer :"><br>' + "<input style='height: 20px;width: 90px;' class='btnans' type='button' value='check' onclick='lcheck(l)'></div>"}, 2000);
}
function show(list_name) {
    var ct002 = 0;
    var l1 = list_name;
    k = setInterval(function () {document.getElementById('gamewin').innerHTML = "<h1 class=number>" + l1[ct002] + "</h1>";ct002 += 1;setTimeout(function() {document.getElementById('gamewin').innerHTML = ""}, (second * 1000));if (ct002 === (parseInt(time))){clearInterval(k);writeans(l1)}}, ((second * 1000) * 2));
}
function game(list_name){
    var ct001 = 6;
    var ls = [];
    var max = Math.pow(10, digit) - 1;
    var min = Math.pow(10, (digit - 1));
    for (i=0;i<time;i++){
        ls.push(Math.floor( Math.random() * (max + 1 - min) ) + min);
    }
    if (list_name.length !== 0){
        ls = list_name;
    }
    console.log("ls", ls);
    console.log("length:", parseInt(time));
    console.log("digit:", parseInt(digit));
    console.log("second", parseFloat(second));
    console.log("sum", sum(ls));
    j = setInterval(function () {document.getElementById('gamewin').innerHTML = "<h1 class='ctd'>" + (ct001 - 1) + "</h1>";ct001 -= 1;setTimeout(function () {document.getElementById('gamewin').innerHTML = ""}, 500);if (ct001 === 0){clearInterval(j);setTimeout(cl('gamewin'), 1500);setTimeout(show(ls), 1000);}}, 1000);
}
function sum(list) {
    var fans = 0;
    for (i=0;i<list.length;i++){
        fans += list[i];
    }
    return fans;
}
function lcheck(list_name) {
    // console.log(list_name);
    checker = 3;
    var pans02 = document.getElementById('pans').value;
    if (pans02 === "retry"){
        checker = 2;
        game(list_name);
    }else{
        pans02 = parseInt(pans02);
        document.getElementById('pans').disabled = true;
        if (pans02 === sum(list_name)){
            document.getElementById('result').innerHTML = "<h1 class='result2'>Correct.</h1>" + "<p class='p-msg'>Your answer: " + pans02 + "</p><p class='p-msg'>Answer: " + sum(list_name) + "</p>";
            console.log("Correct");
            console.warn("Correct");
        }else{
            document.getElementById('result').innerHTML = "<h1 class='result2'>Wrong.</h1>" + "<p class='p-msg'>Your answer: " + pans02 + "</p><p class='p-msg'>Answer: " + sum(list_name) + "</p>";
            console.log("Wrong", "input:" + pans02);
            console.warn("Wrong");
        }
        document.getElementById('digits').disabled = false;
        document.getElementById('times').disabled = false;
        document.getElementById('seconds').disabled = false;
        checker = 0;
        document.getElementById('restart').innerHTML = '<input class="cont" type="button" name="btnres" id="btnres" value="ReStert" onclick="setread()">';
    }
}
function ref(){
    document.getElementById('refshow').innerHTML = "<p class='p-lmsg1'>This game was made by Jyouma KAIDA.</p><p class='p-lmsg1'>You can arange this game for free with my name.</p>";
    setTimeout(function() {document.getElementById('refshow').innerHTML = "";}, 5000);
}
