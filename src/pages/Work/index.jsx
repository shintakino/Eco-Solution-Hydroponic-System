import React from "react";
import { Helmet } from "react-helmet";
import { Img, Heading } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";

export default function WorkPage() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/"); 
  };
  return (
    <>
      <Helmet>
        <title>work</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full px-5 py-[129px] md:p-5 bg-gray-900">
        <div className="w-full max-w-[800px]">
          <div className="flex flex-col pb-10 pl-5 pr-5 gap-[7px] bg-gray-900_d8 rounded">
          <button onClick={handleClose} className="button-wrapper">
            <Img
              src="images/img_div_close_white_a700.svg"
              alt="divclose_one"
              className="h-[64px] w-[64px] top-[120px] left-[75%] transform translate-x-[-50%] md:static sm:left-[50%] sm:transform-none absolute"
            />
          </button>
            <div className="flex flex-col gap-10">
              <Heading as="h1" className="tracking-[8.00px] uppercase text-center">
                Work
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="aspect-w-16 aspect-h-9">
                  <Img
                    src="images/img_full_thing_jpeg.png"
                    alt="fullthingjpeg"
                    className="object-cover rounded"
                  />
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <Img
                    src="images/img_grow_box_jpeg.png"
                    alt="growboxjpeg_one"
                    className="object-cover rounded"
                  />
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <Img
                    src="images/img_arduino_jpeg.png"
                    alt="arduinojpeg_one"
                    className="object-cover rounded"
                  />
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <Img
                    src="images/img_breadboard_jpeg.png"
                    alt="breadboardjpeg"
                    className="object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
