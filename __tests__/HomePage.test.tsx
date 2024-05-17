import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomePage from '../src/features/homepage/screens/HomePage';
import { UsersProvider } from '../src/context/UsersContext';
import { strings } from '../src/constants/';

const mockNavigate = jest.fn();
const mockSetDefaultUserId = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({ isConnected: true }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(
    JSON.stringify([
      { id: '1', name: 'John Doe', username: 'johndoe', phone: '123-456-7890' },
      {
        id: '2',
        name: 'Jane Smith',
        username: 'janesmith',
        phone: '098-765-4321',
      },
    ]),
  ),
}));

jest.mock('../src/context/UsersContext', () => {
  const actualContext = jest.requireActual('../src/context/UsersContext');
  return {
    ...actualContext,
    useUsersContext: () => ({
      users: [
        {
          id: '1',
          name: 'John Doe',
          username: 'johndoe',
          phone: '123-456-7890',
        },
        {
          id: '2',
          name: 'Jane Smith',
          username: 'janesmith',
          phone: '098-765-4321',
        },
      ],
      setDefaultUserId: mockSetDefaultUserId,
    }),
  };
});

describe('HomePage', () => {
  const renderComponent = () =>
    render(
      <UsersProvider>
        <NavigationContainer>
          <HomePage />
        </NavigationContainer>
      </UsersProvider>,
    );

  test('renders correctly', async () => {
    const { getByText, getByTestId } = renderComponent();

    await waitFor(() => {
      expect(getByTestId('waveHeader')).toBeTruthy();
      expect(getByText(strings.homepage.screenTitle)).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });
  });

  test('navigates to user screen on user press', async () => {
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });

    fireEvent.press(getByText('John Doe'));

    expect(mockSetDefaultUserId).toHaveBeenCalledWith('1');
    expect(mockNavigate).toHaveBeenCalledWith('User', { title: 'John Doe' });
  });
});
