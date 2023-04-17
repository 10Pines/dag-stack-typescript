import {Stack} from "./Stack";

export interface StackNode<T> {
    isEmpty(): boolean;
    deepSize(): number;
    size(): number;
    element(): T;
    previous(): StackNode<T>;
    mapToStack<R>(elementMapping: (elementToMap: T) => R): Stack<R>;
}