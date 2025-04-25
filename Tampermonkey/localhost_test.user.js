// ==UserScript==
// @name         Localhost Test
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      2025-04-24.1
// @description  Test the ability to connect to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @match        *://*/*
// @connect      localhost
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Beginning script.')

    const url = 'http://localhost:4000';
    const data = JSON.stringify({ test: 'ok' });
    
    console.log('GM_');

    GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
        onreadystatechange(response) {
            console.log('readyState', response.readyState, 'status', response.status);
        },
        onload: function(response) {
            console.log('Response: ', response.responseText);
        },
        onerror: function(error) {
            console.log('Error: ', error)
        }
    });

    console.log('GM.');

    GM.xmlHttpRequest({
        method: 'POST',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
        onreadystatechange(response) {
            console.log('readyState', response.readyState, 'status', response.status);
        },
        onload: function(response) {
            console.log('Response: ', response.responseText);
        },
        onerror: function(error) {
            console.log('Error: ', error)
        }
    });

    console.log('Ending script.');
})();