import { importModule } from '@uupaa/dynamic-import-polyfill';

if (!window.import) {
    window.import = importModule
}
