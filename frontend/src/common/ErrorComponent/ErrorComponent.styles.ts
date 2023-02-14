import { css } from '@emotion/css';

export const errorComponentWrapperStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export const errorComponentTitleStyle = css({
  fontSize: 25,
  marginBottom: 15,
});

export const errorComponentSubtitleStyle = css({
  fontSize: 20,
  marginBottom: 15,
  opacity: 0.5,
});

export const errorComponentLinkStyle = css({
  display: 'inline-block',
  textDecoration: 'none',
  color: 'black', // TODO: 상수화
  padding: '10px 20px',
  border: '1px solid black', // TODO: 상수화
  borderRadius: 5,
});
