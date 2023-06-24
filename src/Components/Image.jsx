import React from "react";

const Image = ({ data }) => {
  return (
    <>
      {data.map(({ id, avatar, first_name }) => (
        <div className="">
          <div className="flex flex-col justify-center items-center w-full ">
            <div className="border-2 p-8 border-black rounded-xl relative">
              <img className="rounded-xl w-44 h-32" src={avatar} />
              <div className="bg-black  text-white flex justify-center">
                <h1 className="absolute -top-2 -right-2 bg-black  w-10 h-10 rounded-full flex justify-center items-center font">
                  {id}
                </h1>
              </div>
            </div>
            <div>
              <h5>{first_name}</h5>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Image;
