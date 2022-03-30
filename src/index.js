setDynamicInterval = (func, intervalFunc) => {
    let toBeStopped = false;
    let currentTimer = null;

    const isAsyncFunc = (func) => {
        return typeof func === "function" && func.constructor.name === "AsyncFunction";
    }

    const run = async () => {
        const startMS = Date.now();
        let interval = 0;

        // get interval
        if (!toBeStopped) {
            if (typeof intervalFunc === "function") {
                if (isAsyncFunc(intervalFunc)) {
                    interval = await intervalFunc();
                } else {
                    interval = intervalFunc();
                }
            } else if (typeof intervalFunc === "number") {
                interval = intervalFunc;
            }
        }

        // invoke the function
        if (!toBeStopped) {
            if (isAsyncFunc(intervalFunc)) {
                await func();
            } else {
                func();
            }
        }

        // schedule the next call
        if (!toBeStopped) {
            const elapsedMS = Date.now() - startMS;

            interval -= elapsedMS;
            if (interval < 0)
                interval = 0;

            currentTimer = setTimeout(run, interval);
        }
    };

    run();

    const handler = {
        stop: () => {
            toBeStopped = true;
            if (currentTimer) {
                clearTimeout(currentTimer);
                currentTimer = null;
            }
        }
    };

    return handler;
};

export {
    setDynamicInterval
}
