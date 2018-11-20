function submit(e){
    let res = []
    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            res = this.responseText
            console.log(res)
        }
    }
    xhr.open('POST', 'http://bus.go.kr/searchResult6.jsp', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send('searchName=2,'+document.getElementsByClassName('for')[0].value)
}
// function err(err){
//     var r404 = '<div class="alert alert-danger"><b>빈 입력란이 있습니다.</b><br />입력란을 확인해주십시오.</div>';
//     var r500 = '<div class="alert alert-danger><b>HTTP 500 에러</b><br />서버에서 에러가 발생하였습니다.<br />잠시후 다시 시도해주세요.</div>';
//     var r503 = '<div class="alert alert-danger><b>HTTP 503 에러</b><br />서버에서 에러가 발생하였습니다.<br />잠시후 다시 시도해주세요.</div>';
//     var r = '<div class="alert alert-danger><b>알 수 없는 오류가 발생하였습니다.</b><br />잠시후 다시 시도해주세요.</div>'
//     if(err == 404){
//         $("#debug").append(r404);
//         setTimeout(function(){
//             $("#debug").fadeOut("slow");
//         }, 2000);
//         setTimeout(function(){
//             location.reload();
//         }, 3000);
//     }
//     else if(err == 500){
//         $("#debug").append(r500);
//         setTimeout(function(){
//             $("#debug").fadeOut("slow");
//         }, 2000);
//         setTimeout(function(){
//             location.reload();
//         }, 3000);
//     }
//     else if(err == 503){
//         $("#debug").append(r503);
//         setTimeout(function(){
//             $("#debug").fadeOut("slow");
//         }, 2000);
//         setTimeout(function(){
//             location.reload();
//         }, 3000);
//     }
//     else{
//         $("#debug").append(r);
//         setTimeout(function(){
//             $("#debug").fadeOut("slow");
//         }, 2000);
//         setTimeout(function(){
//             location.reload();
//         }, 3000);
//     }
// }