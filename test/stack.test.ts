import {Stack} from "../src/Stack";
import {assertType, Equal} from "./typeEquality";

describe("Stack tests", () => {

    function emptyStack<T>() {
        return new Stack<T>();
    }

    test('stack must be empty when created', () => {
        const stack: Stack<unknown> = new Stack();

        expect(stack.isEmpty()).toEqual(true);
    });

    test('push adds an element to the stack', function(){
        const stack = emptyStack<string>();
        stack.push("Something");

        expect(stack.isEmpty()).toEqual(false);
    });

    test('pop removes an element from the stack', function() {
        const stack = emptyStack<string>();
        stack.push("Something");
        stack.pop();

        expect(stack.isEmpty()).toEqual(true);
    });

    test('pop returns the last pushed object', function(){
        const stack = emptyStack<string>();
        const pushedObject = "Something";
        stack.push(pushedObject);

        expect(stack.pop()).toEqual(pushedObject);
    });

    test('stack behaves LIFO', function (){
        const firstPushed = "First";
        const secondPushed = "Second";
        const stack = emptyStack<string>();
        stack.push(firstPushed);
        stack.push(secondPushed);

        expect(secondPushed).toEqual(stack.pop());
        expect(stack.pop()).toEqual(firstPushed);
        expect(stack.isEmpty()).toEqual(true);
    });

    test('top returns the last pushed object', function (){
        const stack = emptyStack();
        const pushedObject = "Something";

        stack.push(pushedObject);

        expect(stack.top()).toEqual(pushedObject);
    });

    test('top does not remove any element from the stack', function(){
        const stack = emptyStack();
        const pushedObject = "Something";
        stack.push(pushedObject);

        stack.top();

        expect(stack.size()).toEqual(1);
    });

    test('cannot pop an empty stack', function(){
        const stack = emptyStack();

        expect(() => stack.pop()).toThrowError(Stack.ERROR_STACK_EMPTY_DESCRIPTION);

    });

    test('cannot top an empty stack', function(){
        const stack = emptyStack();

        expect(() => stack.top()).toThrowError(Stack.ERROR_STACK_EMPTY_DESCRIPTION);
    });

    test('mapping an empty stack returns a new empty stack', () => {
        const stack = emptyStack<unknown>();

        const mappedStack = stack.map(_element => fail());

        expect(mappedStack.isEmpty()).toBe(true);
        expect(mappedStack).not.toBe(stack);
    });

    test('mapping a one-element stack returns a new stack with that element mapped', () => {
        const stack = emptyStack<number>();
        stack.push(123);

        const mappedStack = stack.map(element => String(element + 1));

        assertType<Equal<Stack<string>, typeof mappedStack>>();
        expect(mappedStack.pop()).toEqual("124");
        expect(mappedStack.isEmpty()).toBe(true);
        expect(mappedStack).not.toBe(stack);
    });


    test('mapping a many-element stack returns a new stack with the elements mapped in the same order', () => {
        const stack = emptyStack<string>();
        stack.push("A");
        stack.push("B");
        stack.push("C");

        const mappedStack = stack.map(element => "mapped " + element);

        expect(mappedStack.pop()).toEqual("mapped C");
        expect(mappedStack.pop()).toEqual("mapped B");
        expect(mappedStack.pop()).toEqual("mapped A");
        expect(mappedStack.isEmpty()).toBe(true);
        expect(mappedStack).not.toBe(stack);
    });
})