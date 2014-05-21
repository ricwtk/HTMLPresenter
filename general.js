function slideShadow(opac) {
  return '0 0 10px rgba(255, 100, 100, ' + opac + ')';
}

function getJSON(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send();
  var json = JSON.parse(xmlHttp.responseText);
  return json;
}

function createSlideDiv(json, divLoc) {
  var divHolder = document.createElement('div');
  divHolder.id = json.id;
  divHolder.className = divLoc + 'Holder';
  var div = document.createElement('div');
  div.className = divLoc;
  div.style.background = (json.background == '') ? 'rgb(255,255,255)' : json.background;
  div.style.width = '1024px';
  div.style.height = '768px';
  
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
  
  divHolder.appendChild(div);
  return divHolder;
}

function createConfig() {
  var div = document.createElement('div');
  div.id = 'configContainer';
  div.style.position = 'absolute';
  div.style.display = 'none';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.left = '0';
  div.style.top = '0';
  div.style.background = 'rgba(0,0,0,0.5)';
  div.style.textAlign = 'center';
  div.style.verticalAlign = 'middle';
  var configBox = document.createElement('div');
  configBox.style.display = 'inline-block';
  configBox.style.background = 'rgb(255,255,255)';
  configBox.style.width = '30%';
  configBox.style.textAlign = 'left';
  configBox.style.padding = '1%';
  var configText = document.createElement('div');
  configText.innerHTML = 'Configuration';
  configText.style.display = 'block';
  configText.style.width = '100%';
  configText.style.padding = '1% 0';
  configText.style.background = 'rgb(100,100,255)';
  configText.style.color = 'rgb(255,255,255)';
  configText.style.textAlign = 'center';
  configBox.appendChild(configText);
  configBox.innerHTML += 'File: ';
  var filelist = document.createElement('input');
  filelist.id = 'fileToOpen';
  filelist.type = 'file';
  filelist.style.fontSize = 'inherit';
  configBox.appendChild(filelist);
  var cancelBtn = document.createElement('div');
  cancelBtn.style.display = 'inline-block';
  cancelBtn.style.width = '40%';
  cancelBtn.style.padding = '1%';
  cancelBtn.style.backgroundColor = 'rgb(200,200,200)';
  cancelBtn.style.color = 'rgb(255,255,255)';
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.style.textAlign = 'center';
  cancelBtn.style.cursor = 'pointer';
  cancelBtn.addEventListener('click', function(e) {document.getElementById('configContainer').style.display = 'none';});
  configBox.appendChild(cancelBtn);
  var empty = document.createElement('div');
  empty.style.display = 'inline-block';
  empty.style.width = '16%';
  configBox.appendChild(empty);
  var setBtn = cancelBtn.cloneNode(true);
  setBtn.innerHTML = 'Set';
  setBtn.addEventListener('click', setConfig);
  configBox.appendChild(setBtn);
  div.appendChild(configBox);
  document.body.appendChild(div);
}

function setConfigUI() {
  var configContainer = document.getElementById('configContainer');
  configContainer.style.fontSize = window.innerHeight*0.02 + 'px';
}

function showConfig(e) {
  document.getElementById('configContainer').style.display = 'block';
  setConfigUI();
}