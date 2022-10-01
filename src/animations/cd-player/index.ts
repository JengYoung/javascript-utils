import PlayerBody from './body';

class App {
  target: HTMLElement;

  body: PlayerBody;

  constructor(target: HTMLElement) {
    this.target = target;
    this.body = new PlayerBody(this.target);
  }

  render() {
    this.body.render();
  }
}

const $app = document.querySelector<HTMLElement>('#app');

if ($app) {
  const app = new App($app);

  app.render();
}

const $button = document.createElement('button');
$button.textContent = 'STOP';

document.body.appendChild($button);
