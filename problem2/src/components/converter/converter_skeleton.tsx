import Skeleton from "../skeleton/Skeleton";

const Converter_Skeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <Skeleton style="w-20 h-8 rounded-full" />
      <Skeleton style="w-[50%] h-4 rounded-md mb-4" />
      <div className="flex gap-2 items-center">
        <Skeleton style="w-8 h-8 rounded-full" />
        <Skeleton style="w-10 h-6 rounded-md" />
      </div>
      <Skeleton style="w-full h-[50px] rounded-full" />

      <Skeleton style="w-10 h-10 rounded-full self-center" />
      <div className="flex gap-2 items-center">
        <Skeleton style="w-8 h-8 rounded-full" />
        <Skeleton style="w-10 h-6 rounded-md" />
      </div>
      <Skeleton style="w-full h-[50px] rounded-full" />
      <div className="flex justify-between">
        <Skeleton style="w-[30%] h-4 rounded-md mb-4" />
        <Skeleton style="w-[30%] h-4 rounded-md mb-4" />
      </div>
      <div className="flex justify-between">
        <Skeleton style="w-[30%] h-4 rounded-md mb-4" />
        <Skeleton style="w-[10%] h-4 rounded-md mb-4" />
      </div>
      <Skeleton style="w-full h-[50px] rounded-full" />
      {/* <Skeleton style="w-[50%] h-8 rounded-md" />
      <Skeleton style="w-full h-full rounded-md" /> */}
    </div>
  );
};

export default Converter_Skeleton;
