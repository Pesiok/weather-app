'use strict';

const generateCallbackName = () => {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

const addScriptTag = (url, callback, callbackName) => {
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute("src", `${url}${callbackName}=${callback}`);
    scriptTag.id = `${callbackName}_${callback}`;

    document.getElementsByTagName('head')[0].appendChild(scriptTag);
}

const removeScriptTag = id => {
    const scriptTag = document.getElementById(id);
    document.getElementsByTagName('head')[0].removeChild(scriptTag);
}

const jsonp = (_url, options = {}) => {
    const callbackName = options.callbackName || "callback";
    const timeout = options.timeout || 5000;

    let url = _url,
    timeoutId;

    return new Promise((resolve, reject) => {
        const callback = generateCallbackName(),
        scriptId = `${callbackName}_${callback}`;

        url += (url.indexOf('?') === -1) ? '?' : '&';
        addScriptTag(url, callback, callbackName);

        window[callback] = response => {
            resolve({
                ok: true,
                json: () => Promise.resolve(response)
            });

            if (timeoutId) clearTimeout(timeoutId);

            removeScriptTag(scriptId);
            delete window[callback];
        }

        timeoutId = setTimeout(() => {
            reject(new Error('Request timed out'));

             removeScriptTag(scriptId);
             delete window[callback];

        }, timeout);
    });
}

export default jsonp;


