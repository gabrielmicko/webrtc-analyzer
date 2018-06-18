!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.WebRTCAnalyzer=t():e.WebRTCAnalyzer=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=class{constructor(e){if(this.options=r({},{selector:"body",peerConnection:null,interval:3e3,isVisible:!0},e),this.element=document.querySelector(this.options.selector),null===this.element)throw new Error("[Analyzer]: Not able to render to the element.");if(this.options.peerConnection instanceof RTCPeerConnection==0)throw new Error("[Analyzer]: peerConnection must be an instance of RTCPeerConnection.");if("number"!=typeof this.options.interval)throw new Error("[Analyzer]: interval has to be a number.");if(0==(!0===this.options.isVisible||!1===this.options.isVisible))throw new Error("[Analyzer]: isVisible has to be a boolean (true or false).");this.handleKeyDown=this.handleKeyDown.bind(this),this.wasCTRL=!1,this.isVisible=this.options.isVisible,this.setup()}setup(){this.interval=setInterval(()=>{this.options.peerConnection.getStats().then(e=>{this.render(e)})},this.options.interval),this.setKeyHandler()}generateFromPCState(e,t){return`<tr><td>${e}</td><td>${this.options.peerConnection[t]}</td></tr>`}generateHeader(e){return`<header>${e}</header>`}clearStage(){this.element.innerHTML=""}renderToStage(e){this.element.innerHTML=e}generateFromObject(e){let t="";return Object.keys(e).forEach(n=>{t+=`<tr><td>${n}</td><td>${e[n]}</td></tr>`}),t}generateIsVisibleClass(){return!1===this.isVisible?" hidden":""}render(e){let t=document.querySelector(this.options.selector+" .webrtc-analyzer main"),n=0;null!==t&&(n=t.scrollTop),this.clearStage();let r=`<div class="webrtc-analyzer${this.generateIsVisibleClass()}"><div class="box"><main>`,o=1;e.forEach(e=>{"track"===e.type&&(r+=this.generateHeader("Track "+o),r+="<table>",r+=this.generateFromObject(e),r+="</table>",o++)}),r+=this.generateHeader("PeerConnection states"),r+="<table>",r+=this.generateFromPCState("Signaling state","signalingState"),r+=this.generateFromPCState("ICE gathering state","iceGatheringState"),r+=this.generateFromPCState("ICE Connection state","iceConnectionState"),r+=this.generateFromPCState("Connection state","connectionState"),r+="</table>",r+='<style>\n        .webrtc-analyzer {\n            position: fixed;\n            width: 0px;\n            height: 0px;\n            top: 0px;\n            left: 0px;\n            z-index: 99999999;\n            font-family: monaco, Consolas, "Lucida Console", monospace;\n            font-size: 12px;\n        }\n        .webrtc-analyzer.hidden .box {\n            left: 100%;\n        }\n        .webrtc-analyzer .box {\n            position: fixed;\n            z-index: 1;\n            box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;\n            background: white;\n            left: 70%;\n            top: 0px;\n            width: 30%;\n            height: 100%;\n            transition: left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out;\n        }\n        .webrtc-analyzer main {\n            width: 100%;\n            height: 100%;\n            overflow: auto;\n            background-color: #1e1f22;\n        }\n\n        .webrtc-analyzer table {\n            width: 100%;\n            table-layout: fixed;\n            border-collapse:collapse;\n        }\n\n        .webrtc-analyzer tr:nth-child(2n) {\n            background-color:#282a2d; \n            color: rgb(224, 224, 224);\n        }\n        \n        .webrtc-analyzer td {\n            padding: 3px 10px;\n        }\n        \n        .webrtc-analyzer tr:nth-child(2n+1){\n            color: rgb(129, 162, 190)\n        }\n        \n        .webrtc-analyzer tr td:nth-child(2) {\n            color: rgb(181, 189, 104);\n        }\n\n        .webrtc-analyzer header {\n            color: #fff;\n            font-size: 14px;\n            padding: 10px 20px;\n            background-color: #383b40;\n            margin-bottom: 6px;\n        }\n    </style>',r+="</main></div></div>",this.renderToStage(r),document.querySelector(this.options.selector+" .webrtc-analyzer main").scrollTop=n}setKeyHandler(){document.addEventListener("keydown",this.handleKeyDown)}toggleVisibility(){this.isVisible?document.querySelector(this.options.selector+" .webrtc-analyzer").classList.add("hidden"):document.querySelector(this.options.selector+" .webrtc-analyzer").classList.remove("hidden"),this.isVisible=!this.isVisible}handleKeyDown(e){this.wasCTRL&&72===e.keyCode&&this.toggleVisibility(),17===e.keyCode?this.wasCTRL=!0:this.wasCTRL=!1}destroy(){document.removeEventListener(this.handleKeyDown),clearInterval(this.interval)}}}])});