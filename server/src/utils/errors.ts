export class HTTPError extends Error {
  code: number;
  cause: Error | null;
  name: string;
  date: Date;

  constructor(
    code: number = 400,
    message: string,
    cause: Error | null = null,
    name: string = 'unknown'
  ) {
    super(message);
    this.code = code;
    this.cause = cause || null;
    this.name = name || this.constructor.name;
    this.date = new Date();
    console.error(this);
  }
}