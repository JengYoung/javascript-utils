export abstract class Observer {
  abstract key: string;

  abstract update(...args: unknown[]): void;
}
