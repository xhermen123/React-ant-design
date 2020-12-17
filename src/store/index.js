import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import sagas from '../redux/sagas';
import reducers from '../redux/reducers';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger),
  );
  sagaMiddleware.run(sagas);

  return store;
}