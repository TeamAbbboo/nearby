import penguin from '@/assets/penguin.gif';
import scaffolding from '@/assets/scaffolding.png';

interface IPenguinProps {
  width?: string;
  mode: string;
  decoration?: string;
  isScaffolding?: boolean;
  onClick?: () => void;
}

const Penguin = ({ width, mode, decoration, isScaffolding = false, onClick }: IPenguinProps) => {
  console.log(mode);
  console.log(decoration);

  return (
    <>
      <img onClick={onClick} src={penguin} alt="penguin" className={`${width} z-10`}></img>
      {isScaffolding && <img src={scaffolding} alt="scaffolding" className="absolute bottom-0" />}
    </>
  );
};

export default Penguin;
