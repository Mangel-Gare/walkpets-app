export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  readonly isSuccess = true;
  readonly isFailure = false;
  constructor(public readonly value: T) {}
}

export class Failure<T, E> {
  readonly isSuccess = false;
  readonly isFailure = true;
  constructor(public readonly error: E) {}
}

export const success = <T, E>(value: T): Result<T, E> => new Success(value);
export const failure = <T, E>(error: E): Result<T, E> => new Failure(error);
