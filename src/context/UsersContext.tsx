import React, {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

import { User } from '../constants';

type UsersContextType = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  defaultUserId: number;
  setDefaultUserId: Dispatch<SetStateAction<number>>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

const useUsersContext = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within an UsersProvider');
  }
  return context;
};

const updateUsersList = async (usersList: User[]) => {
  try {
    const jsonValue = JSON.stringify(usersList);
    await AsyncStorage.setItem('usersList', jsonValue);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUsersList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('usersList');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const UsersProvider = (props: { children: ReactNode }): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  const [defaultUserId, setDefaultUserId] = useState<number>(0);
  const { isConnected } = useNetInfo();

  useEffect(() => {
    const fetchUsersList = async () => {
      let newUsersList: User[] = await getUsersList();
      if (isConnected) {
        try {
          const rawUsersDataArray = await fetch(
            'https://jsonplaceholder.typicode.com/users',
          );
          const usersObjectsArray = await rawUsersDataArray.json();
          if (usersObjectsArray.length > 0) newUsersList = usersObjectsArray;
        } catch (error) {
          throw new Error(`${error}`);
        }
      }
      if (newUsersList.length > 0) setUsers(newUsersList);
    };
    if (isConnected !== null) fetchUsersList();
  }, [isConnected]);

  useEffect(() => {
    if (users.length > 0) updateUsersList(users);
  }, [users]);

  return (
    <UsersContext.Provider
      {...props}
      value={{ users, setUsers, defaultUserId, setDefaultUserId }}
    />
  );
};

export { UsersProvider, useUsersContext };
