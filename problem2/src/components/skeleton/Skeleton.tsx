import "./Skeleton.css";

const Skeleton = ({ style, type }: { style?: string; type?: string }) => {
  const classes = `skeleton ${style} ${type}`;
  return <div className={classes}></div>;
};

export default Skeleton;
