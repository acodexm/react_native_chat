import remoteConfigService from '@services/remote-config';

describe('RemoteConfig service', () => {
  it('no errors', () => {
    expect(remoteConfigService).toBeTruthy();
  });
});
