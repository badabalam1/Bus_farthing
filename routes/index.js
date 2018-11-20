const router = require('express').Router()
const request = require('request')
//const ajax = require('../config/config')
const cheerio = require('cheerio')
//const tools = require('../tools/authentication')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
JSON.parse
let bus = ''
let json = ''
let number = []
let time = []
let time1 = []
let time2 = []
let url = []
let name = []
let Kinds = []
let img = []
let result = []
let arr = ['금호고속', '동부고속', '동양고속', '삼화고속', '금호속리산고속', '중앙고속', '천일고속',' 한일고속', '경기고속', '금호고속', '대원고속', '전북고속', '천여고속', '경남여객', '광신고속', '경남고속', '한양고속', '충남고속', '새서울고속']
let arr1 =[ '01', '02', '03', '04', '05', '06', '07', '09', '11', '14', '15', '19', '24', '29', '31', '45', '46', '53', '52', '33']

router.get('/', (req, res) => {
    let json = []
    res.render('index')
})

router.get('/1', (req, res) => {           
    res.render('index1')
})

router.get('/2', (req, res) => {
    res.render('index2', {arr: arr, arr1: arr1})
})

router.get('/3', (req, res) => {
    if(req.param('searchName') != undefined) {
        request.post('http://bus.go.kr/searchResult6.jsp?searchName='+req.param('searchName'), (err, response, html) => {
            let $ = cheerio.load(html)
            let a = $('#introflashDiv > iframe')
            let b = $('.bus_basic > table > tbody > tr > td > p')
            json = a[0].attribs.src
            result = []
            for(let i = 0; i < b.length; i++) {
                result.push(b[i].children[0].data)
            }
            console.log(result)
            res.render('test', {url : url, name : name, Kinds: Kinds,bus: req.param('name'), img: img, json : json, result: result})
        })
    } else {
        res.send('index3')
    }
})

router.post('/3', async (req, res) => {
    try {
        request.post('http://bus.go.kr/searchResult6.jsp', {form: {searchName: "2,"+req.body.searchName}}, (err, response, html) => {   
            let $ = cheerio.load(html)
            let a = $('.bus_num_result')
            let b = $('.bus_num_result > a > p')
            let c = $('.bus_info_result > p')
            let d = $('.bus_num_result > a > img')
            url = []; name = []; Kinds = []; img = [];
            for(let i = 0; i < a.length; i++) {
                url.push(a[i].children[0].attribs.href.slice(17))
                name.push(b[i].children[0].data)
                Kinds.push(c[i].children[0].data)
                img.push(d[i].attribs.src)
            }
            return res.render('test', {url : url, name : name, Kinds: Kinds,bus: req.body.searchName, img: img,json: undefined, result: undefined})
        })
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : message })
    }
})

