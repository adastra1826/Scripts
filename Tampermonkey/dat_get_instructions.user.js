// ==UserScript==
// @name         DaT Get Instructions
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      1.0.4
// @description  Pull data from page and send to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @match        *://*/*
// @connect      127.0.0.1
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_get_instructions.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_get_instructions.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Beginning script.');

    const url = 'https://127.0.0.1:4000/dat';

    const query = '#task-response\\/WorkerTaskResponseView-hybrid-root > div.tw-pointer-events-auto > div > div > div > div.tw-sticky.tw-top-px.tw-h-screen > div > div:nth-child(1) > div > div > div.tw-sticky.tw--top-2.tw--mx-5.tw--mt-2.tw-mb-2.tw-rounded-lg.tw-bg-\\[\\#F4F4F4\\] > div';

    const instructionsDOMElement = document.querySelector(query);
    const instructionsText = instructionsDOMElement.textContent;
    console.log('Text: ', instructionsText);

    const payload = JSON.stringify({ text: instructionsText });
    console.log('JSON: ', payload);

    // — fetch() version —
    fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    payload,
    })
        .then(response => {
        console.log('fetch status:', response.status);
        return response.text();
    })
        .then(body => {
        console.log('fetch body:', body);
    })
        .catch(err => {
        console.error('fetch error:', err);
    });


    console.log('Ending script.');
})();