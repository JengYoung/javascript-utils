interface CounterInterface {
  top: number;
  left: number;
  right: number;
  bottom: number;
}
interface RotateElementsInterface {
  element: HTMLElement;
  className: string;
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
    const $top = document.querySelector('.top') as HTMLElement;
    const $bottom = document.querySelector('.bottom') as HTMLElement;
    const $front = document.querySelector('.front') as HTMLElement;
    const $back = document.querySelector('.back') as HTMLElement;
    const $left = document.querySelector('.left') as HTMLElement;
    const $right = document.querySelector('.right') as HTMLElement;

    const rotateXs: RotateElementsInterface[] = [
      {element: $top, className: 'top'},
      {element: $back, className: 'back'},
      {element: $bottom, className: 'bottom'},
      {element: $front, className: 'front'},
    ];
    const rotateYs: RotateElementsInterface[] = [
      {element: $front, className: 'front'},
      {element: $right, className: 'right'},
      {element: $back, className: 'back'},
      {element: $left, className: 'left'},
    ];

    const updateClassName = (
      origin: RotateElementsInterface[],
      isDirectionRight: boolean,
    ) => {
      origin.forEach(({element}, index) => {
        const nextIndex = isDirectionRight
          ? (index + 1) % 4
          : (4 + index - 1) % 4;

        element.classList.add(origin[nextIndex].className);
      });

      origin.forEach(({element, className}) => {
        element.classList.remove(className);
      });
    };

    if (this.direction === 'top') updateClassName(rotateXs, true);
    if (this.direction === 'bottom') updateClassName(rotateXs, false);
    if (this.direction === 'left') updateClassName(rotateYs, false);
    if (this.direction === 'right') updateClassName(rotateYs, true);
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
