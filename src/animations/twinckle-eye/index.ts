export class TwinkleEye {
  isInitOpenEye: boolean;

  isCloseEye: boolean;

  isReOpenEyeCompleted: boolean;

  isFilterCleared: boolean;

  isAnimationEnd: boolean;

  target: HTMLElement;

  sight: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  height: number;

  skewEyeDegree: number;

  #ORIGIN_SKEW_EYE_DEGREE: number;

  #filter: number = 10;

  constructor(
    target: HTMLElement,
    height: number = 100,
    skewEyeDegree: number = 0.04,
  ) {
    this.isInitOpenEye = false;
    this.isCloseEye = false;
    this.isReOpenEyeCompleted = false;
    this.isFilterCleared = false;
    this.isAnimationEnd = false;

    this.target = target;
    this.skewEyeDegree = skewEyeDegree;

    this.#ORIGIN_SKEW_EYE_DEGREE = skewEyeDegree;
    this.height = height;

    (this.target.querySelector('.page') as HTMLElement).style.cssText = `
      filter: blur(10px);
    `;

    this.sight = document.createElement('canvas');
    this.sight.classList.add('twinkle-eye-sight');
    this.target.appendChild(this.sight);

    this.ctx = this.sight.getContext('2d') as CanvasRenderingContext2D;

    this.sight.width = window.innerWidth;
    this.sight.height = window.innerHeight;

    window.addEventListener('resize', this.resize.bind(this));

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(timestamp: number) {
    if (
      this.isInitOpenEye &&
      this.isCloseEye &&
      this.isFilterCleared &&
      this.isReOpenEyeCompleted
    ) {
      this.isAnimationEnd = true;
    }

    this.ctx.clearRect(0, 0, this.sight.width, this.sight.height);

    this.init(timestamp);

    this.render();

    if (!this.isAnimationEnd) requestAnimationFrame(this.animate.bind(this));
  }

  init(timestamp: number) {
    const initOpenEye = (height: number) => {
      if (this.isInitOpenEye) return;

      if (this.height >= height) {
        this.isInitOpenEye = true;
        return;
      }

      this.height *= 1.015;
    };

    const closeEye = (height: number) => {
      if (timestamp < 1000) return;
      if (!this.isInitOpenEye || this.isCloseEye) return;

      if (Math.floor(this.height) <= height) {
        this.isCloseEye = true;
        return;
      }

      this.skewEyeDegree *= 0.975;
      this.height *= 0.95;
    };

    const reOpenEye = (height: number) => {
      if (timestamp < 1800) return;
      if (!this.isInitOpenEye || !this.isCloseEye) return;

      if (this.skewEyeDegree < this.#ORIGIN_SKEW_EYE_DEGREE) {
        this.skewEyeDegree = Math.max(
          this.skewEyeDegree,
          this.#ORIGIN_SKEW_EYE_DEGREE * 0.1,
        );

        this.skewEyeDegree *= 1.05;
      }

      if (this.height > height) {
        this.isReOpenEyeCompleted = true;
        return;
      }

      this.height *= 1.1;
    };

    const clearFilter = () => {
      if (this.isFilterCleared) return;
      if (timestamp < 1800) return;

      this.#filter = Math.floor(this.#filter) ? this.#filter - 0.1 : 0;

      const $page = this.target.querySelector('.page') as HTMLElement;
      if (!this.#filter) {
        this.isFilterCleared = true;
        $page.style.cssText = '';
        return;
      }

      $page.style.cssText = `
        filter: blur(${this.#filter}px);
      `;
    };

    initOpenEye(200);
    closeEye(0);
    reOpenEye(this.sight.height);
    clearFilter();
  }

  resize() {
    this.sight.width = window.innerWidth;
    this.sight.height = window.innerHeight;

    this.render();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, (this.sight.height - this.height) * 0.5);

    this.ctx.bezierCurveTo(
      this.sight.width * 0.25,
      this.sight.height * (0.5 - this.skewEyeDegree) - this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * (0.5 - this.skewEyeDegree) - this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * (0.5 - this.skewEyeDegree) - this.height * 0.5,
    );

    this.ctx.bezierCurveTo(
      this.sight.width * 0.5,
      this.sight.height * (0.5 - this.skewEyeDegree) - this.height * 0.5,
      this.sight.width * 0.75,
      this.sight.height * (0.5 - this.skewEyeDegree) - this.height * 0.5,
      this.sight.width,
      this.sight.height * 0.5 - this.height * 0.5,
    );

    this.ctx.lineTo(this.sight.width, 0);

    this.ctx.fillStyle = 'rgba(0, 0, 0)';
    this.ctx.fill();

    // 아래쪽 눈도 구현한다.
    this.ctx.beginPath();
    this.ctx.moveTo(0, (this.sight.height + this.height) * 0.5);
    this.ctx.bezierCurveTo(
      this.sight.width * 0.25,
      this.sight.height * (0.5 + this.skewEyeDegree) + this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * (0.5 + this.skewEyeDegree) + this.height * 0.5,
      this.sight.width * 0.5,
      this.sight.height * (0.5 + this.skewEyeDegree) + this.height * 0.5,
    );

    this.ctx.bezierCurveTo(
      this.sight.width * 0.5,
      this.sight.height * (0.5 + this.skewEyeDegree) + this.height * 0.5,
      this.sight.width * 0.75,
      this.sight.height * (0.5 + this.skewEyeDegree) + this.height * 0.5,
      this.sight.width,
      this.sight.height * 0.5 + this.height * 0.5,
    );

    this.ctx.lineTo(this.sight.width, this.sight.height);
    this.ctx.lineTo(0, this.sight.height);

    this.ctx.fillStyle = 'rgba(0, 0, 0)';
    this.ctx?.fill();
    // this.target.appendChild(this.sight);
  }
}

const $target = document.querySelector('#app') as HTMLElement;

const twinckleEye = new TwinkleEye($target);

twinckleEye.render();
