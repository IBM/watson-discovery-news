import React from 'react';
import { mount } from 'enzyme';
import Search from './';

let defaultProps;

beforeEach(() => {
  defaultProps = {
    onTabChange: jest.fn(),
    onSearchQueryChange: jest.fn(),
    selectedTab: 'news',
    showTabs: false,
  };
});

test('renders and tabs are not visible', () => {
  const component = mount(<Search {...defaultProps} />);
  expect(component.find('.text-input--input').length).toBe(1);
  expect(component.find('.buttons-group').length).toBe(0);
});

test('renders and tabs are visible and top news is selected', () => {
  defaultProps.showTabs = true;

  const component = mount(<Search {...defaultProps} />);
  expect(component.find('.text-input--input').length).toBe(1);
  expect(component.find('.buttons-group').length).toBe(1);
});
