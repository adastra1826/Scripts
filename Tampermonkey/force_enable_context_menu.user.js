// ==UserScript==
// @name         Force Enable Context Menu (right click)
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      2025-04-24
// @description  https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @include      *
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/force_enable_context_menu.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/force_enable_context_menu.user.js
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // Remove inline oncontextmenu attributes
        document.querySelectorAll('*').forEach(el => {
            if (el.oncontextmenu !== null) el.oncontextmenu = null;
        });
    
        // Remove event listeners by cloning and replacing nodes (brute-force)
        const bodyClone = document.body.cloneNode(true);
        document.body.parentNode.replaceChild(bodyClone, document.body);
    
        // Add a listener that stops other contextmenu handlers
        window.addEventListener('contextmenu', e => {
            e.stopPropagation();
        }, true);
    });
    
})();