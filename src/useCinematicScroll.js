import {useLayoutEffect,useRef,useCallback} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function useCinematicScroll(root,page,lang){
 const cleanup=useRef(()=>{});
 const stop=useCallback(()=>{cleanup.current();cleanup.current=()=>{}},[]);
 useLayoutEffect(()=>{
  if(page!=='home')return;
  const mm=gsap.matchMedia();
  mm.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 900px)'},context=>{
   if(!context.conditions.motion)return;
   const cleanups=[];
   const ctx=gsap.context(()=>{
    if(page==='home'){
     gsap.from('.hero-copy > *',{y:35,opacity:0,duration:1.1,stagger:.12,ease:'power3.out'});
     const hero=gsap.timeline({scrollTrigger:{trigger:'.hero',refreshPriority:3,start:'top top',end:context.conditions.desktop?'+=650':'bottom top',pin:context.conditions.desktop,scrub:1,invalidateOnRefresh:true}});
     hero.to('.hero-image',{scale:1.2,yPercent:8,ease:'none'},0).to('.hero-copy',{y:-100,opacity:0,ease:'none'},0).to('.hero-shade',{opacity:.5,ease:'none'},0);
     gsap.fromTo('.story-art img',{clipPath:'inset(15% 10% 15% 10%)',scale:1.12},{clipPath:'inset(0% 0% 0% 0%)',scale:1,ease:'none',scrollTrigger:{trigger:'.story',start:'top 85%',end:'center 45%',scrub:1}});
     gsap.utils.toArray('.quote-word').forEach((word,i,arr)=>gsap.fromTo(word,{opacity:.16},{opacity:1,ease:'none',scrollTrigger:{trigger:'.quote-band',start:`top ${85-i/arr.length*45}%`,end:`top ${82-i/arr.length*45}%`,scrub:.5}}));
     gsap.fromTo('.film-thumbnail',{clipPath:'inset(10% 12% 10% 12% round 180px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:'.film-thumbnail',start:'top 90%',end:'top 25%',scrub:1}});
     gsap.fromTo('.garden-divider img',{scale:1.3,yPercent:-8},{scale:1,yPercent:8,ease:'none',scrollTrigger:{trigger:'.garden-divider',start:'top bottom',end:'bottom top',scrub:1}});
     gsap.fromTo('.garden-divider>div',{y:70,opacity:.2},{y:-30,opacity:1,ease:'none',scrollTrigger:{trigger:'.garden-divider',start:'top 80%',end:'center 35%',scrub:1}});
     const track=root.current.querySelector('.character-grid'),court=root.current.querySelector('.court');
     if(context.conditions.desktop){
      const distance=()=>Math.max(0,track.scrollWidth-track.parentElement.clientWidth);
      const tween=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{id:'royal-gallery',trigger:court,refreshPriority:1,start:'top top',end:()=>'+='+Math.max(distance(),1000),pin:true,scrub:.8,invalidateOnRefresh:true,onUpdate:self=>{gsap.set('.gallery-progress-fill',{scaleX:self.progress});const count=root.current.querySelector('.gallery-current');if(count)count.textContent=String(Math.min(7,1+Math.round(self.progress*6))).padStart(2,'0')}}});
      const cards=[...track.querySelectorAll('.character-card')];
      cards.forEach((card,i)=>{const focus=()=>{if(i>1){const st=tween.scrollTrigger;window.scrollTo({top:st.start+(st.end-st.start)*Math.min(1,card.offsetLeft/distance()),behavior:'instant'})}};card.addEventListener('focus',focus);cleanups.push(()=>card.removeEventListener('focus',focus));});
     }else{
      gsap.utils.toArray('.character-card').forEach((card,i)=>gsap.from(card,{y:65,rotation:i%2?2:-2,opacity:.45,ease:'none',scrollTrigger:{trigger:card,start:'top 95%',end:'top 60%',scrub:.5}}));
     }
    }
    // Locations: one pinned, scroll-scrubbed journey on desktop; a normal grid otherwise.
    const locationTrack=root.current.querySelector('.locations-track');
    if(locationTrack && context.conditions.desktop){
     const distance=()=>Math.max(0,locationTrack.scrollWidth-locationTrack.parentElement.clientWidth);
     const locationTween=gsap.to(locationTrack,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:'.locations',refreshPriority:2,start:'top top',end:()=>'+='+Math.max(distance(),1000),pin:true,scrub:1,invalidateOnRefresh:true,onUpdate:self=>gsap.set('.location-meter>span',{scaleX:self.progress})}});
     [...locationTrack.querySelectorAll('button')].forEach(card=>{const focus=()=>{const st=locationTween.scrollTrigger;window.scrollTo({top:st.start+(st.end-st.start)*Math.min(1,card.offsetLeft/distance()),behavior:'instant'})};card.addEventListener('focus',focus);cleanups.push(()=>card.removeEventListener('focus',focus))});
    }
    gsap.from('.synopsis-body>p',{y:50,opacity:.2,stagger:.15,ease:'none',scrollTrigger:{trigger:'.synopsis-body',start:'top 85%',end:'bottom 80%',scrub:1}});
    gsap.fromTo('.ost-art',{rotation:-10,scale:.82},{rotation:5,scale:1,ease:'none',scrollTrigger:{trigger:'.ost-section',start:'top bottom',end:'bottom top',scrub:1.3}});
    gsap.to('.ring-two',{rotation:100,ease:'none',scrollTrigger:{trigger:'.ost-section',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.ost-copy>*',{y:35,opacity:.15,stagger:.12,ease:'none',scrollTrigger:{trigger:'.ost-copy',start:'top 90%',end:'top 30%',scrub:1}});
    gsap.fromTo('.sound-wave span',{scaleY:.3},{scaleY:1,stagger:{each:.03,from:'center'},ease:'sine.inOut',scrollTrigger:{trigger:'.sound-wave',start:'top 95%',end:'top 25%',scrub:1}});
    gsap.fromTo('.teaser-frame',{clipPath:'inset(12% 15% 12% 15% round 180px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:'.teaser-frame',start:'top 90%',end:'top 20%',scrub:1}});
    gsap.to('.teaser-frame>img',{scale:1.08,ease:'none',scrollTrigger:{trigger:'.teaser-frame',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.script-seal',{rotationY:90,opacity:0,duration:1,scrollTrigger:{trigger:'.script-section',start:'top 75%',once:true}});
    gsap.to('.workflow-line>span',{scaleY:1,ease:'none',scrollTrigger:{trigger:'.workflow-steps',start:'top 65%',end:'bottom 65%',scrub:.5}});
    gsap.utils.toArray('.workflow-step').forEach((el,i)=>{
     gsap.from(el.querySelector('div'),{y:35,opacity:.2,ease:'none',scrollTrigger:{trigger:el,start:'top 90%',end:'top 55%',scrub:.6}});
     ScrollTrigger.create({trigger:el,start:'top 60%',end:'bottom 60%',onEnter:()=>updateCount(i),onEnterBack:()=>updateCount(i)});
    });
    function updateCount(i){const el=root.current.querySelector('.workflow-count');if(el)el.innerHTML=String(i+1).padStart(2,'0')+' <span>/ 08</span>';}
    gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:40,opacity:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    gsap.to('.scroll-progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
   },root);
   ScrollTrigger.sort();
   ScrollTrigger.refresh();
   let alive=true;
   document.fonts.ready.then(()=>{if(alive)ScrollTrigger.refresh()});
   const images=[...root.current.querySelectorAll('img')];
   const refresh=()=>ScrollTrigger.refresh();images.forEach(i=>{if(!i.complete)i.addEventListener('load',refresh,{once:true})});
   return()=>{alive=false;cleanups.forEach(fn=>fn());images.forEach(i=>i.removeEventListener('load',refresh));ctx.revert()};
  });
  cleanup.current=()=>mm.revert();
  return stop;
 },[page,lang,stop]);
 return stop;
}
