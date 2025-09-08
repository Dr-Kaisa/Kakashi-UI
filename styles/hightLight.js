(function () {
  // 1. 创建一个 style 标签，把样式注入
  const style = document.createElement("style");
  style.innerHTML = `
[kakashi-hilght] {
    text-decoration: none;
    display: inline-block;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;

    /* 默认变量值，可被覆盖 */
    --lighting-size: 300px;
    --lighting-color: #9333ea;
    --lighting-highlight-color: #d8b4fe;


    background-image: radial-gradient(
        var(--lighting-highlight-color),
        var(--lighting-color),
        var(--lighting-color)
    );
    background-size: var(--lighting-size) var(--lighting-size);
    background-repeat: no-repeat;

    background-position-x: calc(var(--x, 0px) - var(--positionX, 0px) - calc(var(--lighting-size) / 2));
    background-position-y: calc(var(--y, 0px) - var(--positionY, 0px) - calc(var(--lighting-size) / 2));
    background-color: var(--lighting-color);
}
`;
  document.head.appendChild(style);

  // 2. 找到所有带属性的元素
  const highlights = document.querySelectorAll("[kakashi-hilght]");

  function setPositions() {
    highlights.forEach((el) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--positionX", `${rect.left}px`);
      el.style.setProperty("--positionY", `${rect.top}px`);
      // 获取字体大小
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      console.log(fontSize);
      // 设置光点大小为字体大小的 20 倍
      el.style.setProperty("--lighting-size", `${fontSize * 20}px`);
    });
  }
  //初始化
  window.addEventListener("load", setPositions);
  // 窗口大小变化时更新位置
  window.addEventListener("resize", setPositions);

  // 3. 鼠标移动时更新光点位置
  document.body.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--x", `${e.clientX}px`);
    document.body.style.setProperty("--y", `${e.clientY}px`);
  });
})();
