interface CounterInterface {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

class CubeController {
  $target: HTMLElement;

  $moveButtons: HTMLElement;

  $moveLeftButton: HTMLElement;

  $moveRightButton: HTMLElement;

  $moveTopButton: HTMLElement;

  $moveBottomButton: HTMLElement;

  counter: CounterInterface;

  constructor(target: HTMLElement) {
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
  }

  move(direction: keyof CounterInterface) {
    this.counter[direction] += 1;

    const xDegree = (this.counter.top - this.counter.bottom) * 90;
    const yDegree = (this.counter.right - this.counter.left) * 90;

    const $cube = document.querySelector('.cube') as HTMLElement;

    $cube.style.cssText = `transform: rotateX(${xDegree}deg) rotateY(${yDegree}deg)`;
  }
}

export default CubeController;
