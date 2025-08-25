import {test as base} from '@playwright/test';

let Counter = 0;

const test = base.extend<{
    counterFixture: any;
}>({
    counterFixture: [async ({}, use) => {
        await use(++Counter);
    },{scope: 'test'}]
});

test('Test 1', async ({ counterFixture }) => {
    console.log('Counter value in Test 1:', counterFixture);
});

test('Test 2', async ({ counterFixture }) => {
    console.log('Counter value in Test 2:', counterFixture);
});