"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { calculateCarRent } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("/default-car.jpg");

  const carRent = calculateCarRent(city_mpg, year);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(`/api/car-image?make=${make}&model=${model}`);
        const data = await res.json();
        setImageUrl(data.url);
      } catch {
        setImageUrl("/default-car.jpg");
      }
    }
    fetchImage();
  }, [make, model]);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
        <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
        {carRent}
        <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt='car model' 
            fill 
            priority 
            sizes="100vw"
            className='object-contain' 
          />
        ) : (
          <div style={{width: '100%', height: '100%', background: '#eee'}} />
        )}
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive ? drive.toUpperCase() : "-"}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
