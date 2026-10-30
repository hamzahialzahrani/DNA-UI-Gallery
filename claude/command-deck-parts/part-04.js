let HT=[],MHt=[];const mo={o:0,t:0,tab:0,title:'',sy:0,max:0,sel:2,sw:0,wf:0,node:[4,4],filter:0,r:null,cr:null,drag:null,hb:null,ch:'or',hsv:null,pd:null,pa:2};
const chist=[];let hcnt=0;
function cst(a){return(a.tin*a.cfg[1]+a.tout*a.cfg[2])/1000}
function tot(){let ti=0,to=0,l=0,ap=0,ca=0;ag.forEach(a=>{ti+=a.tin;to+=a.tout;l+=cst(a);ap+=a.api;ca+=a.calls});return{ti,to,ap,ca,l,c:l+ap*.0004}}
function step(dt){if(AP.length<4&&rnd()<dt*.12)apNew();if(RP.play)RP.pos=(RP.pos+dt*.015*RP.sp)%1;SCH.forEach(q=>{if(q.on&&!q.per&&rnd()<dt*.04){q.runs++;q.last=t}});ag.forEach(a=>{const r=40+a.l*260;a.tin+=r*dt;a.tout+=r*.35*dt;if(rnd()<dt*(.4+a.l*2))a.calls++;if(rnd()<dt*a.l*1.5)a.api++;a.ms+=(300+a.l*800-a.ms)*.02});
 if(!chist.length){const c=tot().c;for(let i=0;i<60;i++)chist.push(c*(.7+.3*i/60))}if(hcnt++%20==0){chist.push(tot().c);if(chist.length>90)chist.shift()}}
const ev=[],EP=['POST /ci/run','GET /repos/tree','POST /vector/query','POST /deploy','GET /issues','POST /lint','PUT /vector/upsert'],THK=['plan next step','summarise findings','draft patch','review diff','rank hypotheses','compose answer'];
function mkEv(){const r=rnd(),ty=r<.5?'LLM':r<.93?'API':'ERR',tk=200+(rnd()*2800|0),ep=EP[rnd()*EP.length|0];ev.push({ts:new Date().toTimeString().slice(0,8),a:rnd()*7|0,ty,act:ty=='LLM'?'reason: '+THK[rnd()*THK.length|0]:ty=='API'?ep:ep+' 429 retry',tok:ty=='LLM'?tk:0,ms:ty=='LLM'?400+(rnd()*3000|0):40+(rnd()*500|0),c:ty=='LLM'?tk*.0075/1000:.0004});if(ev.length>120)ev.shift()}
for(let i=0;i<24;i++)mkEv();setInterval(mkEv,700);
function openM(tab,title){mo.t=1;mo.tab=tab;mo.title=title;mo.sy=0}
function closeM(){mo.t=0}
function hit(x,y,w,h,f,fx){MHt.push([x,fx?y:y-mo.sy,w,h,f,fx])}
function click(x,y){const L=mo.t?MHt:HT;for(let i=L.length-1;i>=0;i--){const r=L[i];if(!r[5]&&mo.t&&mo.cr&&(y<mo.cr[1]||y>mo.cr[1]+mo.cr[3]))continue;if(x>=r[0]&&x<=r[0]+r[2]&&y>=r[1]&&y<=r[1]+r[3]){r[4](x,y);return true}}return false}
function lab(s,x,y){tx(s,x,y,9,'left',1,fg,.55);g.fillStyle=fg;g.globalAlpha=.3;g.fillRect(x,y+4,200,1);g.globalAlpha=1}
function box(x,y,w,h,c=fg,lw=2){g.strokeStyle=c;g.lineWidth=lw;g.strokeRect(x+lw/2,y+lw/2,w-lw,h-lw)}
function along(p,u){let L=0;const s=[];for(let i=1;i<p.length;i++){const d=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);s.push(d);L+=d}let d=u*L;for(let i=0;i<s.length;i++){if(d<=s[i]||i==s.length-1){const f=s[i]?Math.min(1,d/s[i]):0;return[p[i][0]+(p[i+1][0]-p[i][0])*f,p[i][1]+(p[i+1][1]-p[i][1])*f]}d-=s[i]}}
function table(x,y,w,cols,rows,rh,hi){const tw=cols.reduce((q,c)=>q+c[1],0);let cx=x;const xs=cols.map(c=>{const a=cx;cx+=w*c[1]/tw;return a});cols.forEach((c,i)=>tx(c[0],xs[i],y+10,9,'left',1,fg,.55));g.fillStyle=fg;g.fillRect(x,y+16,w,2);
 rows.forEach((r,j)=>{const yy=y+22+j*rh,on=j==hi;if(on){g.fillStyle=OR;g.fillRect(x-4,yy,w+8,rh)}r.forEach((v,i)=>tx(v,xs[i],yy+rh/2+4,10,'left',i==1,on?AT:fg,on?1:.85));g.fillStyle=fg;g.globalAlpha=.12;g.fillRect(x,yy+rh-1,w,1);g.globalAlpha=1});return y+22+rows.length*rh}
