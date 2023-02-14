import { useNavigate } from 'react-router-dom';

import { WarningIcon } from 'assets';
import { ROUTE } from 'common/constants';

import {
  errorComponentLinkStyle,
  errorComponentSubtitleStyle,
  errorComponentTitleStyle,
  errorComponentWrapperStyle,
} from './ErrorComponent.styles';

interface Props {
  error: Error;
}

export const ErrorComponent = ({ error }: Props) => {
  const nav = useNavigate();

  function handleClickLinkButton() {
    nav(ROUTE.CHAT);
    window.location.reload();
  }

  return (
    <div className={errorComponentWrapperStyle}>
      <WarningIcon />
      <h4 className={errorComponentTitleStyle}>오류가 발생했습니다!</h4>
      <h5 className={errorComponentSubtitleStyle}>{error.message}</h5>
      <button type="button" onClick={handleClickLinkButton} className={errorComponentLinkStyle}>
        <span>메인 화면으로 돌아가기</span>
      </button>
    </div>
  );
};
