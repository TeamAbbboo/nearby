import penguin from '@/assets/penguin.gif';

interface IPenguinProps {
  width?: string;
  mode: string;
  decoration?: string;
  onClick?: () => void;
}

const Penguin = ({ width, mode, decoration, onClick }: IPenguinProps) => {
  console.log(mode);
  console.log(decoration);

  return <img onClick={onClick} src={penguin} alt="penguin" className={`${width}`}></img>;
};

export default Penguin;
