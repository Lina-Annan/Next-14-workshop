const Footer = () => {
  return (
    <div className="shadow-2xl">
      <div className="flex items-center pt-16 px-32  gap-36">
        <div className="flex flex-col gap-5 ">
          <p className="text-2xl font-bold">Header</p>
          <p className="font-light text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br /> Sed ornare cursus sed nunc eget dictum Sed ornare cursus{" "}
            <br />
            sed nunc eget dictumd nunc eget dictum Sed ornare cursus
            <br /> sed nunc eget dictum
          </p>
        </div>
        <div>
          <p className="font-normal text-lg">Learn More</p>
          <ul className="flex flex-col gap-2 font-light mt-5">
            <li className="text-sm">About</li>
            <li className="text-sm">Contact</li>
            <li className="text-sm">Services</li>
            <li className="text-sm">Projects</li>
          </ul>
        </div>
        <div>
          <p className="font-normal text-lg">Tickets & Booking</p>
          <ul className="flex flex-col gap-2 font-light mt-5">
            <li className="text-sm">About</li>
            <li className="text-sm">Contact</li>
            <li className="text-sm">Services</li>
            <li className="text-sm">Projects</li>
          </ul>
        </div>
        <div>
          <p className="font-normal text-lg">Contact Us</p>
          <ul className="flex flex-col gap-2 font-light mt-5">
            <li className="text-sm">About</li>
            <li className="text-sm">Contact</li>
            <li className="text-sm">Services</li>
            <li className="text-sm">Projects</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-200 rounded-2xl h-[1px] m-10" />
      <div className="flex justify-center pb-14">
        <p className="text-sm font-light">
          © 2024 by Next Level Team | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
