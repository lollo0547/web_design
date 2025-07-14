function createThemeSwitcher(){let e=`
    <div class="theme-switch-wrapper">
      <span class="theme-switch-icon">☀️</span>
      <label class="theme-switch" for="theme-toggle">
        <input type="checkbox" id="theme-toggle">
        <span class="theme-slider"></span>

      </label>
      <span class="theme-switch-icon">🌙</span>
    </div>
  `,t=document.getElementById("footer-theme-switcher");t&&(t.innerHTML=e);let m=document.getElementById("theme-toggle"),n=localStorage.getItem("theme");"dark"===n&&(m.checked=!0),m.addEventListener("change",function(){this.checked?(document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","minimal"),localStorage.setItem("theme","minimal")),document.body.classList.add("theme-transitioning"),setTimeout(()=>{document.body.classList.remove("theme-transitioning")},500)})}function applyTheme(){let e=localStorage.getItem("theme")||"minimal";if(document.documentElement.setAttribute("data-theme",e),"dark"===e){let t=document.getElementById("theme-toggle");t&&(t.checked=!0)}document.documentElement.classList.add("theme-loaded")}document.addEventListener("DOMContentLoaded",function(){createThemeSwitcher(),applyTheme()});