import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const root=process.cwd(), port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '')||'index.html';
    const full=resolve(root,relative);
    if(!(full===root||full.startsWith(root+sep))){res.writeHead(403);res.end('Interdit');return;}
    const st=await stat(full);
    if(!st.isFile())throw new Error('Fichier non trouvé');
    res.writeHead(200,{'Content-Type':mime[extname(full)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(await readFile(full));
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Introuvable');}
}).listen(port,()=>console.log('RH·XR local: http://localhost:'+port));
