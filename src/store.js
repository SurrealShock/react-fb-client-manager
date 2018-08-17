import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyC6537HMpxP2Rv3p4Bb1elo9SPhjBgJxyQ',
  authDomain: 'react-client-manager-cf5c6.firebaseapp.com',
  databaseURL: 'https://react-client-manager-cf5c6.firebaseio.com',
  projectId: 'react-client-manager-cf5c6',
  storageBucket: 'react-client-manager-cf5c6.appspot.com',
  messagingSenderId: '426242235592'
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  notify: notifyReducer
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
