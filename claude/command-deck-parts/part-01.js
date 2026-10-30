const cv=document.getElementById('c'),g=cv.getContext('2d'),rnd=Math.random,TAU=6.2832;
let PA,IN,OR,AT,fg,bg,cur=0;const cust={pa:'#0b0b0a',in:'#e9e5d8',or:'#ff5a1f'};
const TH=[{n:'NIGHT BRUTAL',pa:'#0b0b0a',in:'#e9e5d8',or:'#ff5a1f'},{n:'BONE LIGHT',pa:'#e9e5d9',in:'#0f0f0f',or:'#ff4d00'},{n:'TERMINAL',pa:'#020a04',in:'#3dff7a',or:'#ffb000'},{n:'AMBER CRT',pa:'#0a0600',in:'#ffb000',or:'#ff3b1f'},{n:'BLUEPRINT',pa:'#0a2540',in:'#dff1ff',or:'#ffd400'},{n:'CYBER MAGENTA',pa:'#0d0212',in:'#f3e6ff',or:'#ff2bd6'},{n:'SWISS RED',pa:'#f2f0ea',in:'#0b0b0b',or:'#e30613'},{n:'ACID LIME',pa:'#0c0c0c',in:'#f1f1ea',or:'#c8ff00'},{n:'ICE COBALT',pa:'#e6eef5',in:'#0a1a2a',or:'#0066ff'},{n:'SOLAR',pa:'#fdf6e3',in:'#073642',or:'#cb4b16'}];
function hex2rgb(h){h=h.replace('#','');return[0,2,4].map(i=>parseInt(h.substr(i,2),16))}
function rgb2hex(r){return'#'+r.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('')}
function hsv2rgb(h,s,v){const f=n=>{const k=(n+h/60)%6;return(v-v*s*Math.max(0,Math.min(k,4-k,1)))*255};return[f(5),f(3),f(1)]}
function rgb2hsv(r){const[a,b,c]=r.map(v=>v/255),m=Math.max(a,b,c),d=m-Math.min(a,b,c);let h=0;if(d){h=m==a?((b-c)/d)%6:m==b?(c-a)/d+2:(a-b)/d+4;h*=60;if(h<0)h+=360}return[h,m?d/m:0,m]}
const lum=h=>{const c=hex2rgb(h);return(.299*c[0]+.587*c[1]+.114*c[2])/255},ha=(h,a)=>'rgba('+hex2rgb(h).join(',')+','+a+')';
try{const o=JSON.parse(localStorage.getItem('dna-theme'));if(o){cur=o.cur|0;Object.assign(cust,o.cust)}}catch(e){}
function pal(){const T=cur<10?TH[cur]:cust;PA=T.pa;IN=T.in;OR=T.or;AT=lum(OR)>.55?'#101011':'#f4f1ea';fg=IN;bg=PA;document.documentElement.style.setProperty('--p',PA);try{localStorage.setItem('dna-theme',JSON.stringify({cur,cust}))}catch(e){}}
pal();
let W=0,H=0,t=0,fps=60,last=0,pulse=0,mx=-1,my=-1;
function rs(){const D=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*D;cv.height=H*D;g.setTransform(D,0,0,D,0,0)}
rs();addEventListener('resize',rs);
addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;if(mo.drag!=null&&mo.t){mo.sy-=my-mo.drag;mo.drag=my}if(mo.pd&&mo.t)mo.pd(mx,my)});addEventListener('pointerup',()=>{mo.drag=null;mo.pd=null});addEventListener('wheel',e=>{if(mo.t){mo.sy+=e.deltaY;e.preventDefault()}},{passive:false});addEventListener('keydown',e=>{if(!mo.t)return;if(e.key==='Escape')closeM();if(e.key==='ArrowRight'){mo.tab=(mo.tab+1)%18;mo.sy=0}if(e.key==='ArrowLeft'){mo.tab=(mo.tab+17)%18;mo.sy=0}});
addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(mo.t){if(!click(x,y)){const q=mo.r;if(q&&(x<q[0]||x>q[0]+q[2]||y<q[1]||y>q[1]+q[3]))closeM();else mo.drag=y}return}if(click(x,y))return;if(x<40&&y<42){cur=(cur+1)%10;mo.hsv=null;pal();return}for(let i=0;i<7;i++)pk.push({i,d:i%2?1:-1,u:i%2?0:1})});
const MF='"JetBrains Mono",ui-monospace,Menlo,monospace',DF='"Archivo Black",Impact,sans-serif';
function tx(s,x,y,sz=11,al='left',b=0,col=fg,a=1){g.font=(b?'800 ':'500 ')+sz+'px '+MF;g.textAlign=al;g.fillStyle=col;g.globalAlpha=a;g.fillText(s,x,y);g.globalAlpha=1}
function dx(s,x,y,sz,col=fg,al='left'){g.font=sz+'px '+DF;g.textAlign=al;g.fillStyle=col;g.fillText(s,x,y)}
function ln(pts,col=fg,lw=2){g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle=col;g.lineWidth=lw;g.stroke()}
function ecg(p){p=((p%1)+1)%1;const b=(c,w,a)=>a*Math.exp(-Math.pow((p-c)/w,2));return b(.12,.04,.15)+b(.27,.008,-.15)+b(.3,.012,1)+b(.33,.01,-.3)+b(.55,.05,.25)}
const AG=['ANALYSER','PLANNER','CODER','TESTER','CRITIC','MEMORY','ROUTER'];
const ST=['PARSING','IDLE','COMPILING','SCANNING','SYNC','INDEXING','ROUTING','THINKING','MERGING'];
const ag=AG.map((n,i)=>({n,s:ST[i],l:rnd(),tl:rnd(),ph:rnd()*6,f:-9,x:0,y:0}));
let pk=[];
/* panels */
function pAgents(x,y,w,h){const rh=h/7,hi=Math.floor(t*.8)%7;
 ag.forEach((a,i)=>{const yy=y+i*rh,on=i==hi,ty=yy+rh/2+4;if(rnd()<.004){a.s=ST[rnd()*ST.length|0];a.tl=rnd()}a.l+=(a.tl-a.l)*.02;
  if(on){g.fillStyle=fg;g.fillRect(x-8,yy,w+16,rh)}const c=on?bg:fg;
  tx('A'+(i+1),x,ty,11,'left',1,OR);tx(a.n,x+24,ty,11,'left',1,c);tx(a.s,x+w*.34,ty,10,'left',0,c,.8);
  const bx=x+w*.6,bw=w*.15,n=Math.round(a.l*8);for(let k=0;k<8;k++){g.fillStyle=c;g.globalAlpha=k<n?1:.2;g.fillRect(bx+k*bw/8,ty-8,bw/8-1.5,9)}g.globalAlpha=1;
  const ex=x+w*.79,ew=w*.21,pts=[];for(let p=0;p<=ew;p+=2)pts.push([ex+p,yy+rh/2-ecg(t*(.6+a.l)+a.ph-p/ew*1.5)*rh*.34]);ln(pts,c,1.5);
  g.fillStyle=fg;g.globalAlpha=.15;g.fillRect(x-8,yy+rh-1,w+16,1);g.globalAlpha=1})}