function vAgents(x,y,w,h){const nr=w<640,rh=26,cols=nr?[['AGENT',.3],['STATE',.3],['TOK',.2],['COST',.2]]:[['ID',.04],['AGENT',.11],['MODEL',.1],['STATE',.1],['TOK IN',.1],['TOK OUT',.1],['COST',.1],['CALLS',.07],['API',.06],['P50 MS',.08],['OK %',.07]];
 const by=table(x,y,w,cols,ag.map((a,i)=>nr?[a.n,a.s,K(a.tin+a.tout),$(cst(a))]:['A'+(i+1),a.n,a.cfg[0],a.s,K(a.tin),K(a.tout),$(cst(a)),String(a.calls),String(a.api),String(a.ms|0),a.ok.toFixed(1)]),rh,mo.sel);
 ag.forEach((a,i)=>hit(x,y+22+i*rh,w,rh,()=>mo.sel=i));
 const a=ag[mo.sel],dy=by+20,cw=nr?w:w/2-8,x2=nr?x:x+w/2+8;box(x,dy,w,nr?300:150);chip(x+w-160,dy+8,150,22,'PROMPT VERSIONS >',0,()=>{mo.pa=mo.sel;mo.tab=12;mo.sy=0});
 lab('SELECTED A'+(mo.sel+1)+' '+a.n,x+12,dy+18);tx(a.cfg[3],x+12,dy+40,11,'left',1);tx('MODEL '+a.cfg[0]+'   IN $'+a.cfg[1]+'/1k   OUT $'+a.cfg[2]+'/1k',x+12,dy+60,10,'left',0,fg,.8);
 tx('SWARMS: '+(TS.filter(k=>k[3].includes(mo.sel)).map(k=>k[0]).join('  ')||'-'),x+12,dy+80,10,'left',1,OR);
 const yy=nr?dy+110:dy+18;lab('TOOLS = EXTERNAL API CALLS',x2+(nr?12:0),yy);let cx=x2+(nr?12:0);a.cfg[4].forEach(tl=>{const tw=tl.length*6.4+14;g.fillStyle=fg;g.fillRect(cx,yy+14,tw,20);tx(tl,cx+7,yy+28,10,'left',1,bg);cx+=tw+6});
 lab('REASONING (LLM) vs API CALLS',x2+(nr?12:0),yy+56);const q=a.calls/(a.calls+a.api),bw=cw-24;g.fillStyle=fg;g.fillRect(x2+(nr?12:0),yy+68,bw*q,14);g.fillStyle=OR;g.fillRect(x2+(nr?12:0)+bw*q,yy+68,bw*(1-q),14);tx('LLM '+a.calls+'  /  API '+a.api,x2+(nr?12:0),yy+98,10,'left',1);
 return dy+(nr?310:160)}
