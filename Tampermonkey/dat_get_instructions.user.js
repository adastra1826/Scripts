// ==UserScript==
// @name         DaT Get Instructions
// @author       Nicholas Doherty
// @namespace    http://tampermonkey.net/
// @copyright    CC0
// @version      1.0.11
// @description  Pull data from page and send to localhost. https://www.tampermonkey.net/documentation.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @match        *://*/*
// @connect      127.0.0.1
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_get_instructions.user.js
// @updateURL    https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/dat_get_instructions.user.js
// ==/UserScript==

(function () {
  "use strict";

  console.log("Beginning script.");

  const url = "https://127.0.0.1:4000/dat";

  let codeText = "";
  let workerCodeText = "";
  try {
    const modelResponseSelectorPath =
      "#question-5 > div > div.tw-pt-3 > div > div.surge-wysiwyg.tw-whitespace-pre-wrap.tw-rounded-input.tw-border.tw-bg-white-100.tw-p-3 > div > pre > code";

    // Get the model code
    const modelCodeDOMElement = document.querySelector(
      modelResponseSelectorPath
    );
    if (modelCodeDOMElement) {
      codeText = modelCodeDOMElement.innerText;
      console.log("Found model code.");

      const modelResponsePayload = JSON.stringify({
        type: "model_response",
        length: codeText.length,
        text: codeText,
      });

      console.log("Payload size:", modelResponsePayload.length);

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: modelResponsePayload,
      })
        .then((response) => {
          console.log("fetch status:", response.status);
          return response.text();
        })
        .then((body) => {
          console.log("fetch body:", body);
        })
        .catch((err) => {
          console.error("fetch error:", err);
        });
    } else {
      console.error("No instructions found.");
    }

    // Get the final code
    const workerCodeSelectorPath =
      "#question-11 > div > div.tw-pt-3 > div > div.cm-theme > div > div.cm-scroller > div.cm-content";
    const workerCodeDOMElement = document.querySelector(workerCodeSelectorPath);
    if (workerCodeDOMElement) {
      workerCodeText = workerCodeDOMElement.innerText;
      console.log("Found worker code.");

      const workerCodePayload = JSON.stringify({
        type: "worker_code",
        length: workerCodeText.length,
        text: workerCodeText,
      });

      console.log("Payload size:", workerCodePayload.length);

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: workerCodePayload,
      })
        .then((response) => {
          console.log("fetch status:", response.status);
        })
        .then((body) => {
          console.log("fetch body:", body);
        })
        .catch((err) => {
          console.error("fetch error:", err);
        });
    }

    // Get final edited response
    const finalEditedResponseSelectorPath =
      "#question-15 > div > div.tw-pt-3 > div > div.surge-wysiwyg.tw-whitespace-pre-wrap.tw-rounded-input.tw-border.tw-bg-white-100.tw-p-3 > div > pre > code";
    const finalEditedResponseDOMElement = document.querySelector(
      finalEditedResponseSelectorPath
    );
    if (finalEditedResponseDOMElement) {
      finalEditedResponseText = finalEditedResponseDOMElement.innerText;
      console.log("Found final edited response.");

      const finalEditedResponsePayload = JSON.stringify({
        type: "final_edited_response",
        length: finalEditedResponseText.length,
        text: finalEditedResponseText,
      });

      console.log("Payload size:", finalEditedResponsePayload.length);

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: finalEditedResponsePayload,
      })
        .then((response) => {
          console.log("fetch status:", response.status);
        })
        .then((body) => {
          console.log("fetch body:", body);
        })
        .catch((err) => {
          console.error("fetch error:", err);
        });
    }
  } catch (error) {
    console.error("Error: ", error);
  }

  console.log("Ending script.");
})();
