const {
    override,
    addWebpackAlias
} = require('customize-cra');

const path = require("path");
 
 module.exports = override(
    addWebpackAlias({
        '@entrypoint': path.resolve(__dirname, '../src/entrypoint/'),
        '@web': path.resolve(__dirname, '../src/entrypoint/presenters/web/'),
        '@components': path.resolve(__dirname, '../src/entrypoint/presenters/web/components/'),
        '@constants': path.resolve(__dirname, '../src/entrypoint/presenters/web/constants/'),
        '@redux': path.resolve(__dirname, '../src/entrypoint/presenters/web/redux/'),
        '@store': path.resolve(__dirname, '../src/entrypoint/presenters/web/store/'),
    }),
);
