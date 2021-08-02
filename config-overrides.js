const {
    override,
    addWebpackAlias
 } = require('customize-cra');
 
 const path = require("path");
 
 module.exports = override(
    addWebpackAlias({
        '@domain': path.resolve(__dirname, './src/domain/'),
        '@application': path.resolve(__dirname, './src/application/'),
        '@entrypoint': path.resolve(__dirname, './src/entrypoint/'),
        '@infraestructure': path.resolve(__dirname, './src/infraestructure/'),
        '@configuration': path.resolve(__dirname, './src/configuration/'),
        '@constants': path.resolve(__dirname, './src/constants/'),
        '@container-inversify': path.resolve(__dirname, './src/inversify.config.ts'),
        // '@assets': path.resolve(__dirname, './src/assets/')
    }),
);
