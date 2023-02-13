import { Status } from "../../../types";

export type Profile = {
  email: string;
  avatarUrl: string;
  username: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Avatar = { url: string };
export type Message = { message: string };

export type ProfileResponse = {
  data: Profile;
  status: number;
  statusText: string;
};

export interface ProfileSliceState {
  status: Status;
  data: Profile | null;
  message?: string;
}

export interface GetProfileParams {
  id: string;
}

export interface ChangeAvatarParams {
  image: FormData;
}

export type AvatarResponse = {
  data: Avatar;
  status: number;
  statusText: string;
};

export interface DeleteAccountParams {
  id: string;
}

export type DeleteAccountResponse = {
  data: Message;
  status: number;
  statusText: string;
};

export interface ChangePassword {
  previous: string;
  new: string;
  userId: string;
}

export type UpdateProfileResponse = {
  data: Message;
  status: number;
  statusText: string;
};
