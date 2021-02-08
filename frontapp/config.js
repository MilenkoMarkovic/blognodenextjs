import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

console.log(publicRuntimeConfig);
export const API = publicRuntimeConfig.PRODUCTION
    ? 'https://cryptoblog.com'
    : 'http://localhost:5000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;