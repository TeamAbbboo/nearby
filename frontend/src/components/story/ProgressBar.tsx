interface IProgressState {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressState) => {
  return (
    <div className="w-full h-[2px] bg-white/30 rounded-lg ">
      <div className="h-[2px] bg-white w-full rounded-lg" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
