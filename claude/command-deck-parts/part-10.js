const VIEWS=[vAgents,vSwarm,vFlow,vCost,vEvents,vHealth,vTrace,vMemory,vTools,vSafety,vEvals,vSched,vPrompts,vVault,vReplay,vAccess,vEditor,vTheme];
function drawModal(){mo.o+=(mo.t-mo.o)*.16;if(Math.abs(mo.t-mo.o)<.004)mo.o=mo.t;MHt=[];if(mo.o<=0)return;
 const e=1-Math.pow(1-mo.o,3);g.fillStyle='rgba(0,0,0,'+.84*e+')';g.fillRect(0,0,W,H);g.strokeStyle=ha(IN,.07*e);g.lineWidth=1;g.beginPath();for(let yy=0;yy<H;yy+=4){g.moveTo(0,yy+.5);g.lineTo(W,yy+.5)}g.stroke();
 const mw=Math.min(W-12,1140),mh=W<760?H-12:Math.min(H-16,Math.max(440,H*.88)),x=(W-mw)/2,he=mh*e,y=H/2-he/2;mo.r=[x,H/2-mh/2,mw,mh];
 if(e>.15){g.fillStyle=OR;g.fillRect(x+10,y+10,mw,he)}g.fillStyle=PA;g.fillRect(x,y,mw,he);box(x,y,mw,he,IN,4);
 if(e<.98){g.globalAlpha=1;return}
 g.globalAlpha=Math.min(1,(mo.o-.7)/.25);
 g.fillStyle=IN;g.fillRect(x,y,mw,34);g.fillStyle=OR;g.fillRect(x+4,y+4,26,26);tx('+',x+17,y+24,16,'center',1,AT);tx(mo.title+'  //  DETAIL VIEW',x+40,y+22,12,'left',1,PA);
 g.fillStyle=OR;g.fillRect(x+mw-100,y+4,94,26);tx('CLOSE [ESC]',x+mw-53,y+21,10,'center',1,AT);hit(x+mw-100,y+4,94,26,closeM,1);
 const per=mw<760?6:9,tw=mw/per,th=28;TABS.forEach((n,i)=>{const on=i==mo.tab,tx0=x+(i%per)*tw,ty=y+34+Math.floor(i/per)*th;g.fillStyle=on?OR:PA;g.fillRect(tx0,ty,tw,th);box(tx0,ty,tw,th,IN,2);tx(tw<110?n:'0'+(i+1)+' '+n,tx0+tw/2,ty+18,tw<110?8:10,'center',1,on?AT:IN);hit(tx0,ty,tw,th,()=>{mo.tab=i;mo.sy=0},1)});
 const tb=34+Math.ceil(TABS.length/per)*th,cx=x+16,cy=y+tb+12,cw=mw-32,ch=mh-tb-26;mo.cr=[x,cy,mw,ch];mo.sy=Math.max(0,Math.min(mo.sy,mo.max||0));
 g.save();g.beginPath();g.rect(x+4,cy-4,mw-8,ch+8);g.clip();g.translate(0,-mo.sy);const bot=VIEWS[mo.tab](cx,cy,cw,ch);g.restore();
 mo.max=Math.max(0,bot-(cy+ch)+12);if(mo.max>0){g.fillStyle=OR;const bh=Math.max(30,ch*ch/(ch+mo.max));g.fillRect(x+mw-8,cy+(ch-bh)*mo.sy/mo.max,5,bh)}
 g.globalAlpha=1}

function lay(y0,y1){const L=[];
 if(W<760){const p=6,bh=y1-y0-p*2;let y=y0+p;[['net',.22],['agents',.25],['helix',.14],['pulse',.12],['stat',.11],['log',.16]].forEach(([n,f])=>{L.push([n,p,y,W-p*2,bh*f]);y+=bh*f});return L}
 const p=8,gw=(W-p*2)/12,full=(y1-y0-p*2)/12>=50,gh=(y1-y0-p*2)/(full?12:10);
 [['agents',0,0,3,4],['helix',3,0,5,4],['net',8,0,4,4],['pulse',0,4,4,2],['log',4,4,4,2],['radar',8,4,2,2],['gauge',10,4,2,2],['wave',0,6,3,2],['gen',3,6,3,2],['task',6,6,3,2],['hist',9,6,3,2],['cube',0,8,2,2],['hex',2,8,3,2],['time',5,8,3,2],['spark',8,8,2,2],['rings',10,8,2,2]].concat(full?[['bits',0,10,2,1],['sched',2,10,2,1],['mem',4,10,4,1],['alert',8,10,4,1],['ctx',0,11,3,1],['tools',3,11,3,1],['guard',6,11,3,1],['evals',9,11,3,1]]:[]).forEach(([n,c,r,cw,rh])=>L.push([n,p+c*gw,y0+p+r*gh,cw*gw,rh*gh]));return L}
