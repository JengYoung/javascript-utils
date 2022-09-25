interface CounterInterface {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

class CubeController {
  direction: keyof CounterInterface | null;

  isAnimate: boolean;

  $target: HTMLElement;

  $moveButtons: HTMLElement;

  $moveLeftButton: HTMLElement;

  $moveRightButton: HTMLElement;

  $moveTopButton: HTMLElement;

  $moveBottomButton: HTMLElement;

  counter: CounterInterface;

  constructor(target: HTMLElement) {
    this.direction = null;
    this.isAnimate = false;
    this.$target = target;

    this.$moveButtons = document.createElement('div');

    this.$moveLeftButton = document.createElement('button');
    this.$moveRightButton = document.createElement('button');
    this.$moveTopButton = document.createElement('button');
    this.$moveBottomButton = document.createElement('button');

    this.init();

    this.counter = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }

  init() {
    this.$moveButtons.classList.add('move-btn-box');
    this.$moveLeftButton.classList.add('move-left-btn');
    this.$moveRightButton.classList.add('move-right-btn');
    this.$moveTopButton.classList.add('move-top-btn');
    this.$moveBottomButton.classList.add('move-bottom-btn');

    this.$moveLeftButton.textContent = '←';
    this.$moveRightButton.textContent = '→';
    this.$moveTopButton.textContent = '↑';
    this.$moveBottomButton.textContent = '↓';

    this.$moveButtons.appendChild(this.$moveLeftButton);
    this.$moveButtons.appendChild(this.$moveRightButton);
    this.$moveButtons.appendChild(this.$moveTopButton);
    this.$moveButtons.appendChild(this.$moveBottomButton);

    this.$moveLeftButton.addEventListener(
      'click',
      this.move.bind(this, 'left'),
    );
    this.$moveRightButton.addEventListener(
      'click',
      this.move.bind(this, 'right'),
    );
    this.$moveTopButton.addEventListener('click', this.move.bind(this, 'top'));
    this.$moveBottomButton.addEventListener(
      'click',
      this.move.bind(this, 'bottom'),
    );
  }

  render() {
    this.$target.appendChild(this.$moveButtons);

    document.querySelector('.cube')?.addEventListener('transitionstart', () => {
      this.isAnimate = true;
    });

    document.querySelector('.cube')?.addEventListener('transitionend', () => {
      this.update();

      const $cube = document.querySelector('.cube') as HTMLElement;
      $cube.style.cssText = 'transition: none';

      this.isAnimate = false;
    });
  }

  update() {
    if (this.direction === 'top') {
      const $top = document.querySelector('.top');
      const $bottom = document.querySelector('.bottom');
      const $front = document.querySelector('.front');
      const $back = document.querySelector('.back');

      $top?.classList.add('back');
      $bottom?.classList.add('front');
      $front?.classList.add('top');
      $back?.classList.add('bottom');

      $top?.classList.remove('top');
      $bottom?.classList.remove('bottom');
      $front?.classList.remove('front');
      $back?.classList.remove('back');
    }
    if (this.direction === 'bottom') {
      const $top = document.querySelector('.top');
      const $bottom = document.querySelector('.bottom');
      const $front = document.querySelector('.front');
      const $back = document.querySelector('.back');

      $top?.classList.add('front');
      $bottom?.classList.add('back');
      $front?.classList.add('bottom');
      $back?.classList.add('top');

      $top?.classList.remove('top');
      $bottom?.classList.remove('bottom');
      $front?.classList.remove('front');
      $back?.classList.remove('back');
    }
    if (this.direction === 'left') {
      const $left = document.querySelector('.left');
      const $back = document.querySelector('.back');
      const $right = document.querySelector('.right');
      const $front = document.querySelector('.front');

      $left?.classList.add('back');
      $back?.classList.add('right');
      $right?.classList.add('front');
      $front?.classList.add('left');

      $left?.classList.remove('left');
      $back?.classList.remove('back');
      $right?.classList.remove('right');
      $front?.classList.remove('front');
    }
    if (this.direction === 'right') {
      const $left = document.querySelector('.left');
      const $back = document.querySelector('.back');
      const $right = document.querySelector('.right');
      const $front = document.querySelector('.front');

      $left?.classList.add('front');
      $back?.classList.add('left');
      $right?.classList.add('back');
      $front?.classList.add('right');

      $left?.classList.remove('left');
      $back?.classList.remove('back');
      $right?.classList.remove('right');
      $front?.classList.remove('front');
    }
  }

  move(direction: keyof CounterInterface) {
    if (this.isAnimate) return;

    this.direction = direction;

    this.counter[direction] += 1;
    const xyDegrees = {
      top: [90, 0],
      bottom: [-90, 0],
      left: [0, -90],
      right: [0, 90],
    };

    const [xDegree, yDegree] =
      xyDegrees[this.direction as keyof CounterInterface];

    const $cube = document.querySelector('.cube') as HTMLElement;

    $cube.style.cssText = `
      transition: all 0.3s ease-out;
      transform: rotateX(${xDegree}deg) rotateY(${yDegree}deg)
    `;
  }
}

export default CubeController;
