import { expressionInfo } from '@/constants/penguinState';
import { expressionType } from '@/types/model';

interface IPenguinExpressionProps {
  width?: string;
  expression: expressionType;
  onClick?: () => void;
}

const PenguinExpression = ({ width, expression, onClick }: IPenguinExpressionProps) => {
  return (
    <>
      <div onClick={onClick} className={`${width} relative z-10`}>
        {expressionInfo[expression as expressionType]}
      </div>
    </>
  );
};

export default PenguinExpression;
