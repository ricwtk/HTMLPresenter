function getJSON(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send();
  var json = JSON.parse(xmlHttp.responseText);
  return json;
}

function createSlideDiv(json, divLoc) {
  var div = document.createElement('div');
  div.id = json.id;
  div.className = divLoc;
  div.style.background = (json.background == '') ? 'rgb(255,255,255)' : json.background;
  var header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = json.header;
  var content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = json.content;
  var footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = json.footer;
  
  div.appendChild(header);
  div.appendChild(content);
  div.appendChild(footer);
  
  return div;
}