function vFlow(x,y,w,h){const nr=w<640,F=WF[mo.wf],N=F.nd,cols=Math.max(...N.map(n=>n.c))+1,nh=36;
 WF.forEach((f,i)=>{const bw=150,on=i==mo.wf,bx=x+i*(bw+8);g.fillStyle=on?OR:bg;g.fillRect(bx,y,bw,24);box(bx,y,bw,24);tx('WF-'+'AB'[i]+' '+f.n,bx+8,y+16,10,'left',1,on?AT:fg);hit(bx,y,bw,24,()=>{mo.wf=i;mo.sy=0})});
 if(!nr)chip(x+WF.length*158,y,150,24,'EDIT WORKFLOW >',0,()=>{mo.tab=16;mo.sy=0});if(!nr)[['LLM',0],['API',1],['SUB',2],['GATE',3]].forEach(([l,k],i)=>{const lx=x+w-4*72+i*72;g.fillStyle=k==1?fg:bg;g.fillRect(lx,y+5,16,12);g.strokeStyle=k==3?OR:fg;g.lineWidth=2;g.setLineDash(k==3?[3,2]:[]);g.strokeRect(lx+1,y+6,14,10);g.setLineDash([]);tx(l,lx+22,y+15,9,'left',1)});
 const dy=y+(nr?36:42),nw=nr?Math.min(112,w/3-10):Math.min(112,(w-10)/cols-16),gx=nr?(w-nw)/2:(w-nw)/(cols-1),gy=nr?56:58,
 P=n=>nr?[x+n.r*gx,dy+n.c*gy]:[x+n.c*gx,dy+n.r*gy],prog=(t*.55)%(N.length+1.5),cur=Math.floor(prog);
 F.e.forEach(e=>{const a=N[e[0]],b=N[e[1]],pa=P(a),pb=P(b);let pts;if(nr){const ox=pa[0]+nw/2,oy=pa[1]+nh,ix=pb[0]+nw/2,iy=pb[1],ym=(oy+iy)/2;pts=[[ox,oy],[ox,ym],[ix,ym],[ix,iy]]}else{const ox=pa[0]+nw,oy=pa[1]+nh/2,ix=pb[0],iy=pb[1]+nh/2,xm=(ox+ix)/2;pts=[[ox,oy],[xm,oy],[xm,iy],[ix,iy]]}
  const hot=cur>=e[0]&&cur<e[1],done=cur>=e[1];g.globalAlpha=hot||done?1:.3;ln(pts,hot?OR:fg,hot?3:2);g.globalAlpha=1;if(hot){const q=along(pts,(t*1.2)%1);g.fillStyle=OR;g.fillRect(q[0]-4,q[1]-4,8,8)}});
 N.forEach((n,i)=>{const p=P(n),nx=p[0],ny=p[1],st=i<cur?2:i==cur?1:0,sel=mo.node[mo.wf]==i,run=st==1;
  if(n.ty=='SUB'){g.fillStyle=fg;g.globalAlpha=.4;g.fillRect(nx+5,ny+5,nw,nh);g.globalAlpha=1}
  g.fillStyle=run?OR:(n.ty=='API'?fg:bg);g.fillRect(nx,ny,nw,nh);g.strokeStyle=n.ty=='GATE'?OR:fg;g.lineWidth=sel?4:2;if(n.ty=='GATE')g.setLineDash([5,3]);g.strokeRect(nx+1,ny+1,nw-2,nh-2);g.setLineDash([]);
  const c=run?AT:(n.ty=='API'?bg:fg);tx(n.ty,nx+5,ny+11,7,'left',1,c,.65);tx(n.l,nx+5,ny+27,Math.min(10,nw/9.5),'left',1,c);if(st==2){g.fillStyle=n.ty=='API'?bg:OR;g.fillRect(nx+nw-9,ny+4,5,5)}hit(nx,ny,nw,nh,()=>mo.node[mo.wf]=i)});
 const n=N[mo.node[mo.wf]],by=dy+(nr?cols*gy:2*gy+nh)+24;
 lab('NODE '+n.l+'  /  '+{LLM:'LLM REASONING',API:'EXTERNAL API CALL',SUB:'SUB-WORKFLOW',GATE:'HUMAN GATE'}[n.ty],x,by);
 tx('AGENT '+(n.a>=0?ag[n.a].n:'HUMAN')+'   /   '+n.d,x,by+22,10,'left',1);
 if(n.ty=='SUB'){const sl=n.sub.length,sw=Math.min(130,(w-(sl-1)*18)/sl),ri=Math.floor((t*1.1)%sl);tx('SUB-WORKFLOW STEPS',x,by+46,9,'left',1,OR);
  n.sub.forEach((s,i)=>{const sx=x+i*(sw+18),sy=by+54,run=i==ri;g.fillStyle=run?OR:(s[1]=='API'?fg:bg);g.fillRect(sx,sy,sw,38);box(sx,sy,sw,38);const c=run?AT:(s[1]=='API'?bg:fg);tx(s[1],sx+6,sy+12,7,'left',1,c,.65);tx(s[0],sx+6,sy+29,10,'left',1,c);if(i<sl-1)ln([[sx+sw+2,sy+19],[sx+sw+16,sy+19]],fg,2)});return by+110}
 const tk=n.tk||0,c0=n.a>=0?ag[n.a].cfg:null,cost=n.ty=='LLM'&&c0?tk*.7*c0[1]/1000+tk*.3*c0[2]/1000:n.ty=='API'?.0004:0;
 [['TOKENS',tk?K(tk):'-'],['COST',$(cost)],['LATENCY',(n.ty=='LLM'?1200+(t*97%400|0):n.ty=='API'?140+(t*53%60|0):'-')+(n.ty=='GATE'?'':'ms')],['RETRIES',n.ty=='API'?'0 / 2':'-'],['STATUS',n.ty=='GATE'?'AWAITING':['PENDING','RUNNING','DONE'][Math.max(0,Math.min(2,mo.node[mo.wf]<cur?2:mo.node[mo.wf]==cur?1:0))]]].forEach(([l,v],i)=>{const bx=x+i*(nr?0:Math.min(170,w/5)),bw2=nr?w:Math.min(160,w/5-8),byy=by+36+(nr?i*50:0);box(bx,byy,bw2,44);tx(l,bx+8,byy+14,8,'left',1,fg,.6);dx(v,bx+8,byy+36,16,i==4?OR:fg)});
 return by+(nr?290:100)}