const tick=' /// DNA CORE ONLINE /// 7 AGENTS ACTIVE /// NEURAL BUS 10GB/S /// MEMORY SHARDS SYNCED /// ALL SYSTEMS NOMINAL /// AWAITING DIRECTIVE';
function loop(ms){t=ms/1000;if(cv.clientWidth!==W||cv.clientHeight!==H)rs();pulse=Math.max(0,ecg(t*1.1));HT=[];step(Math.min(.1,(ms-last)/1000)||.016);
 g.lineCap='butt';g.lineJoin='miter';g.globalAlpha=1;fg=IN;bg=PA;g.fillStyle=PA;g.fillRect(0,0,W,H);
 const y0=52,y1=H-26;
 const L=lay(y0,y1);L.forEach((q,i)=>panel(q[0],q[1],q[2],q[3],q[4],i));
 /* header */
 const s=20+pulse*4;g.fillStyle=OR;g.fillRect(12,26-s/2,s,s);dx('DNA',44,38,32,IN);
 if(W>=760){tx('MULTI-AGENT SYSTEM / REV 7.2 / NEO-GENESIS',140,22,10,'left',1);tx('SELF-ORGANISING AGENT SWARM',140,38,10,'left',0,IN,.6);
  const u=t|0,sx0=Math.max(430,W*.44);[['TOKENS',(t*1873|0).toLocaleString('en-US')],['MUTATIONS',String(t*3.1|0).padStart(5,'0')],['UPTIME',[u/3600|0,u/60%60|0,u%60].map(v=>String(v).padStart(2,'0')).join(':')]].forEach(([l,v],i)=>{tx(l,sx0+i*135,20,8,'left',1,IN,.55);dx(v,sx0+i*135,42,16,IN)})}
 tx(new Date().toTimeString().slice(0,8),W-14,22,12,'right',1);g.fillStyle=(t*2%2<1)?OR:IN;g.fillRect(W-88,30,8,8);tx(W<760?'LIVE':'LIVE  '+(fps|0)+'FPS',W-14,38,10,'right',1,IN,.7);
 if(W>=1000){const ax=W-205;USR.filter(u=>u.s=='ONLINE').slice(0,3).forEach((u,i)=>{g.fillStyle=i?IN:OR;g.fillRect(ax+i*24,13,20,20);tx(u.n.slice(0,2).toUpperCase(),ax+i*24+10,27,9,'center',1,i?PA:AT)});HT.push([ax,13,72,20,()=>openM(15,'ACCESS')])}g.fillStyle=IN;g.fillRect(0,y0-4,W,4);
 /* scan line */
 const sx=(t*70)%W;g.globalAlpha=.85;g.fillStyle=OR;g.fillRect(sx,y0,2,y1-y0);g.globalAlpha=1;tx('X'+String(sx|0).padStart(4,'0'),sx+5,y0+12,8,'left',1,OR);
 /* footer */
 g.fillStyle=IN;g.fillRect(0,y1,W,26);g.save();g.beginPath();g.rect(0,y1,110,26);g.clip();g.fillStyle=OR;for(let k=-2;k<8;k++){const o=k*28+(t*24)%28;g.beginPath();g.moveTo(o,y1+26);g.lineTo(o+14,y1+26);g.lineTo(o+28,y1);g.lineTo(o+14,y1);g.closePath();g.fill()}g.restore();
 g.save();g.beginPath();g.rect(118,y1,W-118-104,26);g.clip();tx('',0,0,11);g.font='800 11px '+MF;const tw=g.measureText(tick).width+30,o=(t*50)%tw;for(let x=118-o;x<W;x+=tw)tx(tick,x,y1+17,11,'left',1,PA);g.restore();g.fillStyle=OR;g.fillRect(W-100,y1+3,94,20);[PA,IN].forEach((c,i)=>{g.fillStyle=c;g.fillRect(W-95+i*10,y1+8,8,10);g.strokeStyle=AT;g.lineWidth=1;g.strokeRect(W-94.5+i*10,y1+8.5,7,9)});tx('THEMES',W-72,y1+17,10,'left',1,AT);HT.push([W-100,y1+3,94,20,()=>openM(17,'THEMES')]);
 drawModal();{const L=mo.t?MHt:HT;let hv=false;for(const r of L)if(mx>=r[0]&&mx<=r[0]+r[2]&&my>=r[1]&&my<=r[1]+r[3]&&(r[5]||!mo.cr||(my>=mo.cr[1]&&my<=mo.cr[1]+mo.cr[3]))){hv=true;break}if(cv.style)cv.style.cursor=hv?'pointer':'default'}
 fps+=(1000/Math.max(1,ms-last)-fps)*.05;last=ms;requestAnimationFrame(loop)}
requestAnimationFrame(loop);
