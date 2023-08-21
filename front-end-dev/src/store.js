import { configureStore } from 'redux';
import rootReducer from './reducers'; // 여기서 rootReducer는 여러 개의 리듀서를 하나로 결합한 것입니다.

const store = configureStore(rootReducer);

export default store;