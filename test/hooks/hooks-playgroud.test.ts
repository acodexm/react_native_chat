import { act, renderHook } from '@testing-library/react-hooks';
import useConstant from 'use-constant';
import AppStore from '@store/app';

test('should change the state correctly', () => {
  const { result } = renderHook(() => useConstant(AppStore.getInstance));
  const { firstLaunchDone, firstLaunch, initializeApp } = result.current;
  let firstLaunchValue: boolean | undefined;
  expect(firstLaunchDone).toBeTruthy();
  expect(firstLaunch).toBeTruthy();
  expect(initializeApp).toBeTruthy();
  result.current.firstLaunch().subscribe((value) => (firstLaunchValue = value));
  expect(firstLaunchValue).toBe(true);
  act(() => {
    result.current.firstLaunchDone();
  });
  expect(firstLaunchValue).toBe(false);
});
