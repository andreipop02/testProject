import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-community/netinfo', () => {
  return {
    useNetInfo: jest.fn(() => {
      return {
        isConnected: true,
      };
    }),
  };
});
