const cfg=window.PROPOSAL_CONFIG||{};const $=id=>document.getElementById(id);const set=(id,v)=>{if($(id)&&v!==undefined)$(id).textContent=v};
set("brandName",cfg.siteTitle||"My Proposal");set("openingHeadline",cfg.openingHeadline);set("openingSubtext",cfg.openingSubtext);set("heroIntro",cfg.intro);set("storyTitle",cfg.storyTitle);set("storyIntro",cfg.storyIntro);set("proposalQuestion",cfg.proposalQuestion);set("letterTitle",cfg.letterTitle);set("letterText",cfg.letterText);set("fromName",cfg.fromName);set("surpriseMessage",cfg.surpriseMessage);
document.title=(cfg.siteTitle||"My Proposal")+" ♡";
const intro=$("introScreen"),code=$("codeScreen"),site=$("mainSite");
function showCode(){intro.classList.remove("active");if(cfg.requireUnlock!==false)code.classList.add("active");else revealSite()}
function revealSite(){code.classList.remove("active");site.classList.remove("site-hidden");window.scrollTo(0,0);document.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}
$("openLetter").addEventListener("click",showCode);
if(cfg.requireUnlock===false){intro.classList.remove("active");revealSite()}else intro.classList.add("active");
$("unlockForm").addEventListener("submit",e=>{e.preventDefault();const entered=$("secretCode").value.trim();if(entered===String(cfg.unlockCode||"forever")){sessionStorage.setItem("proposal-unlocked","yes");revealSite()}else $("codeFeedback").textContent="Not quite... try that special code again ♡"});
if(sessionStorage.getItem("proposal-unlocked")==="yes"){intro.classList.remove("active");revealSite()}
const timeline=$("timeline");(cfg.storyEvents||[]).forEach((ev,i)=>{const el=document.createElement("div");el.className="event";el.innerHTML=`<div class="event-icon">${["♡","✧","☆","∞"][i%4]}</div><div><strong></strong><p></p></div>`;el.querySelector("strong").textContent=ev.title;el.querySelector("p").textContent=ev.text;timeline.appendChild(el)});
const gallery=$("galleryGrid"),film=$("filmStrip");(cfg.photos||[]).forEach((photo,i)=>{const card=document.createElement("div");card.className="gallery-card reveal";const img=document.createElement("img");img.src=photo.src;img.alt=photo.caption||"A special memory";const cap=document.createElement("span");cap.textContent=photo.caption||"A special memory";card.append(img,cap);gallery.appendChild(card);const filmImg=document.createElement("img");filmImg.src=photo.src;filmImg.alt=photo.caption||"Memory";film.appendChild(filmImg)});
const list=$("messageList");(cfg.messages||[]).forEach(m=>{const card=document.createElement("article");card.className="message-card";const title=document.createElement("strong");title.textContent=m.title;const p=document.createElement("p");p.textContent=m.text;card.append(title,p);list.appendChild(card)});
$("readPromise").addEventListener("click",()=>{$("promiseText").textContent=cfg.yesMessage||"I promise to keep choosing kindness, laughter, and you. ♡"});
$("openSurprise").addEventListener("click",()=>{$("surpriseReveal").textContent=cfg.surpriseMessage||"You're my favourite surprise. ♡";hearts()});
$("yesButton").addEventListener("click",()=>{$("finalResponse").textContent=cfg.yesMessage||"You just made my whole world smile. ♡";hearts()});
$("thinkButton").addEventListener("click",()=>{$("finalResponse").textContent=cfg.maybeMessage||"Take your time. ♡"});
function hearts(){for(let i=0;i<22;i++){const h=document.createElement("span");h.textContent="♡";h.style.cssText=`position:fixed;z-index:60;left:${25+Math.random()*50}%;top:${45+Math.random()*25}%;font-size:${15+Math.random()*22}px;color:#ff8abc;pointer-events:none;animation:heartPop 1.7s ease-out forwards`;document.body.appendChild(h);setTimeout(()=>h.remove(),1800)}}
const anim=document.createElement("style");anim.textContent="@keyframes heartPop{to{transform:translateY(-150px) rotate(40deg) scale(.4);opacity:0}}";document.head.appendChild(anim);
const petalLayer=document.querySelector(".petal-layer");for(let i=0;i<24;i++){const p=document.createElement("span");p.className="petal";p.textContent=["✿","♡","✧"][i%3];p.style.left=Math.random()*100+"%";p.style.animationDuration=(10+Math.random()*15)+"s";p.style.animationDelay=(-Math.random()*20)+"s";p.style.fontSize=(10+Math.random()*16)+"px";petalLayer.appendChild(p)}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
let audio=null;const musicPath=cfg.musicFile||"";if(musicPath){audio=new Audio(musicPath);audio.loop=true} $("musicToggle").addEventListener("click",async()=>{if(!audio){toast("Add an MP3 path in config.js to enable music ♡");return}try{if(audio.paused){await audio.play();$("musicToggle").textContent="♫";}else{audio.pause();$("musicToggle").textContent="♪"}}catch(e){toast("Tap again to allow music ♡")}});
function toast(t){const el=$("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}


// Premium interaction layer: scroll progress, subtle cursor glow, card tilt, and sparkle feedback.
(()=>{
 const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);
 const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);
 const nav=document.querySelector('.nav');
 const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';if(nav)nav.classList.toggle('scrolled',scrollY>24)};
 addEventListener('scroll',update,{passive:true});update();
 if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
  document.querySelectorAll('.gallery-card,.story-photo,.proposal-image,.code-panel').forEach(card=>{
   card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3.5}deg) rotateY(${x*4.5}deg) translateY(-2px)`});
   card.addEventListener('pointerleave',()=>card.style.transform='');
  });
 }
 const burst=(x,y)=>{for(let i=0;i<12;i++){const s=document.createElement('span');s.className='sparkle';s.textContent=i%3?'✦':'♡';s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',(Math.random()*150-75)+'px');s.style.setProperty('--dy',(Math.random()*-130-20)+'px');s.style.fontSize=(10+Math.random()*14)+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),950)}};
 document.querySelectorAll('.glow-button,.quick-nav a').forEach(el=>el.addEventListener('click',e=>{const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}));
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
})();
