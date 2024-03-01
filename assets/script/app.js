'use strict';

const operatingSystemName = document.querySelector('.operating-system');
const browserName = document.querySelector('.browser');
const language = document.querySelector('.language');
const pageWidth = document.querySelector('.window-width');
const pageHeight = document.querySelector('.window-height');
const pageOrientation = document.querySelector('.window-orientation');
const batteryLevel = document.querySelector('.battery-level');
const batteryStatus = document.querySelector('.battery-status');
const networkStatus = document.querySelector('.network-status');

function getOperatingSystem(userAgent) {
    let operatingSystem = 
    userAgent.includes('Windows') ? 'Windows' :
    userAgent.includes('Macintosh') || userAgent.includes('Mac OS') ? 'Mac/iOS' :
    userAgent.includes('Linux') ? 'Linux' :
    'Unknown';

    operatingSystemName.innerText = `OS: ${operatingSystem}`;
    return operatingSystem;
}

function getBrowser(userAgent) {
    let browser =
    userAgent.includes('Firefox') ? 'Mozilla Firefox' :
    userAgent.includes('Opera') || userAgent.includes('OPR') ? 'Opera' :
    userAgent.includes('Edge') || userAgent.includes('Edg') ? 'Microsoft Edge' :
    userAgent.includes('Chrome') ? 'Google Chrome' :
    'Unknown';

    browserName.innerText = `Browser: ${browser}`;
    return browser;
}

function getUserLanguage() {
    language.innerText = `Language: ${navigator.language}`;
}

function readWindow() {
    pageWidth.innerText = `Width: ${window.innerWidth}px`;
    pageHeight.innerText = `Height: ${window.innerHeight}px`;
    let isLandscape = window.innerWidth > window.innerHeight
    pageOrientation.innerText = isLandscape ? 'Orientation: Landscape' : 
    'Orientation: Portrait';
}

if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
        // Study more on promises
        function batteryLevelInfo() {
            let level = battery.level * 100;

            batteryLevel.innerText = `Level: ${level}%`;
        }

        function batteryChargeInfo() {
            let status = '';
            if (battery.charging) {
                status = 'charging';
            }   else if (!battery.charging) {
                status = 'idle';
            }   else {
                status = 'not available';
            }
    
            batteryStatus.innerText = `Status: ${status}`;
        }
    
        batteryLevelInfo();
        batteryChargeInfo();
        battery.addEventListener('levelchange', batteryLevelInfo);
        battery.addEventListener('chargingchange', batteryChargeInfo);
    });
}   else {
    batteryLevel.innerText = 'Level: not available';
    batteryStatus.innerText = 'Status: not available';
}

function getNetworkStatus() {
    networkStatus.innerText = navigator.onLine ? 'online' : 'offline';

    if (!navigator.onLine) {
        networkStatus.classList.remove('network-status-online');
        networkStatus.classList.add('network-status-offline');
    }   else {
        networkStatus.classList.remove('network-status-offline');
        networkStatus.classList.add('network-status-online');
    }
}

function getOperatingSystemListener() {
    getOperatingSystem(navigator.userAgent);
}

function getBrowserListener() {
    getBrowser(navigator.userAgent);
}

window.addEventListener('load', getOperatingSystemListener);
window.addEventListener('load', getBrowserListener);
window.addEventListener('load', getUserLanguage);
window.addEventListener('load', readWindow);
window.addEventListener('resize', readWindow);
window.addEventListener('load', getNetworkStatus);
window.addEventListener('online', getNetworkStatus);
window.addEventListener('offline', getNetworkStatus);