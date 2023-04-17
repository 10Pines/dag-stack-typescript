import {assertType, denyType, Equal} from "./typeEquality";

describe('type equality', () => {
    test('literal types are only equal to themselves', () => {
        assertType<Equal<1, 1>>();
        denyType<Equal<1, 2>>();
    });

    test('any is only equal to itself', () => {
        denyType<Equal<any, number>>();
        denyType<Equal<number, any>>();
        assertType<Equal<any, any>>();
    });

    test('never is only equal to itself', () => {
        assertType<Equal<never, never>>();
        denyType<Equal<any, never>>();
        denyType<Equal<never, any>>();
    });

    test('unknown is only equal to itself', () => {
        assertType<Equal<unknown, unknown>>();
        denyType<Equal<unknown, any>>();
        denyType<Equal<unknown, never>>();
    });

    test('two object types are equal if the types of their properties are equal', () => {
        assertType<Equal<{ m1: string }, { m1: string }>>();
        denyType<Equal<{ m1: string }, { m1: number }>>();
        denyType<Equal<{ m1: number }, { m1: string }>>();
    });

    test('a type is not equal to a subtype', () => {
        denyType<Equal<1, number>>();
    });

    test('Array<X> equals Array<Y> iff X equals Y', () => {
        assertType<Equal<Array<string>, Array<string>>>();
        denyType<Equal<Array<string>, Array<number>>>();
        denyType<Equal<Array<any>, Array<unknown>>>();
        denyType<Equal<Array<any>, Array<string>>>();
        denyType<Equal<Array<string>, Array<any>>>();
    });

    test('a union type is not equal to one of its components', () => {
        denyType<Equal<number | string, number>>();
    });

    test('an intersection of two types that do not have objects in common is equal to never', () => {
        assertType<Equal<number & string, never>>();
    });

    test('two function types are equal if renaming a type parameter makes them equal', () => {
        assertType<Equal<<T>() => T, <S>() => S>>();
    });

    test('types are reduced before testing for equality', () => {
        type Head<T> = T extends [infer H, ...any] ? H : never;
        assertType<Equal<1, Head<[1,2,3]>>>()
    });

    test.skip('an intersection type is equal to a type that "contains" both of them', () => {
        assertType<
            // @ts-ignore
            Equal<
                { m1: string } & { m2: number },
                { m1: string, m2: number }
            >
        >()
    });
});
