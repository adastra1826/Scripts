// ==UserScript==
// @name         DaT Get Instructions
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      1.0.7
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

    let codeText = '';
    try {
        const modelResponseSelectorPath = '#question-5 > div > div.tw-pt-3 > div > div.surge-wysiwyg.tw-whitespace-pre-wrap.tw-rounded-input.tw-border.tw-bg-white-100.tw-p-3 > div > pre > code';

        const modelCodeDOMElement = document.querySelector(modelResponseSelectorPath);
        if (modelCodeDOMElement) {
            codeText = modelCodeDOMElement.innerText;
            console.log('Found code.');

            const payload = JSON.stringify({ 
                type: 'model_response',
                text: codeText 
            });
        
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
        } else {
            console.error('No instructions found.');
        }
    } catch (error) {
        console.error('Error: ', error);
    }


    console.log('Ending script.');
})();