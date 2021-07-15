import Commerce from '@chec/commerce.js';
// const key='pk_30203d92d0c0afa7765cf38f08dfbbd1a02c8ed2233dc';
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);