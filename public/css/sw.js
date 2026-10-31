const C='humura-v1',F=['./','index.html','css/style.css','css/pages.css','js/common.js','js/safety-rules.js','wellbeing.html','safe-report.html','online-safety.html','mother-check.html','training.html','data/help.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||e.request.url.includes('/api/'))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
