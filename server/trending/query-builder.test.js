import queryBuilder from './query-builder';
import moment from 'moment';

beforeEach(() => {
  queryBuilder.setCollectionId('collection');
  queryBuilder.setEnvironmentId('environment');
});

describe('Query builder returns params for discovery service', () => {
  test('when opts are NOT passed', () => {
    expect(queryBuilder.build()).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      return: 'enrichedTitle.entities.text',
      filter: `blekko.chrondate>${moment().subtract(24,'h').unix()},blekko.hostrank>300`
    });
  });

  test('when opts are passed', () => {
    expect(queryBuilder.build({
      filter: 'taxonomy.label:"test"'
    })).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      return: 'enrichedTitle.entities.text',
      filter: `taxonomy.label:"test",blekko.chrondate>${moment().subtract(24,'h').unix()},blekko.hostrank>300`
    });
  });
});