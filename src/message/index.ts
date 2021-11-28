import BaseControl from '../controls/base-control';

export class Message {

  private subscriber: BaseControl;

  private publisher: BaseControl;

  constructor(subscriber: BaseControl, publisher: BaseControl) {
    this.subscriber = subscriber;
    this.publisher = publisher;
  }

  getSuber(): BaseControl {
    return this.subscriber;
  }

  getPuber() {
    return this.publisher;
  }
}

export class MessageQueue {

  private queue: Array<Message>;

  private isBlocked: boolean = false;

  constructor() {
    this.queue = new Array<Message>();
  }

  public enquene(mesg: Message) {
    if (!this.isBlocked) {
      this.queue.push(mesg);
    }
  }

  public dequene(): Message | Boolean {
    if (this.queue.length > 0) {
      return (this.queue.shift() as Message);
    }
    return false;
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  public clearAll() {
    this.queue.length = 0;
  }
}
