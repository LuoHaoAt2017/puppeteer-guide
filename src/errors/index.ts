export class EmptyError extends Error {
  constructor(mesg: string) {
    super(mesg);
  }
}