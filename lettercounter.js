var b1 = true;
function del(ln, str){
    var k = 0;
    while (true){
        if (ln[k] === str){
            break;
        }
        k += 1;
    }
    ln.splice(k, 1);
    return;
}
function ctln(ln, str){
    var k1 = 0;
    for (i=0;i<ln.length;i++){
        if (ln[i] === str){
            k1 += 1;
        }
    }
    return k1;
}
function start() {
    setTimeout(rtx(), 5);
    setInterval(updateClock(), 7);
}
function countdis(){
    setTimeout(count(), 5);
}
function rtx(){
    var txtf = localStorage.getItem("#stext");
    setTimeout(function() {document.getElementById('tx-paste').value = txtf;document.getElementById('tx-paste').focus();count()}, 10);
}
function zfill(str, dgt){
    if (str.toString().length >= dgt){
        return str;
    }else{
        var odgt = dgt - str.toString().length;
        var lsz = [];
        for (i=0;i<odgt;i++){
            lsz.push("0");
        }
        return lsz.join("") + str.toString();
    }
}
function count(){
    var text = document.getElementById('tx-paste').value;
    var l0 = [];
    // var l1 = [];
    for (i=0;i<text.length;i++) if (text[i] !== "\n") l0.push(text[i]);
    var l1 = text.split(/\r|\s/);
    var ct = text.length;
    var cr = l0.length;
    var val = "";
    var res = l1.filter(function(a) {
        return a !== val;
    });
    var cts = res.length;
    if (text.length === 0) cts = 0;
    var format = "letters: " + cr + " / rows: " + (ct - cr + 1) + " / length: " + ct + " / words: " + cts;
    document.getElementById('win-dis').innerHTML = format;
    var lst = localStorage;
    lst.setItem("#stext", text);
}
function updateClock() {
    var now = new Date();
    var hour = now.getHours();
    var uhour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var year = now.getFullYear();
    var uyear = now.getFullYear();
    var month = now.getMonth() + 1;
    var umonth = now.getMonth() + 1;
    var day = now.getDate();
    var uday = now.getDate();
    var jpnyear = year - 2018;
    if ( hour < 10 ) hour = "0" + hour;
    if ((uhour - 9) <= 0){
        uhour = uhour + 24 - 9;
        if ((uday - 1) <= 0){
            if ((umonth - 1) <= 0){uyear = uyear - 1;}
            else{umonth = umonth - 1;}
        }else{uday = uday - 1;}
    }else{uhour = uhour - 9;}
    if ( minute < 10 ) minute = "0" + minute;
    if ( second < 10 ) second = "0" + second;
    // if (jpnyear = 1) jpnyear = "元";
    function distime(){
        document.getElementById('timeU').innerHTML = year + " (R" + jpnyear + ")  / " + zfill(month, 2) + " / " + day + " , " + hour + " : " + minute + " : " + second + "";
        // document.getElementById('timeU').innerHTML = uyear + "/" + umonth + "/" + uday + " , " + uhour + ":" + minute + ":" + second + " UTC";
    }
    distime();
}
function execCopy(string){
    // 空div 生成
    var tmp = document.createElement("div");
    // 選択用のタグ生成
    var pre = document.createElement('pre');
    // 親要素のCSSで user-select: none だとコピーできないので書き換える
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    // 要素を画面外へ
    var s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    // body に追加
    document.body.appendChild(tmp);
    // 要素を選択
    document.getSelection().selectAllChildren(tmp);
    // クリップボードにコピー
    var result = document.execCommand("copy");
    // 要素削除
    document.body.removeChild(tmp);
    return result;
}
function copy(){
    var textarea = document.getElementById('tx-paste');
    if (execCopy(textarea.value)){
        document.getElementById('tx-paste').select();
        // document.getElementById('pmsg').innerHTML = "text was copied...";
        window.alert('text was copied...');
        // setTimeout(function() {document.getElementById('pmsg').innerHTML = "";}, 2000);
    }else{
        // document.getElementById('pmsg').innerHTML = "text cannot copy...";
        window.alert('text cannot copy...');
        // setTimeout(function() {document.getElementById('pmsg').innerHTML = "";}, 2000);
    }
}
function maxlen(){
    if (b1){
        var len = window.prompt("How long? :");
        document.getElementById('txar').innerHTML = '<textarea id="tx-paste" onkeyup="countdis()" maxlength="' + len + '"></textarea>';
        b1 = false;
    }else{
        document.getElementById('txar').innerHTML = '<textarea id="tx-paste" onkeyup="countdis()"></textarea>';
    }
}