// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import GcodePreview from '../../GCodePreview.vue'

import './custom.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('GCodePreview', GcodePreview)
  }
}