import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import ReactShallowRenderer = require('react-test-renderer/shallow');

import {Hello} from './hello'

describe('<Hello />', ()=>{
  const shallowRenderer = new ReactShallowRenderer();
  it('renders Hello', ()=>{
    expect(shallowRenderer.render(<Hello compiler="TypeScript" framework="React"/>))
    .toMatchSnapshot();
  })
  
})