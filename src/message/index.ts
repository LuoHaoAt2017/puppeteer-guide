import BaseControl from '../controls/base-control';

export class Message {

  private subscriber: BaseControl;

  private publisher: BaseControl;

  // 消息的接受者是必须的，消息的发送者是可选的。
  constructor(subscriber: BaseControl, publisher?: BaseControl) {
    this.subscriber = subscriber;
    this.publisher = publisher || null;
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
