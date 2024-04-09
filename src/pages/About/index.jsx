import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
export default function AboutPage() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/"); 
  };
  return (
    <>
      <Helmet>
        <title>about</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex justify-center items-center w-full px-5 py-[119px] md:p-5 bg-gray-900">
        <div className="flex flex-col items-center w-full max-w-[800px] mt-[9px] pb-10 pl-5 pr-5 md:pl-0 md:pr-0 sm:pl-0 sm:pr-0 bg-gray-900_d8 rounded" >
        <button onClick={handleClose} className="button-wrapper">
          <Img
            src="images/img_div_close_white_a700.svg"
            alt="divclose_one"
            className="h-[64px] w-[64px] top-[120px] left-[75%] transform translate-x-[-50%] md:static sm:left-[50%] sm:transform-none absolute"
          />
        </button>
          <div className="flex flex-col items-center gap-[20px] w-full max-w-[600px]">
            <Heading as="h1" className="tracking-[8.00px] uppercase text-center">
              About
            </Heading>
            <div className="h-[310px] relative w-full">
              <Img
                src="images/img_nft_jpg.png"
                alt="nftjpg_one"
                className="w-full h-auto object-cover rounded max-w-full"
              />
              <Img
                src="images/img_before.png"
                alt="before_one"
                className="h-[310px] w-full opacity-0.5 object-cover absolute rounded"
              />
            </div>
            <div className="flex flex-col gap-[20px] w-full">
              <Text as="p" className="leading-[26px] text-justify">
                The entire system mainly consists of a grow box, a water reservoir, a water pump and few sensors.
              </Text>
              <Text as="p" className="leading-[26px] text-justify">
                The water pumps are attached to the nutrient solution, reservoir, water reservoir and the pH up down solutions. The water level sensor, temperature sensor, EC sensor, pH sensor are installed in the reservoir.
              </Text>
              <Text as="p" className="leading-[26px] text-justify">
                When the EC sensor detects low-salt levels it indicates nutrient deficiencies. Therefore, in such situations, the water pump pumps the nutrient solution to the reservoir. The presence of high salt levels/low water levels indicates that fresh water needs to be pumped to the reservoir.
              </Text>
              <Text as="p" className="leading-[26px] text-justify">
                Overlooking pH control can be perilous for plants, particularly those that rely on water supplies with high alkalinity. The pH of the nutrient solution is a major factor in determining the uptake rate of many essential nutrient ions. Run pH too high and the dreaded nutrient lockout looms. The pH sensor detects the pH level of the water and prompts the pH up/ pH down pump to balance out the pH levels in the reservoir.
              </Text>
              <Text as="p" className="leading-[26px] text-justify">
                The grow box has a drainage system which allows continuous flow of nutrient solution runs over the plants roots.
              </Text>
              <Text as="p" className="leading-[26px] text-justify">
                This type of system works very well because the roots of a plant absorb more oxygen from the air than from the nutrient solution itself. Since only the tips of the roots come in contact with the nutrient solution, the plant is able to get more oxygen which facilitates a faster rate of growth.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