router.get('/4', (req, res) => {
    if(req.param('name') != undefined) {
        request.post('http://bus.go.kr/searchResult6.jsp', {form: {searchName: "3,"+req.param('name')}}, (err, response, html) => {
            let bb
            let $ = cheerio.load(html)
            let a = $('.stopneme')
            let b = $('.stopneme1')
            let c = $('.stat_info > div > img')
            let d = $('.stat_arr > div > img')
            let e = $('.stat_arr > div')
            if($('.search_result_list_wrap > table > tbody > tr') == undefined) {
                bb = $('.search_result_list_wrap > table > tbody > tr')
                for(let i = 2; i < bb.length; i++) {
                    console.log('2')
                    url.push(bb[i].attribs.onclick.substring(27,29)+','+bb[i].attribs.onclick.substring(33, bb[i].attribs.onclick.length - 18))
                }
            } else {
                bb = $('.search_result_list > table > tbody > tr')
                for(let i = 0; i < bb.length - 1; i++) {
                    console.log('1')
                    url.push(bb[i].children[0].parent.attribs.onclick.substring(27,29)+','+bb[i].children[0].parent.attribs.onclick.substring(33, bb[i].children[0].parent.attribs.onclick.length - 18))
                }
            }
            console.log(url)
            //console.log(bb[0].children[0].parent.attribs.onclick)
            name = []; number = []; img = []
            //console.log(e[3].children[0])
            for(let i = 0; i < a.length; i++) {
                number.push(a[i].children[0].data)
                name.push(b[i].children[0].data.substring(0, b[i].children[0].data.length-14))
                img.push(c[i].attribs.src)
            }
            Kinds = [];
            for(let i = 0; i < d.length; i++) {
                Kinds.push(d[i].attribs.src)
            }
            time = []
            for(let i = 1; i < e.length; i++) {
                //console.log(i)
                if(i % 2 != 0 ) {
                    time.push(e[i].children[0].data)
                }
            }
            for(let i = 0; i < time.length; i = i + 2) {
                let j = 0;
                time1.push(time[i])
                time2.push(time[i+1])
                ++j;
            }
            res.render('test3.ejs', {json: undefined, url: url, name: name, number: number, img: img, Kinds: Kinds, bus: req.param('name'), time1: time1, time2: time2, result: undefined})
        })
    } else if(req.param('number') != undefined){
        //console.log(bus)
        //console.log("3"+bus+","+req.param('number'))
        request.post('http://bus.go.kr/searchResult6.jsp', {form: {searchName: "3"+bus+","+req.param('number')}}, (err, response, html) => {
            let $ = cheerio.load(html)
            let a = $('.stopneme')
            let b = $('.stopneme1')
            let c = $('.stat_info > div > img')
            let d = $('.stat_arr > div > img')
            let e = $('.stat_arr > div')
            let bb = $('.search_result_list > table > tbody > tr')
            name = []; number = []; img = []
            for(let i = 0; i < a.length; i++) {
                number.push(a[i].children[0].data)
                name.push(b[i].children[0].data.substring(0, b[i].children[0].data.length-14))
                img.push(c[i].attribs.src)
                //url.push()
            }
            console.log(bb[0])
            Kinds = [];
            for(let i = 0; i < d.length; i++) {
                Kinds.push(d[i].attribs.src)
            }
            time = []
            //console.log(e.length)
            //console.log(e[1].children[0].data)
            for(let i = 1; i < e.length; i++) {
                //console.log(i)
                if(i % 2 != 0 ) {
                    time.push(e[i].children[0].data)
                }
            }
            //console.log(time)
            for(let i = 0; i < time.length; i = i + 2) {
                let j = 0;
                time1.push(time[i])
                time2.push(time[i+1])
                ++j;
            }
            let aa = $('#introflashDiv > iframe')
            let cc = $('.bus_basic > table > tbody > tr > td')
            console.log(cc[0].children[0].children[0].data)
            json = (aa[0].attribs.src)
            for(let i = 0; i < cc.length; i++) {
                result.push(cc[i].children[0].children[0].data)
            }
            console.log(result)
            res.render('test3', {json: json, url: url, name: name, number: number, img: img, Kinds: Kinds, bus: req.param('bus'), time1: time1, time2: time, result: result})
        })
    }
    res.render('index4', {json: json, url: url, name: name, number: number, img: img, Kinds: Kinds, bus: req.param(number), time1: time1, time2: time2})
})

router.post('/4', async (req, res) => {
    try {
        request.post('http://bus.go.kr/searchResult6.jsp', {form: {searchName: "4,"+req.body.searchName}}, (err, response, html) => {
            let $ = cheerio.load(html)
            let a = $('.sta_name > p')
            let b = $('.sta_num > p')
            let c = $('.stopname_list > table > tbody > tr')
            name = []; number = []; url = []
            for(let i = 0; i < a.length; i++) {
                name.push(a[i].children[0].data)
                number.push(b[i].children[0].data)
                if(i != 0) {
                    url.push(c[i].children[0].parent.attribs.onclick.substring(27, 29) + ',' + c[i].children[0].parent.attribs.onclick.substring(33,38))
                }
            }
            res.render('test2.ejs', {json: undefined, url: url, name: name, number: number, bus: name[0]}); 
        })
    } catch (err) {
        const { message } = err
        res.status(200).json({"result" : message })
    }
})



module.exports = router