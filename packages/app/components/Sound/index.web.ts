import { Howl } from 'howler';

export default class Sound {
  sound: any;
  static setCategory() {}

  constructor(asset: any, error: any) {
    this.sound = new Howl({
      src: [asset],
      onloaderror: error
    });

    // this.sound.once('load', () => {
    //   console.log('load', this.sound);
    //   console.log('objxxxect', this.sound.state());
    //   this.sound.play();
    // });

    // console.log('object', this.sound.state());

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  play() {
    console.log('should?');
    if (this.sound.state() !== 'loaded') return this;
    console.log('in');
    this.sound.play();
    return this;
  }

  stop() {
    this.sound.stop();
    return this;
  }
}
