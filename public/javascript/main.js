function submit(e){
    var b = document.getElementById("act");
    var q1 = document.getElementById("q1");
    var q2 = document.getElementById("q2");
    var d = document.getElementById("date");
    var res = []
    //var t = document.getElementById("time");
 //var url = Reqeust Url
    
    //var param = a q1 q2 d t 합친 param 
    //a q1 q2 d t를 합쳐서 POST로 보낼 Param 지정하는 식이 있었는데
    //일단 치웠습니다..
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            res = JSON.parse(this.responseText);
            document.getElementById('contents').className = 'container2'
            document.getElementById('contents1').classList = 'container'
            if(res.allCnt == 0 ) {
                document.getElementById('result').innerHTML = '<h1>이 날 운행은 끝났습니다.</h1>'
            } else {
                for(let i = 0; i < res.allCnt; i++) {
                    if(0 == res.alcnAllList[i].TEEN_FEE) {
                        document.getElementById('result').innerHTML += '<tr><td>'+res.alcnAllList[i].DEPR_TIME_DVS+'</td><td>'+res.alcnAllList[i].CACM_MN+'</td><td>'+res.alcnAllList[i].BUS_CLS_NM+'</td><td>'+res.alcnAllList[i].ADLT_FEE+'</td><td>'+res.alcnAllList[i].CHLD_FEE+'</td><td>'+res.alcnAllList[i].ADLT_FEE+'</td><td>'+res.alcnAllList[i].RMN_SATS_NUM+' / '+res.alcnAllList[i].TOT_SATS_NUM+'</td></tr>'
                    } else {
                        document.getElementById('result').innerHTML += '<tr><td>'+res.alcnAllList[i].DEPR_TIME_DVS+'</td><td>'+res.alcnAllList[i].CACM_MN+'</td><td>'+res.alcnAllList[i].BUS_CLS_NM+'</td><td>'+res.alcnAllList[i].ADLT_FEE+'</td><td>'+res.alcnAllList[i].CHLD_FEE+'</td><td>'+res.alcnAllList[i].TEEN_FEE+'</td><td>'+res.alcnAllList[i].RMN_SATS_NUM+' / '+res.alcnAllList[i].TOT_SATS_NUM+'</td></tr>'
                    }
                }
                document.getElementById('time').innerHTML = res.alcnCmnMap.takeDrtm
                document.getElementById('start').innerHTML = document.getElementsByClassName('for')[0].value+'<i class="xi-angle-right-thin xi-fw"></i>'+document.getElementsByClassName('for')[1].value
                let day1 = ['일', '월', '화', '수', '목', '금', '토']
                document.getElementById('day').innerHTML = document.getElementsByClassName('for')[2].value.toString().substring(0,4)+'년 '+document.getElementsByClassName('for')[2].value.toString().substring(4,6)+'월 '+document.getElementsByClassName('for')[2].value.toString().substring(6,8)+'일'
            }
        }
    }
    xhr.open("POST", 'https://www.kobus.co.kr/oprninf/alcninqr/readAlcnSrch.ajax', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    let c = a.rotInfList
    for(let i = 0; i < c.length; i++) {
        if(c[i].arvlNm == document.getElementsByClassName('for')[1].value && c[i].deprNm == document.getElementsByClassName('for')[0].value) {
            c = c[i]
            break
        }
    }
    xhr.send('deprCd='+c.deprCd+'&deprNm='+document.getElementsByClassName('for')[0].value+'&arvlCd='+c.arvlCd+'&arvlNm='+document.getElementsByClassName('for')[1].value+'&crchDeprArvlYn=N&deprDtm='+document.getElementsByClassName('for')[2].value+'&busClsCd=0&prmmDcYn='+c.prmmDcYn);
}
function func(){
    alert("예약하기는 비활성화 되었습니다.");
}
function data(res){
    document.getElementById("time").innerHTML = res.time;
    document.getElementById("data").innerHTML = res.data;
}