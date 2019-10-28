import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedRedicer = persistReducer(
    {
      key: 'meetupjl',
      storage,
      whitelist: ['auth', 'user', 'meetup'],
    },
    reducers
  );
  return persistedRedicer;
};
