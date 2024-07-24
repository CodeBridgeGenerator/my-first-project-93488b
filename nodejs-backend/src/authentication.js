const {
    AuthenticationService,
    JWTStrategy
} = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
// const { OAuthStrategy } = require('@feathersjs/authentication-oauth');

// class GoogleStrategy extends OAuthStrategy {
//   async getEntityData(profile) {
//     // this will set 'googleId'
//     const baseData = await super.getEntityData(profile);

//     // this will grab the picture and email address of the Google profile
//     return {
//       ...baseData,
//       profilePicture: profile.picture,
//       email: profile.email,
//     };
//   }
// }

module.exports = (app) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('local', new LocalStrategy());
    //authentication.register('google', new GoogleStrategy());
    app.use('/authentication', authentication);
    app.configure(expressOauth());
};
