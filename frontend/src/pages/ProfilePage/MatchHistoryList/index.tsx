import { useGetMatchHistoryByUserId } from 'hooks';
import { MatchHistoryType } from 'types/profile';
import { MatchHistoryElement } from './MatchHistoryElement';

import {
  matchHistoryLoadingStyle,
  matchHistoryWrapperDivStyle,
  matchHistoryWrapperStyle,
} from './MatchHistoryList.styles';

interface Props {
  userId: number;
}

export const MatchHistoryList = ({ userId }: Props) => {
  const { matchHistory, isLoading } = useGetMatchHistoryByUserId(userId);

  return (
    <div className={matchHistoryWrapperDivStyle}>
      <ul className={matchHistoryWrapperStyle}>
        {isLoading ? (
          <span className={matchHistoryLoadingStyle}>전적 목록을 불러오고 있습니다...</span>
        ) : (
          matchHistory.map((value: MatchHistoryType, index: number) => (
            <MatchHistoryElement key={`match-history-${index}`} history={value} userId={userId} />
          ))
        )}
      </ul>
    </div>
  );
};
