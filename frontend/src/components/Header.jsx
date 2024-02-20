export default function Header() {
  return (
    <div className="border-b-2 border-black-500">
      <div className="flex justify-between h-[70px] items-center layer">
        <h1 className="font-secondary font-semibold text-2xl text-gray-500">
          <span className="text-gray-950">Q</span>ouizzz
        </h1>
        <div className="flex gap-10 items-center">
          <div className="border px-2 py-1 rounded-xl cursor-pointer border-gray-500 hover:border-black">
            Sign Up
          </div>
          <div>Login</div>
        </div>
      </div>
    </div>
  );
}
