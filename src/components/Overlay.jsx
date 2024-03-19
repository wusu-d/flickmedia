import { MdOutlineClose } from "react-icons/md";

const Overlay = ({ isLoading, isError, closeOverlay, message }) => {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.0)", pointerEvents: "all" }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999]"
    >
      {isLoading && (
        <div className="flex items-center justify-center h-[200px] w-[200px] bg-white rounded-md shadow-xl">
          <span className="loader w-12 h-12 border-[5px]"></span>
        </div>
      )}

      {isError && (
        <div className="flex text-center flex-col gap-4 relative items-center justify-center h-[200px] w-[200px] bg-white rounded-md shadow-xl">
          <span>{message}</span>
          <button
            onClick={() => closeOverlay()}
            className="bg-red-600 font-medium text-white px-2 py-1 rounded shadow-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Overlay;
