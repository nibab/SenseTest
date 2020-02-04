import ZeplinAuth, { ZeplinCredentials } from '../ZeplinAuth'

test('If credentials cant be retrieved from the backend - getCredentials() will reject.', () => {
  ZeplinAuth.getCredentialsFromBackend = (): Promise<ZeplinCredentials> => {
    return new Promise((resolve, reject) => {
      reject("This is not meant to happen.")
    })
  }
  ZeplinAuth.configure('1')
  ZeplinAuth.getCredentials().catch((error) => {
    expect(error).toBe("This is not meant to happen.")
  })
});

test('If credentials cant be refreshed - getCredentials() will reject.', () => {
  const zeplinCredentials: ZeplinCredentials = {
    accessToken: 'bla',
    refreshToken: 'bla',
    accessTokenExpiresAt: 1,
    refreshTokenExpiresAt: 1
  }
  ZeplinAuth.getCredentialsFromBackend = (): Promise<ZeplinCredentials> => {
    return new Promise((resolve, reject) => {
      resolve(zeplinCredentials)
    })
  }
  ZeplinAuth.configure('1')
  ZeplinAuth.refreshCredentials = (): Promise<ZeplinCredentials> => {
    return new Promise((resolve, reject) => {
      reject("Refresh failed.")
    })
  }
  return expect (ZeplinAuth.getCredentials()).rejects.toBe("Refresh failed.")
});

test('If credentials are refreshed - getCredentials() will return refreshed credentials.', () => {
  const zeplinCredentials: ZeplinCredentials = {
    accessToken: 'bla',
    refreshToken: 'bla',
    accessTokenExpiresAt: 1,
    refreshTokenExpiresAt: 1
  }
  ZeplinAuth.getCredentialsFromBackend = (): Promise<ZeplinCredentials> => {
    return new Promise((resolve, reject) => {
      resolve(zeplinCredentials)
    })
  }
  ZeplinAuth.configure('1')
  ZeplinAuth.refreshCredentials = (): Promise<ZeplinCredentials> => {
    return new Promise((resolve, reject) => {
      resolve({
        ...zeplinCredentials,
        accessToken: 'new'
      })
    })
  }
  return expect(ZeplinAuth.getCredentials()).resolves.toStrictEqual({
    ...zeplinCredentials,
    accessToken: 'new'
  })
});