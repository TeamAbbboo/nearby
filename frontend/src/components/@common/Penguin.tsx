import penguin from '@/assets/penguin.gif';

interface IPenguinProps {
  mode: string;
  decoration?: string;
  onClick?: () => void;
}

const Penguin = ({ mode, decoration, onClick }: IPenguinProps) => {
  console.log(mode);
  console.log(decoration);

  return <img onClick={onClick} src={penguin} alt="penguin"></img>;
};

export default Penguin;
