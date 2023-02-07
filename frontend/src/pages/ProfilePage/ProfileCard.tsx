import React from 'react';
import { UserInfoType } from 'types/auth';

export const ProfileCard = ({ id, intraID, nickname, point, createdAt, updatedAt, avatar }: UserInfoType) => {
  return (
    <div>
      <img src={avatar} alt="avatar" />
      <h1>{nickname}</h1>
      <p>ID : {id}</p>
      <p>intra ID : {intraID}</p>
      <p>point : {point}</p>
      <p>Created at : {createdAt}</p>
      <p>Updated at : {updatedAt}</p>
      <p>ladder level : ?</p>
      <p>achievements : ?</p>
    </div>
  );
};
