/* Humura shared script: header, quick exit, simple mode, help block, offline cache */
(function(){
var h=document.getElementById('hdr');
if(h)h.innerHTML='<header><a class="logo" href="index.html" style="text-decoration:none">🌿 Humura</a><div class="tools"><button class="btn" id="sb">Simple mode</button><button class="btn exit" id="xb">Quick exit</button></div></header>';
document.getElementById('sb').onclick=function(){document.body.classList.toggle('simple')};
document.getElementById('xb').onclick=function(){location.replace('https://www.google.com')};
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(function(){});
})();
async function showHelp(el){
  var d={list:[]};
  try{d=await (await fetch('data/help.json')).json()}catch(e){}
  var l=d.list.filter(function(x){return x.phone&&x.verified});
  el.innerHTML='<h3>Get help now</h3><p>If you are in immediate danger, go to the nearest police station or health facility, or ask a trusted adult to go with you.</p>'+
    (l.length?'<ul>'+l.map(function(x){return '<li><b>'+x.name+'</b>: '+x.phone+'</li>'}).join('')+'</ul>':'<p><i>Help numbers will be added here after real people have checked them.</i></p>');
  el.hidden=false;
}
