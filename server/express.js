/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const path = require('path');
const express = require('express');
const expressBrowserify = require('express-browserify');

const app = express();

app.set('views', path.join(__dirname, '..', 'src'));
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());

// Middlewares
app.use('/css', express.static(path.resolve(__dirname, '..', 'public/css')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'public/images')));
app.use(express.static(path.join(__dirname, '..', 'node_modules/watson-react-components/dist')));

const isDev = (app.get('env') === 'development');
const trendingBrowserifyier = expressBrowserify(path.resolve(__dirname, '..', 'public/js/trending/bundle.js'), {
  watch: isDev,
  debug: isDev,
  extension: ['js'],
  transform: ['babelify'],
});
const searchBrowserifyier = expressBrowserify(path.resolve(__dirname, '..', 'public/js/search/bundle.js'), {
  watch: isDev,
  debug: isDev,
  extension: ['js'],
  transform: ['babelify'],
});

if (!isDev) {
  trendingBrowserifyier.browserify.transform('uglifyify', { global: true });
  searchBrowserifyier.browserify.transform('uglifyify', { global: true });
}

// Client Side Bundle route
app.get('/js/trending/bundle.js', trendingBrowserifyier);
app.get('/js/search/bundle.js', searchBrowserifyier);

module.exports = app;
