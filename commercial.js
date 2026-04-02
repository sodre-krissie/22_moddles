(function() {

  // ✅ só roda na página correta
  if (!document.body || document.body.id !== 'page-my-index') return;

  function applyONI(card) {

    if (card.dataset.oniApplied) return; // evita reprocessar
    card.dataset.oniApplied = "true";

    var title = card.querySelector('h5.title');
    var thumb = card.querySelector('.thumb');
    var details = card.querySelector('.details');

    // título no overlay
    if (title && thumb) {
      thumb.setAttribute('data-title', title.textContent.trim());
    }

    // gradiente
    if (thumb && !thumb.querySelector('.thumb-footer-grad')) {
      var grad = document.createElement('div');
      grad.className = 'thumb-footer-grad';
      thumb.appendChild(grad);
    }

    // status
    if (thumb && !thumb.querySelector('.thumb-status')) {
      var pill = document.createElement('div');
      pill.className = 'thumb-status';
      pill.textContent = 'Publicado';
      thumb.appendChild(pill);
    }

    // progresso
    var pct = 0;
    var progressEl = card.querySelector('[class*="completo"]');
    if (progressEl) {
      var m = progressEl.textContent.match(/(\d+)/);
      if (m) pct = parseInt(m[1]);
    }

    if (details && !details.querySelector('.oni-divider')) {
      var divider = document.createElement('hr');
      divider.className = 'oni-divider';
      details.appendChild(divider);
    }

    if (details && !details.querySelector('.oni-progress-wrap')) {
      var wrap = document.createElement('div');
      wrap.className = 'oni-progress-wrap';

      var labelDiv = document.createElement('div');
      labelDiv.className = 'oni-progress-label';

      var spanL = document.createElement('span');
      spanL.textContent = 'Progresso';

      var spanR = document.createElement('span');
      spanR.textContent = pct + '%';

      labelDiv.appendChild(spanL);
      labelDiv.appendChild(spanR);

      var barDiv = document.createElement('div');
      barDiv.className = 'oni-progress-bar';

      var fillDiv = document.createElement('div');
      fillDiv.className = 'oni-progress-fill';
      fillDiv.style.width = pct + '%';

      barDiv.appendChild(fillDiv);

      wrap.appendChild(labelDiv);
      wrap.appendChild(barDiv);

      details.appendChild(wrap);
    }

    // 🔥 BOTÃO (agora garantido)
    if (details && !details.querySelector('.oni-btn')) {

      var link =
        card.querySelector('a.mcc_view') ||
        card.querySelector('a[href*="course"]') ||
        card.querySelector('a');

      var href = link ? link.getAttribute('href') : '#';

      var btn = document.createElement('a');
      btn.className = 'oni-btn';
      btn.href = href;
      btn.textContent = 'Acessar Curso →';

      details.appendChild(btn);
    }
  }

  function injectCSS() {

    document.getElementById('oni-hack')?.remove();

    var css = '';

    css += '.mc_content_list {border-radius:18px!important;overflow:hidden!important;box-shadow:0 4px 18px rgba(0,0,0,.10)!important;background:#fff!important;display:flex!important;flex-direction:column!important;position:relative!important;transition:.22s!important;border:1px solid #e4eef0!important;}';

    css += '.mc_content_list:hover {transform:translateY(-4px)!important;box-shadow:0 12px 32px rgba(9,110,130,.18)!important;}';

    css += '.mc_content_list .thumb {position:relative!important;height:190px!important;overflow:hidden!important;}';

    css += '.mc_content_list .img-whp {width:100%!important;height:100%!important;object-fit:cover!important;border-radius:4px!important;transform:scale(1.04)!important;transition:.4s!important;}';

    css += '.mc_content_list:hover .img-whp {transform:scale(1.09)!important;}';

    css += '.mc_content_list .thumb::after {content:""!important;position:absolute!important;inset:0!important;background:color-mix(in srgb,var(--color-theme) 84%,transparent)!important;border-radius:4px!important;}';

    css += '.mc_content_list .thumb::before {content:attr(data-title)!important;position:absolute!important;top:50%!important;left:0;right:0;transform:translateY(-60%)!important;color:#fff!important;font-weight:700!important;text-align:center!important;padding:0 22px!important;}';

    css += '.mc_content_list .thumb-footer-grad {position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(to top,rgba(4,60,75,.75),transparent);}';

    css += '.mc_content_list .thumb-status {position:absolute;bottom:12px;left:14px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:3px 10px;font-size:11px;color:#fff;}';

    css += '.mc_content_list .details {display:flex!important;flex-direction:column!important;height:100%!important;padding:14px 16px 0!important;}';

    css += '.oni-divider {height:1px;background:#d0eaf0;margin:0 0 12px;border:none;}';

    css += '.oni-progress-bar {height:6px;background:#e0eff3;border-radius:999px;}';

    css += '.oni-progress-fill {height:100%;background:var(--color-theme);}';

    css += '.oni-btn {display:flex;justify-content:center;align-items:center;padding:11px;background:var(--color-theme);color:#fff;font-weight:700;border-radius:4px;margin-top:auto;text-decoration:none;}';

    var el = document.createElement('style');
    el.id = 'oni-hack';
    el.innerHTML = css;

    document.head.appendChild(el);
  }

  function initONI() {
    injectCSS();
    document.querySelectorAll('.mc_content_list').forEach(applyONI);
  }

  // primeira execução
  initONI();

  // 👇 resolve AJAX do Moodle
  const observer = new MutationObserver(() => {
    initONI();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();


 
(function() {
  if (!document.body || document.body.id !== 'page-my-index') return;
  const bannerONI360 = {
    "oni360": "https://cdn.krissiesodre.com/moodle/oni360/oni360.png",
    "oniacademy":"https://cdn.krissiesodre.com/moodle/oni360/oniacademy.png",
    "onibooks":"https://cdn.krissiesodre.com/moodle/oni360/onibooks.png",
    "onicommerce":"https://cdn.krissiesodre.com/moodle/oni360/onicommerce.png",
    "onicreative":"https://cdn.krissiesodre.com/moodle/oni360/onicreative.png",
    "oniintelligence":"https://cdn.krissiesodre.com/moodle/oni360/oniintelligence.png",
    "onilive":"https://cdn.krissiesodre.com/moodle/oni360/onilive.png",
    "onipublishing":"https://cdn.krissiesodre.com/moodle/oni360/onipublishing.png",
    "oniquest":"https://cdn.krissiesodre.com/moodle/oni360/oniquest.png",
    "onisync":"https://cdn.krissiesodre.com/moodle/oni360/onisync.png",
    "onitutor": "https://cdn.krissiesodre.com/moodle/oni360/onitutor.png"
  };
  function injectStyle() {
    if (document.getElementById('oni-banner-style')) return;
    const style = document.createElement('style');
    style.id = 'oni-banner-style';
    style.textContent = `
      .oniBannerWrapper {width:100%;padding:16px 0;}
      .oniBannerContainer {display:flex;align-items:center;gap:8px;}
      .oniBannerTrack {overflow:hidden;width:100%;border-radius:8px;}
      .oniBannerInner {display:flex;transition:transform 0.5s ease;}
      .oniBannerSlide {min-width:100%;flex-shrink:0;}
      .oniBannerImg {width:100%;border-radius:8px;}
      .oniBannerBtn {background:rgba(0,0,0,.4);color:#fff;border:none;border-radius:50%;width:36px;height:36px;cursor:pointer;}
    `;
    document.head.appendChild(style);
  }
  function buildBanner(container) {
    if (container.querySelector('.oniBannerWrapper')) return;

    let currentIndex = 0;
    const entries = Object.entries(bannerONI360);

    const wrapper = document.createElement('div');
    wrapper.className = 'oniBannerWrapper';
    const inner = document.createElement('div');
    inner.className = 'oniBannerContainer';
    const track = document.createElement('div');
    track.className = 'oniBannerTrack';

    
    const slideInner = document.createElement('div');
    slideInner.className = 'oniBannerInner';

    
    entries.forEach(([key, src]) => {
      const slide = document.createElement('div');
      slide.className = 'oniBannerSlide';
      const img = document.createElement('img');
      img.src       = src;
      img.alt       = key;
      img.className = 'oniBannerImg';
      slide.appendChild(img);
      slideInner.appendChild(slide); // ← vai pro slideInner, não pro track
    });

    track.appendChild(slideInner);
    inner.appendChild(track);
    wrapper.appendChild(inner);
    container.prepend(wrapper);

    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % entries.length;
      slideInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 4000);
  }
  function initBanner() {
    injectStyle();
    const container = document.querySelector('.main_content_container');
    if (container) {
      buildBanner(container);
    }
  }
  initBanner();
  const observer = new MutationObserver(() => {
    initBanner();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();