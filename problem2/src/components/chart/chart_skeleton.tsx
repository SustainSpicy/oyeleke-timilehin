import Skeleton from "../skeleton/Skeleton";

const Chart_Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex gap-2 items-center">
        <>
          <Skeleton style="w-10 h-10 rounded-full" />
          <Skeleton style="w-10 h-10 rounded-full" />
        </>
        <Skeleton style="w-10 h-6 rounded-md" />
      </div>
      <Skeleton style="w-[40%] h-8 rounded-md" />
      <Skeleton style="w-[50%] h-8 rounded-md" />
      <Skeleton style="w-full h-full rounded-md" />
    </div>
  );
};

export default Chart_Skeleton;
