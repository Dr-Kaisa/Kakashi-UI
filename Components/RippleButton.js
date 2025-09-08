class RippleButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        :host {
           --height:300px;
           --width:300px;
           --start-color:#755bea;
           --end-color:#ff72c0;
        }
           .button {
                position: relative;
                padding: calc(var(--height) * 0.025) calc(var(--width) * 0.125);
                color: #fff;
                background: linear-gradient(90deg, var(--start-color), var(--end-color));
                border-radius: 9000px;
                overflow: hidden;
                cursor: pointer;
                font-size: calc(min(var(--width), var(--height)) * 0.07);
                 /* Chrome / Safari / Edge */
                -moz-user-select: none;
                /* Firefox */
                -ms-user-select: none;
                /* IE10+ */
                user-select: none;
                /* 标准写法 */
            }
            .button span {
                position: absolute;
                width: calc(var(--width) * 0.05);
                height: calc(var(--height) * 0.05);
                background-color: #fff;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                animation: wave 1s linear infinite;
                
            }
            @keyframes wave {
                0% {
                    width: 0;
                    height: 0;
                    opacity: .5;
                }
                /* width和height决定波纹扩散速度 */
                100% {
                    width: calc(max(var(--width), var(--height)) * 1.25);;
                    height: calc(max(var(--width), var(--height)) * 1.25);;
                    opacity: 0;
                }
            }
        </style>
         <div class="button"><slot></slot></div>
      `;
    // 将模板内容克隆到 Shadow Root
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const button = this.shadowRoot.querySelector(".button");

    button.onclick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const mask = document.createElement("span");
      mask.style.cssText = `left: ${x}px; top: ${y}px`;
      button.append(mask);
      setTimeout(() => mask.remove(), 1000);
    };
  }
}

customElements.define("ripple-button", RippleButton);
