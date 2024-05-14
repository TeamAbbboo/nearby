interface IProgressState {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressState) => {
  return (
    <div className="w-full h-1 bg-white/30 rounded-lg ">
      <div className="h-1 bg-white w-full rounded-lg" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
