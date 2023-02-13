import { useParams } from 'react-router-dom';
import { CertainProfilePage } from './CertainProfilePage';
import { MyProfilePage } from './MyProfilePage';

import './tmp.css';

export const ProfilePage = () => {
  return isNaN(Number(useParams().id)) ? <MyProfilePage /> : <CertainProfilePage />;
};
