/* On-device rules. No text leaves the phone. Kinyarwanda word lists must be added and checked by native speakers. */
var RULES={
  threat:{en:['kill you','hurt you','beat you','i will find you','you will pay'],rw:[]},
  selfharm:{en:['kill myself','end my life','want to die','suicide'],rw:['kwiyahura']},
  blackmail:{en:['send your photos','leak your','post your pictures','naked pics'],rw:[]},
  sexual:{en:['send nudes','sleep with me','touch you'],rw:[]},
  insult:{en:['stupid','ugly','slut','whore','useless','idiot'],rw:[]}
};
function scan(t){
  t=(t||'').toLowerCase();var r=[];
  for(var k in RULES){
    var w=RULES[k].en.concat(RULES[k].rw);
    if(w.some(function(x){return t.indexOf(x)>-1}))r.push(k);
  }
  return r;
}
