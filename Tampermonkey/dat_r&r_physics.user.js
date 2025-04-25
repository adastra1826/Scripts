// ==UserScript==
// @name         DaT R&R Physics
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      1.0.0
// @description  Test the ability to connect to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @match        *://*/*
// @connect      127.0.0.1
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_r&r_physics.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_r&r_physics.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Beginning script.')

    const url = 'https://127.0.0.1:4000/dat';
    const data = JSON.stringify({ test: 'ok' });

    // — fetch() version —
    fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    data,
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