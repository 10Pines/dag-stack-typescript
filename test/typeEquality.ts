type SubtypePredicateLeft<X> = <T>() => (T extends X ? true : false);
type SubtypePredicateRight<X> = <T>() => (T extends X ? true : false);

export type Equal<X, Y> = SubtypePredicateLeft<X> extends SubtypePredicateRight<Y> ? true : false

export function assertType<T extends true>() {}
export function denyType<T extends false>() {}
