// LINE ID — 請替換
const LINE_URL = 'https://line.me/ti/p/@yourid';

// Hero Carousel
function initCarousel(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if(!slides.length) return;
  let cur = 0, timer;

  function go(n){
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
  }
  function start(){ timer = setInterval(()=> go(cur+1), 5000); }
  function stop(){ clearInterval(timer); }

  document.querySelector('.hero-btn.prev')?.addEventListener('click',()=>{ stop(); go(cur-1); start(); });
  document.querySelector('.hero-btn.next')?.addEventListener('click',()=>{ stop(); go(cur+1); start(); });
  dots.forEach((d,i)=> d.addEventListener('click',()=>{ stop(); go(i); start(); }));

  slides[0].classList.add('active');
  dots[0].classList.add('active');
  start();
}

// Mobile Nav
function initNav(){
  const btn  = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.nav-links');
  btn?.addEventListener('click',()=> menu.classList.toggle('open'));
}

// Line buttons
function initLine(){
  document.querySelectorAll('[data-line]').forEach(el=>{
    el.addEventListener('click', e=>{ e.preventDefault(); window.open(LINE_URL,'_blank'); });
  });
}

// Fade-in on scroll
function initFade(){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
  },{threshold:0.1});
  document.querySelectorAll('.fade').forEach(el=>{
    el.style.cssText='opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease';
    obs.observe(el);
  });
  document.querySelector('.visible')?.style.setProperty && document.querySelectorAll('.visible').forEach(el=>{
    el.style.opacity='1'; el.style.transform='translateY(0)';
  });

  // Use MutationObserver fallback for older Dreamweaver preview
  const style = document.createElement('style');
  style.textContent = '.fade.visible{opacity:1 !important;transform:translateY(0) !important}';
  document.head.appendChild(style);
}

// Form submit
function initForm(){
  const form = document.querySelector('#inquiry-form');
  form?.addEventListener('submit', e=>{
    e.preventDefault();
    alert('感謝您的詢問，我們將儘速與您聯繫！');
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  initCarousel();
  initNav();
  initLine();
  initFade();
  initForm();
});
