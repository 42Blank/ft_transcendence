import { useParams } from 'react-router-dom';
import { CertainProfilePage } from './CertainProfilePage';
import { MyProfilePage } from './MyProfilePage';

export const ProfilePage = () => {
  return isNaN(Number(useParams().id)) ? <MyProfilePage /> : <CertainProfilePage />;
};
