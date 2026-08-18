/* qtt · Personal Site — 全站共享脚本
   功能：
   1. 暗色模式切换（localStorage 持久化） + 切换按钮图标/文案同步
   2. 侧边栏收起/展开：页面顶端默认打开，向下滚动自动收起，回到顶端自动展开；
      可手动切换，手动选择在滚动中保持，回到顶端仍自动展开 */
(function () {
  var THEME_KEY = 'qtt-theme';
  var COLLAPSE_THRESHOLD = 140;      // 滚动超过该像素视为“已向下翻页”
  var manualOverride = null;          // null=自动，'open'/'collapsed'=手动选择
  var NAV_HIDE_DELAY = 3000;          // 移动端：空闲多久后自动隐藏导航（毫秒）
  var hideTimer = null;               // 移动端自动隐藏计时器

  /* ---------- 暗色模式 ---------- */
  function apply(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    var btn = document.getElementById('darkMode');
    if (btn) {
      var label = btn.querySelector('em');
      var icon = btn.querySelector('span');
      if (label) label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
      if (icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
      btn.classList.toggle('active', theme === 'dark');
    }
  }

  function toggleTheme() {
    var next = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    apply(next);
  }

  /* ---------- 侧边栏收起/展开 ---------- */
  function setCollapsed(collapsed) {
    document.body.classList.toggle('nav-collapsed', collapsed);
    var btn = document.getElementById('collapseToggle');
    if (btn) {
      var label = collapsed ? '展开导航' : '收起导航';
      btn.setAttribute('title', label);
      btn.setAttribute('aria-label', label);
    }
    var backdrop = document.getElementById('navBackdrop');
    if (backdrop) backdrop.setAttribute('aria-hidden', collapsed ? 'true' : 'false');
  }

  function isCollapsed() {
    return document.body.classList.contains('nav-collapsed');
  }

  function isDesktop() {
    return window.innerWidth >= 1050;
  }

  function scrollTop() {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  // 自动规则（仅桌面端）：顶端默认打开；向下滚动超过阈值自动收起；回到顶端自动展开。
  function syncFromScroll() {
    if (!isDesktop()) return;   // 移动端不随滚动处理
    var atTop = scrollTop() <= COLLAPSE_THRESHOLD;
    if (atTop) {
      manualOverride = null;
      setCollapsed(false);
    } else if (manualOverride === null) {
      setCollapsed(true);
    }
  }

  /* ---------- 移动端：导航自动隐藏 / 展开 ---------- */
  function isMobileExpanded() {
    return document.body.classList.contains('nav-expanded');
  }

  // 出现导航（初次进入 / 切换页面 / 滚动 / 点击页面）并重置自动隐藏计时。
  function showMobileNav() {
    document.body.classList.remove('nav-hidden');
    if (hideTimer) clearTimeout(hideTimer);
    if (!isMobileExpanded()) {
      hideTimer = setTimeout(function () {
        document.body.classList.add('nav-hidden');
      }, NAV_HIDE_DELAY);
    }
  }

  // 点击 qt 图标展开/收起：图标栈 ↔ 带文字胶囊；展开后保持可见。
  function toggleExpandMobile() {
    var expanded = document.body.classList.toggle('nav-expanded');
    if (expanded) {
      if (hideTimer) clearTimeout(hideTimer);
      document.body.classList.remove('nav-hidden');
    } else {
      showMobileNav();
    }
  }

  // 视口模式：桌面端顶端默认打开；移动端竖排图标导航，自动隐藏（空闲后淡出）。
  function applyViewportMode() {
    manualOverride = null;
    if (isDesktop()) {
      document.body.classList.remove('nav-hidden', 'nav-expanded');
      syncFromScroll();
    } else {
      setCollapsed(false);
      document.body.classList.remove('nav-expanded');
      showMobileNav();
    }
  }

  // 手动切换（仅桌面端）：记录用户选择，滚动时不再强制覆盖；回到顶端仍自动展开。
  function toggleCollapse() {
    if (!isDesktop()) return;   // 移动端固定显示图标栈，不折叠
    manualOverride = isCollapsed() ? 'open' : 'collapsed';
    setCollapsed(!isCollapsed());
  }

  function init() {
    // 恢复保存的主题（默认亮色）
    var saved = localStorage.getItem(THEME_KEY) || 'light';
    apply(saved);

    var darkBtn = document.getElementById('darkMode');
    if (darkBtn) {
      darkBtn.addEventListener('click', function () {
        toggleTheme();
        if (!isDesktop()) showMobileNav();
      });
    }

    var collapseBtn = document.getElementById('collapseToggle');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        if (isDesktop()) toggleCollapse();
        else toggleExpandMobile();
      });
    }

    var backdrop = document.getElementById('navBackdrop');
    if (backdrop) backdrop.addEventListener('click', toggleCollapse);

    window.addEventListener('scroll', function () {
      if (isDesktop()) syncFromScroll();
      else showMobileNav();
    }, { passive: true });
    window.addEventListener('resize', applyViewportMode);

    // 移动端：点击页面任意处（导航外）也唤出导航
    document.addEventListener('click', function (e) {
      if (!isDesktop() && !e.target.closest('.sidebar')) showMobileNav();
    });

    applyViewportMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
