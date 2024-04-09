import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Heading } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/"); 
  };
  return (
    <>
      <Helmet>
        <title>intro</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full px-5 py-[118px] md:p-5 bg-gray-900">
        <div className="w-full max-w-[800px]">
          <div className="flex flex-col pb-10 pl-5 pr-5 gap-[7px] bg-blue_gray-900 rounded">
          <button onClick={handleClose} className="button-wrapper">
            <Img
              src="images/img_div_close_white_a700.svg"
              alt="divclose_one"
              className="h-[64px] w-[64px] top-[120px] left-[75%] transform translate-x-[-50%] md:static sm:left-[50%] sm:transform-none absolute"
            />
          </button>
            <div className="flex flex-col gap-10">
              <Heading as="h1" className="tracking-[8.00px] uppercase text-center">
                Intro
              </Heading>
              <div className="flex flex-col gap-10">
                <div className="relative">
                  <Img
                    src="images/img_hydroponics_introduction1_jpg.png"
                    alt="hydroponics_one"
                    className="h-[560px] w-full object-cover rounded"
                  />
                  <Img
                    src="images/img_before.png"
                    alt="before_one"
                    className="h-[560px] w-full absolute inset-0 opacity-0.5 object-cover rounded"
                  />
                </div>
                <div className="relative">
                  <Img
                    src="images/img_hydroponics_introduction_jpg.png"
                    alt="hydroponics"
                    className="h-[746px] w-full object-cover rounded"
                  />
                  <Img
                    src="images/img_before.png"
                    alt="before_three"
                    className="h-[746px] w-full absolute inset-0 opacity-0.5 object-cover rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-[26px]">
                <Text as="p" className="leading-[26px]">
                  <>
                    Hydroponics is a subset of hydroculture, the method of growing plants without
                    <br />
                    soil, using mineral nutrient solutions in a water solvent. Terrestrial plants may
                    <br />
                    be grown with only their roots exposed to the mineral solution, or the roots
                    <br />
                    may be supported by an inert medium, such as perlite or gravel. The nutrients
                    <br />
                    in hydroponics can come from an array of different sources; these can include
                    <br />
                    but are not limited to byproduct from fish waste, duck manure, or commercial
                    <br />
                    fertilisers.
                  </>
                </Text>
                <Text as="p" className="leading-[26px]">
                  <>
                    Growing with hydroponics comes with many advantages, the biggest of which
                    <br />
                    is a greatly increased rate of growth in your plants. With a proper setup, your
                    <br />
                    plants will mature up to 25% faster and produce up to 30% more than the
                    <br />
                    same plants grown in soil.
                  </>
                </Text>
                <Text as="p" className="leading-[26px]">
                  <>
                    Plants in a hydroponic system grow more quickly because they have food and
                    <br />
                    water available to them all the time. They produce bigger crops because they
                    <br />
                    can devote their energy to producing their crop rather than producing large
                    <br />
                    roots such as would be needed in soil to seek out water and nutrients.
                    <br />
                    Hydroponically-grown plants have smaller root systems because the roots do
                    <br />
                    not need to go out looking for nutrients and water.
                  </>
                </Text>
                <Text as="p" className="leading-[26px]">
                  <>
                    All of this is possible through careful control of the nutrient solution and pH
                    <br />
                    levels. A hydroponic system will also use 70-90% less water than soil based
                    <br />
                    plants because the system is enclosed, which results in less evaporation.
                    <br />
                    Hydroponics is better for the environment because it reduces waste and
                    <br />
                    pollution from soil runoff.
                  </>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
