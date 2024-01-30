const Carousel = ({ features }) => {
  return (
    <div className="flex flex-row overflow-x-auto space-x-6 py-4  bg-black items-center px-8">
      {/* flex flex-row overflow-x-auto space-x-6 pb-4 my-8 bg-black items-center justify-center h-full */}
      {features.map((item, index) => {
        return (
          <div
            key={"key" + index}
            className={`flex-none w-96 h-[350px] ${item.color}   rounded-3xl 
            overflow-hidden  my-5 top-2/4`}
          >
            <img
              src={item.src}
              className="  w-28 h-28 items-center text-center justify-center mx-auto mt-14 mb-6 bg-white rounded-full p-2"
            />
            <div className="p-4">
              <h3 className="text-3xl text-center font-poppins tracking-wider font-extrabold mb-2 text-solarized-red">
                {item.title}
              </h3>
              <p className="text-md font-poppins text-center tracking-normal leading-relaxed mt-4">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
