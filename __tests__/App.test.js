/**
 * @format
 */

import 'react-native';
// import '@types/jest';
import LoginScreen from '../screens';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import { render, screen, fireEvent } from '@testing-library/react-native';
import rendrer from 'react-test-renderer'

import App from '../App';

import {fetchPosts} from '../redux/saga/fetchPosts'
import {runSaga} from 'redux-saga'

it('login renders correctly across screens', () => {
  const tree = render(<App />).toJSON();
  expect(tree).toMatchSnapshot()
});

test('login-test', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <App />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter UserName'),
    'Admin',
  );
  fireEvent.changeText(
    getByPlaceholderText('Enter password'),
    'Admin',
  );
  fireEvent.press(getByText('LOGIN'));

  const success = getAllByText('Login successful.');
  expect(success).toHaveLength(1); // expect 'success' message
});

test('login-test-fail', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <App />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter UserName'),
    'ABD',
  );
  fireEvent.changeText(
    getByPlaceholderText('Enter password'),
    '123',
  );
  fireEvent.press(getByText('LOGIN'));

  const fail = getAllByText('Login failed.');
  expect(fail).toHaveLength(1); // expect 'fail' message
});

test('get-posts', async() => {
  let dispatched = []
  const saga = runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => ({ state: 'test' }),
    },
    fetchPosts
  );
  const results = await saga.toPromise();

  expect(results.length).toBeGreaterThanOrEqual(1); // expect 'success' message
}, 10000);