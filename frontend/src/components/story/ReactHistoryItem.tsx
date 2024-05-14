import PenguinExpression from '@/components/story/PenguinExpression';
import { expressionType } from '@/types/model';
import { IReactionItem } from '@/types/story';
import { getExpressionMeaning } from '@/utils/getExpressionMeaning';
import dayjs from 'dayjs';

interface IReactHistoryItem {
  reactionItem: IReactionItem;
}

const ReactHistoryItem = ({ reactionItem }: IReactHistoryItem) => {
  return (
    <div className="flex flex-row font-NPSfontBold">
      <div className="w-36">
        <PenguinExpression expression={reactionItem.expression} />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row text-lg gap-2">
          <div>{reactionItem.nickname}</div>
          <div>•</div>
          <div>{getExpressionMeaning(reactionItem.expression as expressionType)}</div>
        </div>
        <div className="text-sm text-UNIMPORTANT">{dayjs(reactionItem.createdAt).format('YYYY-MM-DD HH:mm')}</div>
      </div>
    </div>
  );
};

export default ReactHistoryItem;
