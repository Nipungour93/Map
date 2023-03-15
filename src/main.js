/**
 * @format
 * App Main
 */

import * as React from 'react';
import {LogBox} from 'react-native';

import {Map} from './modules/map';
LogBox.ignoreLogs(['Warning: ...']);

function MainApp() {
  return <Map />;
}

export {MainApp};
