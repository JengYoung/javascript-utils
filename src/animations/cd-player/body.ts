import CD from './cd';

class PlayerBody {
  root: HTMLElement;

  cdPlayer: HTMLElement;

  cdPlayerTrack: HTMLElement;

  cd: CD;

  constructor(root: HTMLElement) {
    this.root = root;
    this.cdPlayer = document.createElement('div');
    this.cdPlayer.classList.add('cd-player');

    this.cdPlayerTrack = document.createElement('div');
    this.cdPlayerTrack.classList.add('cd-player__track');

    this.cd = new CD(this.cdPlayer);

    const $button = document.createElement('button');
    $button.textContent = 'STOP';

    $button?.addEventListener('click', () => {
      if ($button.textContent === 'STOP') {
        this.cd.stop();
        $button.textContent = 'PLAY';
      } else {
        this.cd.play();
        $button.textContent = 'STOP';
      }
    });
    this.root.appendChild($button);
  }

  render() {
    const documentFragment = new DocumentFragment();
    documentFragment.appendChild(this.cdPlayerTrack);

    this.cdPlayer.appendChild(documentFragment);
    this.root.appendChild(this.cdPlayer);

    this.cd.render();
  }
}

export default PlayerBody;