function vCost(x,y,w,h){const T=tot(),nr=w<640,burn=ag.reduce((q,a)=>q+(40+a.l*260)*(a.cfg[1]+.35*a.cfg[2])/1000+a.l*1.5*.0004,0)*60,n=nr?2:5,bw=(w-(n-1)*8)/n;
 [['TOTAL COST',$(T.c)],['TOKENS IN',K(T.ti)],['TOKENS OUT',K(T.to)],['BURN / MIN',$(burn)],['BUDGET USED',(T.c/50*100).toFixed(1)+'%']].forEach(([l,v],i)=>{const bx=x+(i%n)*(bw+8),by=y+Math.floor(i/n)*64;box(bx,by,bw,58);tx(l,bx+8,by+16,9,'left',1,fg,.6);dx(v,bx+8,by+47,Math.min(22,bw/6),i==0?OR:fg)});
 const y2=y+Math.ceil(5/n)*64+10,lw=nr?w:w*.56,mxv=Math.max(...ag.map(a=>a.tin+a.tout));lab('TOKENS BY AGENT  (BAR = IN / OUT)',x,y2+10);
 ag.forEach((a,i)=>{const ry=y2+24+i*30,bl=Math.max(40,lw-190),f=bl/mxv;tx(a.n,x,ry+14,10,'left',1);g.fillStyle=fg;g.fillRect(x+84,ry+3,a.tin*f,14);g.fillStyle=OR;g.fillRect(x+84+a.tin*f,ry+3,a.tout*f,14);tx(K(a.tin+a.tout)+'  '+$(cst(a)),x+lw,ry+14,10,'right',0,fg,.85)});
 const x3=nr?x:x+lw+18,w3=nr?w:w-lw-18,y3=nr?y2+24+7*30+16:y2;lab('COST OVER TIME',x3,y3+10);const cy=y3+22,chh=110,lo=Math.min(...chist),hi=Math.max(...chist)+1e-6;box(x3,cy,w3,chh,fg,1);
 const pts=chist.map((v,i)=>[x3+4+i/(chist.length-1)*(w3-8),cy+chh-6-(v-lo)/(hi-lo)*(chh-12)]);g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.lineTo(x3+w3-4,cy+chh-2);g.lineTo(x3+4,cy+chh-2);g.fillStyle=OR;g.globalAlpha=.18;g.fill();g.globalAlpha=1;ln(pts,OR,2.5);
 const y4=cy+chh+20;lab('REASONING vs API SPEND',x3,y4);const tl=T.l,ta=T.ap*.0004,q=tl/(tl+ta);g.fillStyle=fg;g.fillRect(x3,y4+12,w3*q,16);g.fillStyle=OR;g.fillRect(x3+w3*q,y4+12,w3*(1-q),16);tx('LLM '+$(tl)+' ('+K(T.ca)+' calls)   API '+$(ta)+' ('+K(T.ap)+' calls)',x3,y4+46,9,'left',1);
 const y5=y4+66;lab('BUDGET  CAP $50.00',x3,y5);g.fillStyle=fg;g.globalAlpha=.15;g.fillRect(x3,y5+12,w3,16);g.globalAlpha=1;g.fillStyle=fg;g.fillRect(x3,y5+12,w3*Math.min(1,T.c/50),16);g.fillStyle=OR;g.fillRect(x3+w3-3,y5+8,3,24);tx('PROJECTED EOD '+$(T.c+burn*60*8),x3,y5+46,9,'left',1,OR);
 return Math.max(y2+24+7*30,y5+60)}
