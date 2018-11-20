function submit(e) {
    var res = []
    
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            res = JSON.parse(this.responseText)
            console.log(res[0])
            document.getElementById('contents').className = 'container2'
            document.getElementById('contents1').classList = 'container'
            for (let i = 0; i < res.length; i++) {
                document.getElementById('result').innerHTML += '<tr><td>' + res[i].timTim + '</td><td>' + res[i].corPnm + '</td><td>' + res[i].busCodNam + '</td><td>' + res[i].cno + '</td><td>' + res[i].rwnHhTim.slice(-5) + '</td><td>' + res[i].rwnTim + '</td><td>' + res[i].stgNam + '</td></tr>'
            }
        }
    }
    xhr.open("POST", 'https://exp.t-money.co.kr/bis/uat/uia/getTerminalArrivalInfoListJson.do', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send('frTerCod=' + document.getElementsByClassName('for')[0].value + '&sTerminal=' + document.getElementsByClassName('for')[1].value + '&sCorporation=' + document.getElementsByClassName('for')[2].value);
}
function func() {
    alert("예약하기는 비활성화 되었습니다.");
}
function data(res) {
    document.getElementById("time").innerHTML = res.time;
    document.getElementById("data").innerHTML = res.data;
}