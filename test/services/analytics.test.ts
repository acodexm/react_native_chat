import analyticsService from '@services/analytics';
import { mock_logLogin } from '../support/mocks/@react-native-firebase/analytics';

describe('Analytics service', () => {
  it('no errors', () => {
    expect(analyticsService).toBeTruthy();
  });
  it('should log ', async () => {
    await analyticsService.logLogin('google');
    expect(mock_logLogin).toBeCalledWith({ method: 'google' });
  });
});
