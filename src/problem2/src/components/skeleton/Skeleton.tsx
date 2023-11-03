import "./Skeleton.scss";

const Skeleton = ({ type }: { type: string }) => {
  const classes = `skeleton  ${type}`;
  return <div className={classes}></div>;
};

export default Skeleton;
