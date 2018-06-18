import generateStyle from './Style.js';

class Analyzer {
  constructor(settings) {
    let defaults = {
      selector: 'body',
      peerConnection: null,
      interval: 3000,
      isVisible: true
    };
    this.options = { ...defaults, ...settings };

    this.element = document.querySelector(this.options.selector);

    if (this.element === null) {
      throw new Error('[Analyzer]: Not able to render to the element.');
    }
    if (this.options.peerConnection instanceof RTCPeerConnection === false) {
      throw new Error('[Analyzer]: peerConnection must be an instance of RTCPeerConnection.');
    }

    if (typeof this.options.interval !== 'number') {
      throw new Error('[Analyzer]: interval has to be a number.');
    }

    if ((this.options.isVisible === true || this.options.isVisible === false) === false) {
      throw new Error('[Analyzer]: isVisible has to be a boolean (true or false).');
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.wasCTRL = false;
    this.isVisible = this.options.isVisible;

    this.setup();
  }

  setup() {
    this.interval = setInterval(() => {
      this.options.peerConnection.getStats().then(stats => {
        this.render(stats);
      });
    }, this.options.interval);
    this.setKeyHandler();
  }

  generateFromPCState(title, key) {
    return `<tr><td>${title}</td><td>${this.options.peerConnection[key]}</td></tr>`;
  }

  generateHeader(headerTitle) {
    return `<header>${headerTitle}</header>`;
  }

  clearStage() {
    this.element.innerHTML = '';
  }

  renderToStage(table) {
    this.element.innerHTML = table;
  }

  generateFromObject(object) {
    let str = '';
    Object.keys(object).forEach(key => {
      str += `<tr><td>${key}</td><td>${object[key]}</td></tr>`;
    });
    return str;
  }

  generateIsVisibleClass() {
    if (this.isVisible === false) {
      return ' hidden';
    }
    return '';
  }

  render(stats) {
    let scrollBarMain = document.querySelector(this.options.selector + ' .webrtc-analyzer main');

    let rememberScrollTop = 0;
    if (scrollBarMain !== null) {
      rememberScrollTop = scrollBarMain.scrollTop;
    }

    this.clearStage();
    let str = `<div class="webrtc-analyzer${this.generateIsVisibleClass()}"><div class="box"><main>`;
    let trackI = 1;
    stats.forEach(stat => {
      if (stat.type === 'track') {
        str += this.generateHeader('Track ' + trackI);
        str += `<table>`;
        str += this.generateFromObject(stat);
        str += `</table>`;
        trackI++;
      }
    });
    str += this.generateHeader('PeerConnection states');
    str += `<table>`;
    str += this.generateFromPCState('Signaling state', 'signalingState');
    str += this.generateFromPCState('ICE gathering state', 'iceGatheringState');
    str += this.generateFromPCState('ICE Connection state', 'iceConnectionState');
    str += this.generateFromPCState('Connection state', 'connectionState');
    str += `</table>`;
    str += generateStyle();
    str += '</main></div></div>';
    this.renderToStage(str);
    let newscrollBarMain = document.querySelector(this.options.selector + ' .webrtc-analyzer main');
    newscrollBarMain.scrollTop = rememberScrollTop;
  }

  setKeyHandler() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  toggleVisibility() {
    if (this.isVisible) {
      document.querySelector(this.options.selector + ' .webrtc-analyzer').classList.add('hidden');
    } else {
      document.querySelector(this.options.selector + ' .webrtc-analyzer').classList.remove('hidden');
    }
    this.isVisible = !this.isVisible;
  }

  handleKeyDown(event) {
    if (this.wasCTRL && event.keyCode === 72) {
      this.toggleVisibility();
    }
    if (event.keyCode === 17) {
      this.wasCTRL = true;
    } else {
      this.wasCTRL = false;
    }
  }

  destroy() {
    document.removeEventListener(this.handleKeyDown);
    clearInterval(this.interval);
  }
}

export default Analyzer;
