"use strict";
(() => {
 const root=document.documentElement, canvas=document.querySelector(".motion-canvas"),scene=document.querySelector(".motion-orbit"),control=document.querySelector("#motion-toggle");
 const reduced=matchMedia("(prefers-reduced-motion: reduce)"),fine=matchMedia("(hover:hover) and (pointer:fine)");
 let enabled=!reduced.matches;
 try { const saved=localStorage.getItem("je-motion");if(saved!==null)enabled=saved==="true"&&!reduced.matches; }catch{}
 const cards=[...document.querySelectorAll(".motion-showcase")];
 function sync(){root.dataset.immersiveMotion=String(enabled);if(control){control.setAttribute("aria-pressed",String(enabled));control.querySelector(".motion-control-label").textContent=enabled?"Motion on":"Motion off";}}
 sync();
 control?.addEventListener("click",()=>{enabled=!enabled;sync();try{localStorage.setItem("je-motion",String(enabled));}catch{}if(enabled)animate();else draw(0);});
 reduced.addEventListener("change",e=>{if(e.matches){enabled=false;sync();}});
 cards.forEach(card=>{
  card.addEventListener("pointermove",e=>{
   if(!enabled||!fine.matches||e.pointerType!=="mouse")return;
   const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   card.style.setProperty("--mx",(x+.5)*100+"%");card.style.setProperty("--my",(y+.5)*100+"%");
   const stack=card.querySelector(".depth-stack");
   if(stack){stack.style.setProperty("--rx",(-14-y*24)+"deg");stack.style.setProperty("--ry",(16+x*27)+"deg");}
   const mag=card.querySelector(".magnetic-button");
   if(mag){mag.style.setProperty("--magx",x*35+"px");mag.style.setProperty("--magy",y*29+"px");}
   const word=card.querySelector(".kinetic-word");
   if(word){word.style.setProperty("--krx",-y*26+"deg");word.style.setProperty("--kry",x*30+"deg");word.style.setProperty("--ksx",-x*17+"px");word.style.setProperty("--ksy",-y*17+"px");}
  });
  card.addEventListener("pointerleave",()=>{
   card.style.removeProperty("--mx");card.style.removeProperty("--my");
   ["--rx","--ry"].forEach(p=>card.querySelector(".depth-stack")?.style.removeProperty(p));
   ["--magx","--magy"].forEach(p=>card.querySelector(".magnetic-button")?.style.removeProperty(p));
   ["--krx","--kry","--ksx","--ksy"].forEach(p=>card.querySelector(".kinetic-word")?.style.removeProperty(p));
  });
 });
 document.querySelector(".magnetic-button")?.addEventListener("click",()=>document.querySelector("#work")?.scrollIntoView({behavior:reduced.matches?"instant":"smooth"}));
 if(!canvas||!scene)return;
 const ctx=canvas.getContext("2d",{alpha:true});if(!ctx)return;
 let w=0,h=0,lookX=.15,lookY=-.1,targetX=.15,targetY=-.1,frame=0,running=false,visible=true;
 const rings=[{r:1.5,t:.35,a:.12,c:"202,255,107"},{r:1.36,t:1.28,a:1.15,c:"152,150,255"},{r:1.16,t:2.2,a:.7,c:"112,229,247"}];
 const stars=Array.from({length:85},()=>({x:Math.random(),y:Math.random(),s:Math.random()*.9+.2}));
 function resize(){
  const r=scene.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.6);
  w=Math.max(1,Math.floor(r.width));h=Math.max(1,Math.floor(r.height));
  canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(d,0,0,d,0,0);
 }
 function project(x,y,z){
  const cy=Math.cos(lookX),sy=Math.sin(lookX),cx=Math.cos(lookY),sx=Math.sin(lookY),x1=x*cy-z*sy,z1=x*sy+z*cy,y1=y*cx-z1*sx,z2=y*sx+z1*cx,p=4.7/(5.2-z2),u=Math.min(w,h)*.29;
  return {x:w*.47+x1*p*u,y:h*.5+y1*p*u,z:z2,p};
 }
 function draw(time){
  if(!w||!h)return;ctx.clearRect(0,0,w,h);
  stars.forEach(s=>{ctx.fillStyle="rgba(221,242,255,"+(.1+s.s*.13)+")";ctx.fillRect(s.x*w,s.y*h,s.s,s.s);});
  const g=ctx.createRadialGradient(w*.47,h*.5,1,w*.47,h*.5,Math.min(w,h)*.48);g.addColorStop(0,"rgba(148,133,255,.22)");g.addColorStop(1,"rgba(148,133,255,0)");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  const dots=[];
  rings.forEach((ring,k)=>{
   ctx.beginPath();
   for(let i=0;i<=240;i++){
    const a=i/240*Math.PI*2+time*(k===1?-.00013:.00010),x=Math.cos(a)*ring.r,z=Math.sin(a)*ring.r;
    const rx=x*Math.cos(ring.a)-z*Math.sin(ring.a),rz=x*Math.sin(ring.a)+z*Math.cos(ring.a);
    const q=project(rx,-rz*Math.sin(ring.t),rz*Math.cos(ring.t));
    if(i===0)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y);
    if(i<240&&i%2===0)dots.push({...q,c:ring.c,s:.6+(i%9)/12});
   }
   ctx.strokeStyle="rgba("+ring.c+",.33)";ctx.lineWidth=1.2;ctx.stroke();
  });
  dots.sort((a,b)=>a.z-b.z);
  dots.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.65,p.s*p.p*1.4),0,Math.PI*2);ctx.fillStyle="rgba("+p.c+","+Math.min(.93,Math.max(.25,(p.z+2.5)/5)) +")";ctx.fill();});
  const c=project(0,0,0),s=Math.min(w,h)*.13;
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(-.17+lookX*.07);ctx.shadowColor="rgba(169,255,138,.3)";ctx.shadowBlur=37;
  const grad=ctx.createLinearGradient(-s,-s,s,s);grad.addColorStop(0,"#3b4960");grad.addColorStop(1,"#101724");
  ctx.beginPath();ctx.roundRect(-s,-s,s*2,s*2,s*.27);ctx.fillStyle=grad;ctx.fill();ctx.strokeStyle="rgba(231,252,239,.65)";ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle="#edffe7";ctx.font="700 "+Math.round(s*.85)+"px Space Grotesk, sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("je.",0,-s*.04);ctx.restore();
 }
 function animate(){
  if(running)return;running=true;
  function tick(now){if(!enabled||!visible||document.hidden){running=false;return;}lookX+=(targetX-lookX)*.035;lookY+=(targetY-lookY)*.035;draw(now);frame=requestAnimationFrame(tick);}
  frame=requestAnimationFrame(tick);
 }
 new ResizeObserver(()=>{resize();draw(0);}).observe(scene);
 new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;if(visible&&enabled)animate();}).observe(scene);
 document.querySelector(".hero-studio")?.addEventListener("pointermove",e=>{
  if(!enabled||!fine.matches||e.pointerType!=="mouse")return;
  const r=scene.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*.65;targetY=((e.clientY-r.top)/r.height-.5)*-.55;
 });
 document.querySelector(".hero-studio")?.addEventListener("pointerleave",()=>{targetX=.15;targetY=-.1;});
 document.addEventListener("visibilitychange",()=>{if(!document.hidden&&enabled)animate();});
 window.addEventListener("pagehide",()=>cancelAnimationFrame(frame),{once:true});
 resize();draw(0);scene.classList.add("has-webgl");if(enabled)animate();
})();