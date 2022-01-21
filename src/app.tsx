import { createLogger } from 'redux-logger';


export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      console.log(e.message);
    },
  },
  // plugins: [
  //   require('dva-logger')(),
  // ],
};