function pHelix(x,y,w,h){const cy=y+h/2,N=Math.max(8,Math.floor(w/13)),amp=h*.32*(1+.1*pulse),p1=[],p2=[];
 for(let i=0;i<=N;i++){const X=x+i/N*w,ph=i/N*14-t*2,s=Math.sin(ph),z=Math.cos(ph),a=cy+s*amp,b=cy-s*amp;p1.push([X,a]);p2.push([X,b]);
  if(i%2==0){g.fillStyle=fg;g.globalAlpha=z>0?1:.28;g.fillRect(X-1,Math.min(a,b),2,Math.abs(a-b));g.globalAlpha=1;
   if(i%4==0&&Math.abs(s)<.7){g.fillStyle=bg;g.fillRect(X-6,cy-7,12,14);tx('ATGC'[(i*7+(t*2|0))%4],X,cy+4,11,'center',1,z>0?OR:fg)}}}
 ln(p1,fg,3);ln(p2,OR,3);p1.forEach((p,i)=>{if(i%2==0){g.fillStyle=fg;g.fillRect(p[0]-3,p[1]-3,6,6);g.fillStyle=OR;g.fillRect(p2[i][0]-3,p2[i][1]-3,6,6)}});
 for(let i=0;i<=N;i+=2){g.fillStyle=fg;g.fillRect(x+i/N*w,y+h-5,1,i%8==0?5:3);if(i%8==0)tx(i.toString(16).padStart(2,'0').toUpperCase(),x+i/N*w+3,y+h-1,8,'left',0,fg,.6)}}
const SP=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]];
function pNet(x,y,w,h){const cx=x+w/2,cy=y+h/2,dx_=Math.min(w*.34,150),dy_=Math.min(h*.32,90);
 g.fillStyle=fg;g.globalAlpha=.4;g.fillRect(x,cy,w,1);g.fillRect(cx,y,1,h);g.globalAlpha=1;
 ag.forEach((a,i)=>{a.x=cx+SP[i][0]*dx_;a.y=cy+SP[i][1]*dy_;g.globalAlpha=.6;ln([[a.x,a.y],[a.x,cy],[cx,cy]],fg,2);g.globalAlpha=1});
 if(rnd()<.12){const i=rnd()*7|0,d=rnd()<.5?1:-1;pk.push({i,d,u:d>0?0:1})}
 const pos=(a,u)=>{const L1=Math.abs(a.y-cy),L2=Math.abs(a.x-cx),d=u*(L1+L2);return d<L1?[a.x,a.y+(cy-a.y)*d/(L1||1)]:[L2?a.x+(cx-a.x)*(d-L1)/L2:cx,cy]};
 pk=pk.filter(q=>{q.u+=q.d*.014;if(q.u>1||q.u<0){ag[q.i].f=t;return false}return true});
 pk.forEach(q=>{const p=pos(ag[q.i],q.u);g.fillStyle=OR;g.fillRect(p[0]-4,p[1]-4,8,8);g.strokeStyle=IN;g.lineWidth=1.5;g.strokeRect(p[0]-3.5,p[1]-3.5,7,7)});
 ag.forEach((a,i)=>{const fl=t-a.f<.35;g.fillStyle=fl?OR:bg;g.fillRect(a.x-13,a.y-13,26,26);g.strokeStyle=fg;g.lineWidth=2;g.strokeRect(a.x-13,a.y-13,26,26);tx('A'+(i+1),a.x,a.y+4,11,'center',1,fl?AT:fg);tx(a.n.slice(0,3),a.x,a.y+25,8,'center',0,fg,.7)});
 const s=34+pulse*10;g.fillStyle=OR;g.fillRect(cx-s/2,cy-s/2,s,s);g.strokeStyle=fg;g.lineWidth=2.5;g.strokeRect(cx-s/2,cy-s/2,s,s);tx('DNA',cx,cy+4,11,'center',1,AT)}
