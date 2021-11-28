import FormLogic from './formlogic';
import BaseControl from './controls/base-control';
import { Message, MessageQueue } from './message';

// 发布订阅中心
// 一个发布者有多个订阅者，使用 table 来维护这种关系。
export default class Dispatcher {

  private table: Map<string, Array<string>>;

  private $formInstance: FormLogic;

  private messageQueue: MessageQueue;
  
  constructor(formInstance: FormLogic) {
    this.table = new Map<string, Array<string>>();
    this.messageQueue = new MessageQueue();
    this.$formInstance = formInstance;
  }

  /**
   * 
   * @param publisher 发布者 id
   * @param subscribers 订阅者 id 构成的集合
   * @description z = x * y
   * @description x,y 是发布者。z 是订阅者。
   */
  public subscribe(puber: string, subscribers: Array<string> | string) {
    if (typeof subscribers === 'string') {
      subscribers = [subscribers];
    }
    if (!this.table.has(puber)) {
      this.table.set(puber, []);
    }
    const subers = this.table.get(puber) || [];
    for(let i = 0; i < subscribers.length; i++) {
      subers.push(subscribers[i]);
    }
    this.table.set(puber, subers);
  }

  /**
   * 
   * @param publisher 发布者发布消息给所有订阅者
   */
  public dispatch(publisher: string) {
    if (!this.table.has(publisher)) {
      return;
    }
    const subers = this.table.get(publisher) || [];
    for(let i = 0; i < subers.length; i++) {
      const subscriber = this.$formInstance.getControl(subers[i]);
      if (subscriber) {
        const puber = this.$formInstance.getControl(publisher);
        if (puber) {
          this.messageQueue.enquene(new Message(subscriber, puber));
        }
      }
    }
    // 处理消息队列中的消息体
  }

  public update() {
    while(!this.messageQueue.isEmpty()) {
      const message = this.messageQueue.dequene();
      if (message instanceof Message) {
        const suber: BaseControl = message.getSuber();
        suber.receive(message as Message);
      }
    }
    // todo: 视图重新渲染
  }

  public clear() {
    this.table.clear();
  }
}
