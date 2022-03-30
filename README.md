# SetDynamicInterval
The JS setInterval function with dynamic intervals

    import { setDynamicInterval } from "set-dynamic-interval";
    async function asyncFunc() {
        ...
    }

    function syncFunc() {
        ...
    }

    async function asyncGetInterval() {
        ...
    }

    function syncGetInterval() {
        ...
    }

    const handler1 = setDynamicInterval(asyncFunc, asyncGetInterval);
    handler.stop();

    const handler2 = setDynamicInterval(asyncFunc, getInterval);
    handler2.stop();

    const handler3 = setDynamicInterval(syncFunc, asyncGetInterval);
    handler3.stop();

    const handler4 = setDynamicInterval(syncFunc, getInterval);
    handler4.stop();
