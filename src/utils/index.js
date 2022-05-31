import {ignore} from 'mobx-sync';

export const ignorePersistProperties = (context, keys) => {
  keys.forEach(key => ignore(context, key));
};
