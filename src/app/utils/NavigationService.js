import * as React from 'react';
export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();
export function navigateTo(name, params) {
  if (isReadyRef.current && navigationRef.current.getRootState() != undefined) {
    navigationRef.current.navigate(name, params);
  } else if (navigationRef.current.getRootState() == undefined) {
    setTimeout(() => {
      navigationRef.current.navigate(name, params);
    }, 4000);
  } else {
    console.log('Navigation Failed!');
  }
}
