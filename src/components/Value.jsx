import simple from "../assets/simple.jpg";

function Value() {
  return (
    <div className="mb-8 mt-12 md:mb-16 md:mt-20 lg:mb-24 lg:mt-32">
      <h1 className="text-textColor text-2xl md:text-3xl lg:text-4xl py-8 md:py-12 font-bold max-w-3xl mx-auto">
        The value that holds us true and to account
      </h1>

      <div className="grid gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center max-w-6xl mx-auto">
        <div className="singleGrid rounded-md hover:bg-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-2 rounded-full bg-blue-200 h-10 w-10 flex items-center justify-center">
              <img src={simple} alt="" className="w-7/10" />
            </div>
            <span className="font-semibold text-textColor text-lg">
              Simplicity
            </span>
          </div>
          <p className="text-sm text-textColor opacity-70 py-4 font-semibold">
            Things being made beautifully simple are at the heart of everything
            we do.
          </p>
        </div>

        <div className="singleGrid rounded-md hover:bg-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-2 rounded-full bg-yellow-200 h-10 w-10 flex items-center justify-center">
              <img src={simple} alt="" className="w-7/10" />
            </div>
            <span className="font-semibold text-textColor text-lg">
              Simplicity
            </span>
          </div>
          <p className="text-sm text-textColor opacity-70 py-4 font-semibold">
            Things being made beautifully simple are at the heart of everything
            we do.
          </p>
        </div>

        <div className="singleGrid rounded-md hover:bg-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-2 rounded-full bg-yellow-200 h-10 w-10 flex items-center justify-center">
              <img src={simple} alt="" className="w-7/10" />
            </div>
            <span className="font-semibold text-textColor text-lg">
              Simplicity
            </span>
          </div>
          <p className="text-sm text-textColor opacity-70 py-4 font-semibold">
            Things being made beautifully simple are at the heart of everything
            we do.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Value;
