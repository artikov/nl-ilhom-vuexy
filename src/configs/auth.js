export default {
  meEndpoint: 'https://stockapi.nextlevelgroup.uz/api/v1/auth/verify/',
  loginEndpoint: 'https://stockapi.nextlevelgroup.uz/api/v1/auth/login/',
  refreshEndpoint: 'https://stockapi.nextlevelgroup.uz/api/v1/auth/refresh/',
  storageTokenKeyName: 'access',
  storageRefreshTokenKeyName: 'refresh',
  onTokenExpiration: 'refresh' // logout | refreshToken
}

// registerEndpoint: '/jwt/register',
