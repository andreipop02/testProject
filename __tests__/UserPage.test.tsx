import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RenderAPI } from '@testing-library/react-native';

import UserPage from '../src/features/homepage/screens/UserPage';
import { UsersProvider } from '../src/context/UsersContext';
import { strings } from '../src/constants/';

const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: mockSetOptions,
    }),
  };
});

jest.mock('../src/context/UsersContext', () => {
  const actualContext = jest.requireActual('../src/context/UsersContext');
  return {
    ...actualContext,
    useUsersContext: () => ({
      users: [
        { id: '1', name: 'John Doe', username: 'johndoe', phone: '0742323244' },
        {
          id: '2',
          name: 'Jane Smith',
          username: 'janesmith',
          phone: '07543634634',
        },
      ],
      defaultUserId: '1',
    }),
  };
});

describe('UserPage', () => {
  const renderComponent = () =>
    render(
      <UsersProvider>
        <NavigationContainer>
          <UserPage />
        </NavigationContainer>
      </UsersProvider>,
    );

  const getNextButton = (getByText: RenderAPI['getByText']) =>
    getByText(strings.userPage.nextButton);
  const getPrevButton = (getByText: RenderAPI['getByText']) =>
    getByText(strings.userPage.prevButton);
  const getUsernameText =
    (getByText: RenderAPI['getByText']) => (text: string) =>
      getByText(`${strings.userPage.username} ${text}`);

  test('renders correctly with the default user', () => {
    const { getByText } = renderComponent();

    waitFor(() => {
      expect(getUsernameText(getByText)('johndoe')).toBeTruthy();
    });

    expect(mockSetOptions).toHaveBeenCalledWith({ title: 'John Doe' });
  });

  test('navigates to the next user correctly', () => {
    const { getByText } = renderComponent();

    waitFor(() => {
      fireEvent.press(getNextButton(getByText));
    });

    waitFor(() => {
      expect(getUsernameText(getByText)('janesmith')).toBeTruthy();
    });

    expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Jane Smith' });
  });

  test('disables next button on the last user', () => {
    const { getByText } = renderComponent();

    waitFor(() => {
      fireEvent.press(getNextButton(getByText));
    });

    waitFor(() => {
      expect(getUsernameText(getByText)('janesmith')).toBeTruthy();
      expect(getNextButton(getByText).props.style).toEqual(
        expect.objectContaining({ color: 'grey' }),
      );
    });

    waitFor(() => {
      fireEvent.press(getNextButton(getByText));
    });

    waitFor(() => {
      expect(getUsernameText(getByText)('janesmith')).toBeTruthy();
    });
  });

  test('navigates to the previous user correctly', () => {
    const { getByText } = renderComponent();

    waitFor(() => {
      fireEvent.press(getNextButton(getByText));
    });

    waitFor(() => {
      fireEvent.press(getPrevButton(getByText));
    });

    waitFor(() => {
      expect(getUsernameText(getByText)('johndoe')).toBeTruthy();
    });

    expect(mockSetOptions).toHaveBeenCalledWith({ title: 'John Doe' });
  });

  test('disables prev button on the first user', () => {
    const { getByText } = renderComponent();

    waitFor(() => {
      expect(getUsernameText(getByText)('johndoe')).toBeTruthy();
      expect(getPrevButton(getByText).props.style).toEqual(
        expect.objectContaining({ color: 'grey' }),
      );
    });

    waitFor(() => {
      fireEvent.press(getPrevButton(getByText));
    });

    waitFor(() => {
      expect(getUsernameText(getByText)('johndoe')).toBeTruthy();
    });
  });
});
