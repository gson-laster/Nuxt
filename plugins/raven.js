import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
	.config( 'https://c47dd17a0db342cbb72d68cb2c9b9e8a@sentry.io/616068' )
	.addPlugin( RavenVue, Vue )
	.install();
