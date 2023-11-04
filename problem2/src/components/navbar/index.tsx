const Navbar = () => {
  return (
    <div className="navbar wrapper cursor-pointer h-[60px] p-custom w-full justify-self-center mt-4 flex items-center justify-between bg-white bg-opacity-5 rounded-[50px] backdrop-blur-[20px]">
      <div className="w-12 h-12 rounded-full  p-2">
        <img
          src="/logo.png"
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>

      <button className="hover:opacity-100 transition-opacity w-[189px] h-full bg-zinc-300 bg-opacity-80 rounded-[30px] text-black font-bold">
        Launch App
      </button>
    </div>
  );
};

export default Navbar;