function vSwarm(x,y,w,h){const nr=w<640,lw=nr?w:w*.34,rh=nr?42:54,gp=nr?46:58;
 TS.forEach((k,i)=>{const yy=y+i*gp,on=i==mo.sw,c=on?AT:fg;g.fillStyle=on?OR:bg;g.fillRect(x,yy,lw-8,rh);box(x,yy,lw-8,rh);tx(k[0],x+8,yy+14,10,'left',1,on?AT:OR);tx(k[2],x+lw-16,yy+14,8,'right',1,c,.7);tx(k[1].slice(0,Math.floor((lw-24)/6.2)),x+8,yy+28,10,'left',1,c);
  const p=(k[4]+t*.004)%1;g.fillStyle=c;g.globalAlpha=.25;g.fillRect(x+8,yy+rh-9,lw-26,4);g.globalAlpha=1;g.fillRect(x+8,yy+rh-9,(lw-26)*p,4);hit(x,yy,lw-8,rh,()=>mo.sw=i)});
 const T=TS[mo.sw],m=T[3],n=m.length,hd=T[2],dx0=nr?x:x+lw+8,dy0=nr?y+TS.length*gp+14:y,dw=nr?w:w-lw-8,dh=nr?300:Math.max(300,h-4);
 tx(T[0]+'  '+T[1],dx0,dy0+10,11,'left',1);tx('MODE '+hd+'  /  SWARM '+n+' AGENTS  /  CAP $2.00  /  SPENT '+$(m.reduce((q,i)=>q+cst(ag[i]),0)*.12),dx0,dy0+26,9,'left',0,fg,.7);
 const nw=Math.max(74,Math.min(116,(hd=='PIPELINE'?dw/n:dw/Math.max(2,n-1))-12)),nh=48;let P=[],E=[];
 if(hd=='HIERARCHICAL'){P=m.map((_,j)=>j?[dx0+dw*j/n,dy0+dh*.64]:[dx0+dw/2,dy0+dh*.24]);E=m.slice(1).map((_,j)=>[0,j+1])}
 else if(hd=='PEER MESH'){const cx=dx0+dw/2,cy=dy0+dh*.56,r=Math.max(20,Math.min(dw/2-nw/2-4,dh*.34));P=m.map((_,j)=>{const a=j/n*TAU-1.57;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r]});for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)E.push([i,j])}
 else{P=m.map((_,j)=>[dx0+dw*(j+.5)/n,dy0+dh*.5]);for(let j=0;j<n-1;j++)E.push([j,j+1])}
 E.forEach((e,ei)=>{const A=P[e[0]],B=P[e[1]];g.globalAlpha=.5;ln([A,B],fg,2);g.globalAlpha=1;const u=(t*.45+ei*.31)%1;g.fillStyle=OR;g.fillRect(A[0]+(B[0]-A[0])*u-4,A[1]+(B[1]-A[1])*u-4,8,8)});
 m.forEach((i,j)=>{const a=ag[i],lead=j==0,px=P[j][0],py=P[j][1],c=lead?AT:fg;g.fillStyle=lead?OR:bg;g.fillRect(px-nw/2,py-nh/2,nw,nh);box(px-nw/2,py-nh/2,nw,nh);tx(a.n,px,py-6,10,'center',1,c);tx(lead?'LEAD':'WORKER',px,py+6,8,'center',1,c,.7);tx(K(a.tin*.1)+' tok '+$(cst(a)*.1),px,py+18,8,'center',0,c,.85)});
 tx({HIERARCHICAL:'POLICY: lead decomposes > workers execute > critic gates > router performs side effects',PIPELINE:'POLICY: each stage hands its output to the next; any stage can reject and loop back','PEER MESH':'POLICY: peers share findings on the bus; first verified answer wins'}[hd],dx0,dy0+dh-2,9,'left',0,fg,.6);
 return Math.max(y+TS.length*gp,dy0+dh+4)}
