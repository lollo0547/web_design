function addPrintButton(){let t=`
    <a href="#" class="btn btn-outline print-cv-button" id="printCV">
      <span class="lang-it">Stampa CV</span>
      <span class="lang-en">Print Resume</span>
      <i class="print-icon">🖨️</i>
    </a>
  `,e=document.querySelector(".chi-sono-section .cta-container");e&&(e.insertAdjacentHTML("beforeend",t),document.getElementById("printCV").addEventListener("click",function(t){t.preventDefault(),preparePrint(),setTimeout(()=>{window.print()},300)}))}function createPrintElements(){let t=`
    <div class="print-header" style="display: none;">
      <div>
        <h1>Lorenzo Giudici</h1>
        <p>Product Designer</p>
      </div>
      <div class="print-date"></div>
    </div>
  `,e=`
    <div class="print-footer" style="display: none;">
      <p>Questo CV \xe8 stato generato da lorenzogiudici.com - ${new Date().toLocaleDateString()}</p>
    </div>
  `,n=`
    <div class="print-contact-info" style="display: none;">
      <a href="mailto:contatto@lorenzogiudici.com">contatto@lorenzogiudici.com</a>
      <a href="tel:+39XXXXXXXXXX">+39 XXX XXX XXXX</a>
      <a href="https://lorenzogiudici.com">lorenzogiudici.com</a>
    </div>
  `,i=document.getElementById("main-content");if(i){i.insertAdjacentHTML("afterbegin",t),i.insertAdjacentHTML("beforeend",e);let o=document.querySelector(".bio-content");o&&o.insertAdjacentHTML("afterbegin",n)}}function preparePrint(){let t=document.querySelector(".print-date");if(t){let e=new Date;t.textContent=e.toLocaleDateString()}document.body.classList.add("printing"),window.addEventListener("afterprint",function(){document.body.classList.remove("printing")})}document.addEventListener("DOMContentLoaded",function(){addPrintButton(),createPrintElements()});