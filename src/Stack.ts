import {PushedObject} from "./PushedObject";
import {StackBase} from "./StackBase";
import {StackNode} from "./StackNode";

export class Stack<T> {
    static ERROR_STACK_EMPTY_DESCRIPTION = "The stack is empty";

    private _top: StackNode<T>;

    constructor() {
        this._top = new StackBase();
    }

    isEmpty(): boolean {
        return this._top.isEmpty();
    }

    push(anObject: T): void {
        this._top = new PushedObject(anObject, this._top);
    }

    pop(): T {
        const elementToPop = this.top();
        this._top = this._top.previous();
        return elementToPop;
    }

    top(): T {
        return this._top.element();
    }

    size(): number {
        return this._top.deepSize();
    }

    map<R>(elementMapping: (elementToMap: T) => R): Stack<R> {
        return this._top.mapToStack(elementMapping);
    }

    filter(selectingCondition: (element: T) => boolean): Stack<T> {
        return this._top.filterToStack(selectingCondition);
    }
}