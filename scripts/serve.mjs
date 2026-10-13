import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.json':'application/json','.md':'text/plain; charset=utf-8','.csv':'text/csv','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{try{
 let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(pathname==='/')pathname='/index.html';
 const target=path.resolve(root,'.'+pathname);
 if(!target.startsWith(root+path.sep)||pathname.split('/').some(s=>s.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}
 const body=await readFile(target);
 res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Riverfire Ops: http://127.0.0.1:4173'));
