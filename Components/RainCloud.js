// MyCloud.js
class RainCloud extends HTMLElement {
    constructor() {
        super();

        // 创建 Shadow Root (封闭的作用域，外部样式不会影响内部)
        this.attachShadow({ mode: 'open' });

        // 创建模板
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
          :host {
           --height:200px;
           --width:200px;
        }
          .container {
                position: relative;
                width:  var(--width);
                height: var(--width);
                display: flex;
                justify-content: center;
                
            }
          
            .container .cloud {
                position: relative;
                width: 80%;
                height: 25%;
                border-radius: 31% 100%;
                filter: drop-shadow( calc(var(--width) * 0.02) calc(var(--width) * 0.02) 0 #0005);
                animation: animateCloud 4s ease-in-out infinite alternate;
            }
            @keyframes animateCloud {
                0% {
                    filter: drop-shadow(calc(var(--width) * 0.02) calc(var(--width) * 0.02) 0 #0001) drop-shadow(0 0 0 #fff) brightness(1);
                }

                50% {
                    filter: drop-shadow(calc(var(--width) * 0.02) calc(var(--width) * 0.02) 0 #0001) drop-shadow(0 0 50px #fff5) brightness(1.5);
                }

                100% {
                    filter: drop-shadow(calc(var(--width) * 0.02) calc(var(--width) * 0.02) 0 #0001) drop-shadow(0 0 0 #fff) brightness(1);
                }
            }
            .container .cloud::before {
                content: '';
                position: absolute;
                top: calc(var(--width) * -0.125);
                left: calc(var(--width) * 0.1);
                width: calc(var(--width) * 0.275);
                height: calc(var(--width) * 0.275);
                border-radius: 50%;
                background: #484f59;
                box-shadow: calc(var(--width) * 0.225) calc(var(--width) * -0.025) 0 calc(var(--width) * 0.075) #484f59;
            }
            .container .cloud::after {
                content: '';
                position: absolute;
                inset: 0;
                background: #484f59;
                border-radius: calc(var(--width) * 0.25);
                z-index: 1000;
            }
            .container .cloud .drop {
                position: absolute;
                top: calc(var(--width) * 0.1);
                background: #05a2eb;
                width: calc(var(--width) * 0.05);
                height: calc(var(--width) * 0.025);
                transform: bottom;
                animation: animate 2s linear infinite;
            }
            @keyframes animate {
                0% {
                    transform: translateY(0) scaleY(1);
                }
                70% {
                    transform: translateY(calc(var(--height) * 0.9)) scaleY(1);
                }
                80% {
                    transform: translateY(calc(var(--height) * 0.9)) scaleY(0.2);
                }
                /* 回弹一点点然后纵向压缩，横向扩散 */    
                100% {
                    transform: translateY(calc(var(--height) * 0.899)) scaleY(0) scaleX(15);
                }
            
            }
        </style>
        <div class="container">
            <div class="cloud"></div>
        </div>
      `;

        // 将模板内容克隆到 Shadow Root
        this.shadowRoot.appendChild(template.content.cloneNode(true));


        const rain = () => {
            let cloud = this.shadowRoot.querySelector('.cloud');

            // 云的实际宽度（已经是 --width 的 80%）
            let effectiveWidth = cloud.offsetWidth;
            // let effectiveHeight = parseFloat(getComputedStyle(this).getPropertyValue('--height'));

            let e = document.createElement('div');
            e.classList.add('drop');

            // 随机横向位置（跟云宽度挂钩）
            let left = Math.random() * effectiveWidth;

            // 雨滴宽高比例（相对云大小，而不是固定像素）
            let width = effectiveWidth * 0.01 * (0.5 + Math.random());   // 0.5% ~ 1.5% 云宽度
            let height = effectiveWidth * 0.1 * (0.5 + Math.random());  // 5% ~ 15% 云高度

            // 动画时长（1s ~ 1.5s）
            let duration = (1 + Math.random() * 0.5) + 's';

            // 设置样式
            e.style.left = left + 'px';
            e.style.width = width + 'px';
            e.style.height = height + 'px';
            e.style.animationDuration = duration;

            cloud.appendChild(e);

            setTimeout(() => {
                cloud.removeChild(e);
            }, parseFloat(duration) * 1000);
        };



        setInterval(rain, 20)
    }


}

// 定义自定义元素
customElements.define('rain-cloud', RainCloud);