class PlayerBody {
  root: HTMLElement;

  cdPlayer: HTMLElement;

  cdPlayerTrack: HTMLElement;

  cd: HTMLElement;

  cdCenter: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.cdPlayer = document.createElement('div');
    this.cdPlayer.classList.add('cd-player__body');

    this.cdPlayerTrack = document.createElement('div');
    this.cdPlayerTrack.classList.add('cd-player__track');

    this.cd = document.createElement('div');
    this.cd.classList.add('cd-player__cd');

    this.cdCenter = document.createElement('div');
    this.cdCenter.classList.add('cd__center');
  }

  render() {
    const documentFragment = new DocumentFragment();
    documentFragment.appendChild(this.cdPlayerTrack);
    documentFragment.appendChild(this.cd);

    this.cd.appendChild(this.cdCenter);

    this.cdPlayer.appendChild(documentFragment);
    this.root.appendChild(this.cdPlayer);
  }
}

export default PlayerBody;
