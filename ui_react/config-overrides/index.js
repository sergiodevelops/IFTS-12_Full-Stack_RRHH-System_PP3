const {
    override,
    addWebpackAlias
} = require('customize-cra');

const path = require("path");
 
 module.exports = override(
    addWebpackAlias({
        '@domain': path.resolve(__dirname, '../src/domain/'),
        '@application': path.resolve(__dirname, '../src/application/'),
        '@configuration': path.resolve(__dirname, '../src/configuration/'),
        '@infraestructure': path.resolve(__dirname, '../src/infraestructure/'),

        '@container-inversify': path.resolve(__dirname, '../src/inversify.config.ts'),
        '@constants': path.resolve(__dirname, '../src/constants/'),

        '@entrypoint': path.resolve(__dirname, '../src/entrypoint/'),
        '@web': path.resolve(__dirname, '../src/entrypoint/presenters/web/'),
        '@components': path.resolve(__dirname, '../src/entrypoint/presenters/web/components/'),
        '@redux': path.resolve(__dirname, '../src/entrypoint/presenters/web/redux/'),
        '@store': path.resolve(__dirname, '../src/entrypoint/presenters/web/store/'),
        '@assets': path.resolve(__dirname, '../src/entrypoint/presenters/web/assets')
    }),
);
