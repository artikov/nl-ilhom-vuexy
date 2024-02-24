export default {
  meEndpoint: 'https://stockapi.nextlevelgroup.uz/api/v1/auth/verify/',
  loginEndpoint: 'https://stockapi.nextlevelgroup.uz/api/v1/auth/login/',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'access',
  onTokenExpiration: 'refresh' // logout | refreshToken
}
