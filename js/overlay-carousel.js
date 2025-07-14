document.addEventListener("DOMContentLoaded",function(){let e=document.querySelectorAll(".overlay-carousel-track"),t=document.querySelectorAll(".overlay-carousel-prev"),r=document.querySelectorAll(".overlay-carousel-next"),a=document.querySelectorAll(".overlay-zoom-icon");e.forEach((e,l)=>{let n=t[l],i=r[l],c=a[l],o=e.dataset.project,s=e.querySelectorAll(".overlay-carousel-slide"),d=document.querySelectorAll(`.overlay-thumb[data-carousel="${o}"]`),u=0;function $(){let e=(u-1+s.length)%s.length;f(e)}function v(){let e=(u+1)%s.length;f(e)}function f(e){s[u].classList.remove("active"),d[u].classList.remove("active"),s[e].classList.add("active"),d[e].classList.add("active"),u=e}s.forEach((e,t)=>{e.classList.contains("active")&&(u=t)}),n&&n.addEventListener("click",$),i&&i.addEventListener("click",v),c&&c.addEventListener("click",function e(){let t=s[u],r=t.querySelector("img");if(!r)return;let a=document.createElement("div");a.className="fullscreen-image-container";let l=document.createElement("img");l.src=r.src,l.alt=r.alt,l.className="fullscreen-image";let n=document.createElement("button");n.className="fullscreen-close",n.innerHTML="\xd7",n.setAttribute("aria-label","Chiudi visualizzazione a schermo intero"),a.appendChild(l),a.appendChild(n),document.body.appendChild(a),document.body.style.overflow="hidden",setTimeout(()=>{a.classList.add("active")},10),n.addEventListener("click",()=>{a.classList.remove("active"),setTimeout(()=>{document.body.removeChild(a),document.body.style.overflow=""},300)}),a.addEventListener("click",e=>{e.target===a&&n.click()});let i=e=>{"Escape"===e.key&&(n.click(),document.removeEventListener("keydown",i))};document.addEventListener("keydown",i)}),d.forEach((e,t)=>{e.addEventListener("click",()=>{f(t)})});let h=0,p=0;e.addEventListener("touchstart",e=>{h=e.changedTouches[0].screenX},{passive:!0}),e.addEventListener("touchend",e=>{p=e.changedTouches[0].screenX,function e(){let t=p-h;50>Math.abs(t)||(t>0?$():v())}()},{passive:!0}),e.addEventListener("keydown",e=>{"ArrowLeft"===e.key?($(),e.preventDefault()):"ArrowRight"===e.key&&(v(),e.preventDefault())}),e.setAttribute("tabindex","0")});let l=document.createElement("style");l.textContent=`
    .fullscreen-image-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(8px);
    }
    
    .fullscreen-image-container.active {
      opacity: 1;
    }
    
    .fullscreen-image {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border-radius: 4px;
    }
    
    .fullscreen-image-container.active .fullscreen-image {
      transform: scale(1);
    }
    
    .fullscreen-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    }
    
    .fullscreen-close:hover {
      background-color: rgba(255, 255, 255, 0.4);
      transform: rotate(90deg);
    }
  `,document.head.appendChild(l)});