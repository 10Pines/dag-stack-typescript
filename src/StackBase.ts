import {Stack} from "./Stack";
import {StackNode} from "./StackNode";

export class StackBase<T> implements StackNode<T> {
    isEmpty(): true {
        return true;
    }

    deepSize(): 0 {
        return this.size();
    }

    element(): T {
        throw new Error(Stack.ERROR_STACK_EMPTY_DESCRIPTION);
    }

    size(): 0 {
        return 0;
    }

    previous(): this {
        return this;
    }

    mapToStack<R>(elementMapping: (element: T) => R): Stack<R> {
        return new Stack<R>();
    }

    filterToStack(selectingCondition: unknown): Stack<T> {
        return new Stack<T>();
    }
}
