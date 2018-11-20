'use strict';

function initDatePicker() {
  var allElements = document.getElementsByTagName('*');

  for (var i = 0; i < allElements.length; i++) {
    var className = allElements[i].className;
    if (className == 'datepicker' || className.indexOf('datepicker ') != -1 || className.indexOf(' datepicker') != -1)
      allElements[i].setAttribute('onclick', 'return showDatePicker("' + allElements[i].id + '")');
  }
}

function showDatePicker(id) {
  var nodeTarget = document.getElementById(id);

  // See if the date picker is already there, if so, remove it
  var x = nodeTarget.parentNode.getElementsByTagName('div');
  for (var i = 0; i < x.length; i++) {
    if (x[i].getAttribute('class') == 'datepickerdropdown') {
      nodeTarget.parentNode.removeChild(x[i]);
      return false;
    }
  }

  document.body.addEventListener('click', function(e) {
    if (e.relatedTarget != null && e.relatedTarget.getAttribute('class') != 'datepickerdropdown') {

      var x = nodeTarget.parentNode.getElementsByTagName('div');
      for (var i = 0; i < x.length; i++) {
        if (x[i].getAttribute('class') == 'datepickerdropdown') {
          nodeTarget.parentNode.removeChild(x[i]);
          return false;
        }
      }

    }
  }, false);

  var date = getDateFromString(nodeTarget.value);
  if (isNaN(date.getTime()))
    date = new Date();

  var div = document.createElement('div');
  div.className = 'datepickerdropdown';
  div.dataset.target = id;
  createCalendar(div, date);
  insertAfter(div, nodeTarget);
  return false;
}

function chooseDate(e) {
  var targ; // Crossbrowser way to find the target (http://www.quirksmode.org/js/events_properties.html)
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

  var div = targ.parentNode.parentNode.parentNode.parentNode.parentNode;
  var nodeTarget = document.getElementById(div.dataset.target); 

  if (targ.value == '<' || targ.value == '>' || targ.value == '<<' || targ.value == '>>') {
    createCalendar(div, getDateFromString(targ.dataset.date));
    return;
  }
  nodeTarget.value = targ.dataset.date;
  div.parentNode.removeChild(div);
}

