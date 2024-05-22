import axios from 'axios';
import { tesloApi } from '../../config/api';
import { User } from '../../domain/entities';
import type { AuthResponse } from '../../infrastructure/interfaces';

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };
  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    return returnUserToken(data);
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const authRegister = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log({ error });
    return null;
  }
};
