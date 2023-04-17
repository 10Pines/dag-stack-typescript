import {Stack} from "./Stack";
import {StackNode} from "./StackNode";

export class StackBase<T> implements StackNode<T> {
    isEmpty(): boolean {
        return true;
    }

    deepSize(): number {
        return this.size();
    }

    element(): T {
        throw new Error(Stack.ERROR_STACK_EMPTY_DESCRIPTION);
    }

    size(): number {
        return 0;
    }

    previous(): StackNode<T> {
        return this;
    }

    mapToStack<R>(elementMapping: (element: T) => R): Stack<R> {
        return new Stack<R>();
    }
}