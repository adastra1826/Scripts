// ==UserScript==
// @name         Localhost Test
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      2025-04-24.1
// @description  Test the ability to connect to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_xmlhttpRequest
// @include      *
// @connect      localhost
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/localhost_test.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log('Beginning script.')

    const url = 'http://localhost:4000';
    const data = 'data';

    GM_xmlhttpRequest({
        method: 'POST',
        url,
        data,
        onreadystatechange(res) {
          console.log('readyState', res.readyState, 'status', res.status);
        },
        onload(res) {
          console.log('loaded:', res.responseText);
        },
        onerror(err) {
          console.error('error:', err);
        }
      });
      

    GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        data: data,
        headers: {
            'Content-Type': 'application/json'
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