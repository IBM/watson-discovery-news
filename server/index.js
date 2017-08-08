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

require('isomorphic-fetch');
const queryString = require('query-string');
const queryBuilder = require('./query-builder');
const discovery = require('./watson-discovery-service');
const RSS = require('rss');
const utils = require('../src/shared/utils');
const { parseData, topicStory } = utils;

/*eslint no-unused-vars: ["error", {"argsIgnorePattern": "response"}]*/
const WatsonNewsServer = new Promise((resolve, reject) => {
  // getInvironments as sanity check to ensure creds are valid
  discovery.getEnvironments({})
    .then(response => {
      // environment and collection ids are always the same for Watson News
      const environmentId = discovery.environmentId;
      const collectionId = discovery.collectionId;
      queryBuilder.setEnvironmentId(environmentId);
      queryBuilder.setCollectionId(collectionId);
      resolve(createServer());
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
      reject(error);
    });
});

function createServer() {
  const server = require('./express');

  server.get('/trending/api/trending/*', (req, res, next) => {
    const category = req.params[0];

    discovery.query(queryBuilder.trending({
      filter: category ? `enriched_text.categories.label:"${category}"` : ''
    }))
    .then(response => res.json(response))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);

      switch (error.message) {
      case 'Number of free queries per month exceeded':
        return res.status(429).json(error);
      default:
        next(error);
      }
    });
  });

  server.get('/trending/feed/*', (req, res, next) => {
    const category = req.params[0];
    const fullUrl = req.protocol + '://' + req.get('host');

    fetch(fullUrl + `/trending/api/trending/${category ? category : ''}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(json => {
      const { topics } = parseData(json);
      const feed = new RSS({
        title: `Trending Topics in News${category ? ' for ' + category.toUpperCase() : ''}`,
        description: 'RSS feed for Trending Topics found using Watson Discovery Service'
      });

      topics.forEach(item => {
        const story = topicStory(item);
        let categories = [];
        if (story.enriched_title.categories) {
          categories = story.enriched_title.categories
            .reduce((result, categories) =>
              result.concat(categories.label.split('/').slice(1)), []);
        }
        feed.item({
          guid: story.id,
          title: item.key,
          url: story.url,
          description: story.title,
          author: story.author,
          categories
        });
      });

      res.set('Content-Type', 'text/xml').send(feed.xml());
    })
    .catch(response => {
      if (response && response.status === 429) {
        res.status(429).json({ error: 'Number of free queries per month exceeded' });
      } else {
        next(response);
      }
    });
  });

  server.get('/trending/*', function(req, res) {
    const category = req.params[0];
    const props = category ? { category } : {};

    res.render('trending/index', props);
  });

  server.get('/trending', function(req, res) {
    const category = req.params[0];
    const props = category ? { category } : {};

    res.render('trending/index', props);
  });

  server.get('/search/api/search', (req, res) => {
    const { query } = req.query;

    discovery.query(queryBuilder.search({ natural_language_query: query }))
      .then(response => res.json(response))
      .catch(error => {
        if (error.message === 'Number of free queries per month exceeded') {
          res.status(429).json(error);
        } else {
          res.status(error.code).json(error);
        }
      });
  });

  server.get('/search/:searchQuery', function(req, res){
    const searchQuery = req.params.searchQuery.replace(/\+/g, ' ');
    const qs = queryString.stringify({ query: searchQuery });
    const fullUrl = req.protocol + '://' + req.get('host');

    fetch(fullUrl + `/search/api/search?${qs}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(json => {
        res.render('search/index', { data: json, searchQuery, error: null });
      })
      .catch(response => {
        res.status(response.status).render('search/index', {
          error: (response.status === 429) ? 'Number of free queries per month exceeded' : 'Error fetching data'
        });
      });
  });

  server.get('/search/*', function(req, res) {
    const category = req.params[0];
    const props = category ? { category } : {};

    res.render('search/index', props);
  });

  server.get('/search', function(req, res) {
    const category = req.params[0];
    const props = category ? { category } : {};

    res.render('search/index', props);
  });

  server.get('/*', function(req, res) {
    const category = req.params[0];
    const props = category ? { category } : {};

    res.render('home', props);
  });

  return server;
}

module.exports = WatsonNewsServer;