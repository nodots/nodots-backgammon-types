type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntegerRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

/**
 * Result type for operations that can succeed or fail
 */
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Helper to create a successful result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data }
}

/**
 * Helper to create a failed result
 */
export function failure<E = string>(error: E): Result<never, E> {
  return { success: false, error }
}