function createCalendar(div, month) {
  var nodeTarget = document.getElementById(div.dataset.target);
  var min = getMin(div.dataset.target);
  var max = getMax(div.dataset.target);

  var tbl = document.createElement('table');
  var topRow = tbl.insertRow(-1);

  var td = topRow.insertCell(-1);
  var lastYearBn = document.createElement('input');
  lastYearBn.type = 'button';
  td.appendChild(lastYearBn);
  lastYearBn.value = '<<';
  lastYearBn.onclick = chooseDate;
  lastYearBn.dataset.date = getDateString(new Date(month.getFullYear(), month.getMonth() - 12, 1, 0, 0, 0, 0));
  if (min != null && getDateFromString(min).getFullYear() == month.getFullYear())
    lastYearBn.disabled = true;

  var td = topRow.insertCell(-1);
  var lastMonthBn = document.createElement('input');
  lastMonthBn.type = 'button';
  td.appendChild(lastMonthBn);
  lastMonthBn.value = '<';
  lastMonthBn.onclick = chooseDate;
  lastMonthBn.dataset.date = getDateString(new Date(month.getFullYear(), month.getMonth() - 1, 1, 0, 0, 0, 0));
  if (min != null && getDateFromString(min).getFullYear() == month.getFullYear() && getDateFromString(min).getMonth() == month.getMonth())
    lastMonthBn.disabled = true;

  var td = topRow.insertCell(-1);
  td.colSpan = 3;
  var mon = document.createElement('input');
  mon.type = 'text';
  td.appendChild(mon);
  mon.value = getMonthYearString(month);
  mon.setAttribute('readonly', 'readonly');
  mon.className = 'monthDsp';

  var td = topRow.insertCell(-1);
  var nextMonthBn = document.createElement('input');
  nextMonthBn.type = 'button';
  td.appendChild(nextMonthBn);
  nextMonthBn.value = '>';
  nextMonthBn.onclick = chooseDate;
  nextMonthBn.dataset.date = getDateString(new Date(month.getFullYear(), month.getMonth() + 1, 1, 0, 0, 0, 0));
  if (max != null && getDateFromString(max).getFullYear() == month.getFullYear() && getDateFromString(max).getMonth() == month.getMonth())
    nextMonthBn.disabled = true;

  var td = topRow.insertCell(-1);
  var nextYearBn = document.createElement('input');
  nextYearBn.type = 'button';
  td.appendChild(nextYearBn);
  nextYearBn.value = '>>';
  nextYearBn.onclick = chooseDate;
  nextYearBn.dataset.date = getDateString(new Date(month.getFullYear(), month.getMonth() + 12, 1, 0, 0, 0, 0));
  if (max != null && getDateFromString(max).getFullYear() == month.getFullYear())
    nextYearBn.disabled = true;

  var daysRow = tbl.insertRow(-1);
  daysRow.insertCell(-1).innerText = '일';
  daysRow.insertCell(-1).innerText = '월';  
  daysRow.insertCell(-1).innerText = '화';
  daysRow.insertCell(-1).innerText = '수';
  daysRow.insertCell(-1).innerText = '목';
  daysRow.insertCell(-1).innerText = '금';
  daysRow.insertCell(-1).innerText = '토';
  daysRow.className = 'daysRow';

  var selected = getDateFromString(nodeTarget.value); 
  var today = new Date();
  var date = new Date(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());

  while (true) {
    var tr = tbl.insertRow(-1);
    for (var i = 0; i < 7; i++) {
      var td = tr.insertCell(-1);
      var inp = document.createElement('input');
      inp.type = 'button';
      td.appendChild(inp);
      inp.value = date.getDate();
      inp.onclick = chooseDate;
      inp.dataset.date = getDateString(date);
      if (date.getMonth() != month.getMonth()) {
        if (inp.className) inp.className += ' ';
        inp.className += 'othermonth';
      }
      if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()) {
        if (inp.className) inp.className += ' ';
        inp.className += 'today';
      }
      if (!isNaN(selected) && date.getDate() == selected.getDate() && date.getMonth() == selected.getMonth() && date.getFullYear() == selected.getFullYear()) {
        if (inp.className) inp.className += ' ';
        inp.className += 'selected';
      }

      if (min != null && parseInt(min) > parseInt(getDateString(date))) {
        if (inp.className) inp.className += ' ';
        inp.className += 'outofrange';
        inp.disabled = true;
      }

      if (max != null && parseInt(max) < parseInt(getDateString(date))) {
        if (inp.className) inp.className += ' ';
        inp.className += 'outofrange';
        inp.disabled = true;
      }

      date.setDate(date.getDate() + 1);
    }
    
    if (date.getMonth() != month.getMonth())
      break;
  }
  
  // At the end, we do a quick insert of the newly made table, hopefully to remove any chance of screen flicker
  if (div.hasChildNodes()) // For flicking between months
    div.replaceChild(tbl, div.childNodes[0]);
  else // For creating the calendar when they first click the icon
    div.appendChild(tbl);
}

function getDateString(dt) {
  var year = dt.getFullYear().toString();
  var month = dt.getMonth() + 1;
  month = (month < 10 ? '0' + month : month).toString();
  var day = dt.getDate();
  day = (day < 10 ? '0' + day : day).toString();

  return year + month + day;
}

function getMonthYearString(dt) {
  var year = dt.getFullYear().toString();
  var month = dt.getMonth() + 1;
  month = (month < 10 ? '0' + month : month).toString();

  return year + '년 ' + month + '월';
}

function getDateFromString(d) {
  if (typeof d != 'string' || d == '' || d.length != 8 || isNaN(parseNumberStrictly(d))) 
    return new Date('NotADate');

  var year = d.substr(0, 4);
  var month = d.substr(4, 2);
  var day = d.substr(6, 2);

  return new Date(year + '-' + month + '-' + day);
}

function getMin(id) {
  var nodeTarget = document.getElementById(id);
  var date_min = nodeTarget.dataset.min;
  if (!isNaN(getDateFromString(date_min)))
    return date_min;

  return null;
}

function getMax(id) {
  var nodeTarget = document.getElementById(id);
  var date_max = nodeTarget.dataset.max;
  if (!isNaN(getDateFromString(date_max)))
   return date_max;

 return null;
}

function parseNumberStrictly(value) {
  if(/^(\-|\+)?([0-9]+)$/.test(value))
    return Number(value);
  return NaN;
}

function insertAfter(newNode, referenceNode) {
  if (referenceNode.nextSibling)
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling); 
  else
    referenceNode.parentNode.appendChild(newNode);
}