function vEvents(x,y,w,h){const nr=w<640,F=['ALL','LLM','API','ERR'],cnt=k=>ev.filter(e=>e.ty==k).length,c=[cnt('LLM'),cnt('API'),cnt('ERR')],L=ev.length;
 F.forEach((f,i)=>{const on=mo.filter==i,bx=x+i*72;g.fillStyle=on?OR:bg;g.fillRect(bx,y,64,24);box(bx,y,64,24);tx(f+(i?' '+c[i-1]:''),bx+32,y+16,10,'center',1,on?AT:fg);hit(bx,y,64,24,()=>mo.filter=i)});
 const b0=x+(nr?0:300),by=nr?y+34:y+6,bw=nr?w:w-300;g.fillStyle=fg;g.fillRect(b0,by,bw*c[0]/L,12);g.fillStyle=OR;g.fillRect(b0+bw*c[0]/L,by,bw*(c[1]+c[2])/L,12);tx('LLM '+(c[0]/L*100|0)+'%  /  API+ERR '+((c[1]+c[2])/L*100|0)+'%',b0,by+26,9,'left',1,fg,.6);
 const R_=ev.filter(e=>!mo.filter||e.ty==F[mo.filter]).slice(-26).reverse();
 return table(x,nr?y+66:y+44,w,nr?[['TIME',.2],['AG',.1],['TYPE',.12],['ACTION',.58]]:[['TIME',.1],['AGENT',.12],['TYPE',.07],['ACTION',.4],['TOKENS',.1],['MS',.08],['COST',.12]],R_.map(e=>nr?[e.ts,'A'+(e.a+1),e.ty,e.act]:[e.ts,ag[e.a].n,e.ty,e.act,e.tok?String(e.tok):'-',String(e.ms),$(e.c)]),20,0)}
function vHealth(x,y,w,h){const nr=w<640,hw=nr?w:(w-12)/2,ph=130;box(x,y,hw,ph);lab('CORE PULSE',x+8,y+14);pPulse(x+8,y+22,hw-16,ph-30);
 const x2=nr?x:x+hw+12,y2=nr?y+ph+10:y;box(x2,y2,hw,ph);lab('SIGNAL CH1-3',x2+8,y2+14);pWave(x2+8,y2+22,hw-16,ph-30);
 const yy=(nr?y2+ph:y+ph)+16;lab('AGENT HEARTBEATS',x,yy+10);
 ag.forEach((a,i)=>{const ry=yy+22+i*26,ex=x+112,ew=Math.max(40,hw-250),pts=[];tx('A'+(i+1)+' '+a.n,x,ry+14,10,'left',1,i==mo.hb?OR:fg);for(let p=0;p<=ew;p+=3)pts.push([ex+p,ry+13-ecg(t*(.6+a.l)+a.ph-p/ew*1.5)*10]);ln(pts,fg,1.5);tx((a.ms|0)+'ms',ex+ew+10,ry+14,10,'left',0,fg,.8);tx(a.ok.toFixed(1)+'%',ex+ew+62,ry+14,10,'left',1,OR)});
 const x3=nr?x:x2,y3=nr?yy+22+7*26+14:yy;lab('RESOURCES',x3,y3+10);
 [['CPU',.5],['MEMORY',.6],['NET I/O',.4],['QUEUE DEPTH',.3],['API QUOTA',.7],['BUDGET',.35]].forEach(([l,b],i)=>{const v=Math.min(1,Math.max(.05,b+.3*Math.sin(t*(.6+i*.25)+i*2))),ry=y3+24+i*24;tx(l,x3,ry+11,9,'left',1,fg,.8);g.fillStyle=fg;g.globalAlpha=.15;g.fillRect(x3+100,ry+2,hw-150,10);g.globalAlpha=1;g.fillRect(x3+100,ry+2,(hw-150)*v,10);tx((v*100|0)+'%',x3+hw,ry+11,9,'right',1,OR)});
 lab('HEAP MAP',x3,y3+24+6*24+14);pMem(x3,y3+24+6*24+26,hw,20);
 return Math.max(yy+22+7*26,y3+24+6*24+60)}
