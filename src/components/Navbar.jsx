const Navbar = () => {
  return (
    <nav className="bg-green-700 flex justify-around items-center text-white px-3 py-2">
      <div className="font-bold text-4xl">
        <span className="text-red-400">&lt;</span>
        iPass
        <span className="text-red-400">/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-5 items-center justify-center">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="/">
            About
          </a>
          <a className="hover:font-bold" href="/">
            Contact us
          </a>
        </li>
      </ul>

      <button className="flex justify-center items-center gap-2 border border-white hover:bg-green-600 rounded-full px-3 py-1">
        <img width={30} src="/icons/github.png" alt="github" />
        <span className="font-bold">GitHub</span>
      </button>
    </nav>
  );
};

export default Navbar;
