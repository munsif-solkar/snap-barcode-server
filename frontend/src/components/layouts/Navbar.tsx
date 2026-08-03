

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 border-b border-gray-100 fixed top-0 z-10 flex flex-row justify-between items-center">

    <div className=''>
      <h1 className=" font-bold text-(--app-theme)">SNAP BARCODE SCANNER</h1>
    </div>
  <div>
      <a href='https://github.com/munsif-solkar/snap-barcode-server' target="_blank" className=" py-1 px-3 rounded-md border border-[#37353E] text-sm ">How to use?</a>
    </div>
  </nav>
  )
}

export default Navbar