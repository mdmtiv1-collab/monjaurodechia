@echo off
cd /d "%~dp0"
echo Abrindo o Plano Chia em http://localhost:8765  (feche esta janela para parar)
start "" http://localhost:8765/index.html
node -e "const h=require('http'),f=require('fs'),p=require('path');const t={'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};h.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';const fp=p.join(process.cwd(),u);f.readFile(fp,(e,d)=>{if(e){r.writeHead(404);return r.end('nf')}r.writeHead(200,{'Content-Type':t[p.extname(fp)]||'application/octet-stream'});r.end(d)})}).listen(8765)"
