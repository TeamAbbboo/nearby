interface IDandelionState {
  state: number;
}

const Dandelion = ({ state }: IDandelionState) => {
  return (
    <img
      src={`src/assets/dandelion_${state % 6}.png`}
      className={`absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2/4`}
    ></img>
  );
};

export default Dandelion;
