export default function Header() {
  return (
    <header className="border-b-2 border-black bg-[#ffa701] sticky top-0 z-20">
      <div className="flex justify-between h-[70px] items-center layer">
        <h1 className="font-semibold text-3xl flex gap-1 text-black">
          <span className="font-secondary bg-black text-slate-50 px-2 inline-block">
            ?
          </span>
          <span className="self-end font-secondary text-black">Ouizzz</span>
        </h1>
        <div className="flex gap-10 items-center font-medium">
          <div className="border px-7 py-2 cursor-pointer relative rounded-full overflow-hidden group border-black hover:border-none hover:text-white">
            <div className="absolute bg-black w-full h-full border-black -bottom-[100%] right-0 group-hover:bottom-0 duration-100" />
            <div className="relative">Sign Up</div>
          </div>
          <div className="text-white bg-black px-10 py-2 rounded-full cursor-pointer">
            Login
          </div>
        </div>
      </div>
    </header>
  );
}
