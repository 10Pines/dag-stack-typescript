import {StackNode} from "./StackNode";
import {Stack} from "./Stack";
export class PushedObject<T> implements StackNode<T> {
    private readonly _element: T;
    private readonly _previous: StackNode<T>;

    constructor(anObject: T, aStackElement: StackNode<T>) {
        this._element = anObject;
        this._previous = aStackElement;
    }

    isEmpty(): boolean {
        return false;
    }

    deepSize(): number {
        return this._previous.deepSize() + this.size();
    }

    element(): T {
        return this._element;
    }

    size(): number {
        return 1;
    }

    previous(): StackNode<T> {
        return this._previous;
    }

    mapToStack<R>(elementMapping: (elementToMap: T) => R): Stack<R> {
        const mappedStack = this._previous.mapToStack<R>(elementMapping);
        mappedStack.push(elementMapping(this._element));
        return mappedStack;
    }

    filterToStack(selectingCondition: (element: T) => boolean): Stack<T> {
        const filteredStack = this._previous.filterToStack(selectingCondition);
        if (selectingCondition(this._element))
            filteredStack.push(this._element);
        return filteredStack;
    }
}