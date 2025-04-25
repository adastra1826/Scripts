// ==UserScript==
// @name         Localhost Test
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      2025-04-24
// @description  Test the ability to connect to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM.xmlHttpRequest
// @require
// @include      *
// @match        *
// @exclude      *
// @connect      localhost
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Beginning script.')

    const url = 'localhost:4000';
    const data = 'data';

    const r = await GM.xmlHttpRequest({
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
        onload: function(response) {
            console.log('Response: ', response.responseText);
        }
    });

    console.log('Ending script.');
})();