import { css } from '@emotion/css';
import { COMMON_SIZES } from 'styles';

export const profileHeaderWrapperStyle = css({});

export const profileCardStyle = css({
  display: 'grid',
  gridTemplateAreas: `
  'img nick point-text'
  'img nick point'`,
  gridTemplateColumns: '230px 230px 230px',
  gridTemplateRows: '130px 130px',
  textAlign: 'center',
  fontSize: '2.5rem',
  '& .avatar': {
    gridArea: 'img',
  },
  '& .nick': {
    gridArea: 'nick',
    marginTop: '120px',
  },
  '& .point-text': {
    gridArea: 'point-text',
    marginTop: '90px',
  },
  '& .point': {
    gridArea: 'point',
    marginTop: '25px',
  },
});

export const profileHeaderAvatarStyle = css({
  width: COMMON_SIZES.ICON_XXLARGE,
  height: COMMON_SIZES.ICON_XXLARGE,
  borderRadius: '50%',
  margin: '5%',
});

export const editProfileButtonStyle = css({
  display: 'inline-block',
  padding: '10px',
});

export const twoFactorAuthStyle = css({
  display: 'inline-block',
  padding: '10px',
});
