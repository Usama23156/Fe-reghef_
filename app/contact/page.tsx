import React from 'react';
import { FaPhoneVolume } from "react-icons/fa6";
import { BsEnvelope } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

 const Page : React.FC = () => {
  return (
    <div>
      <div className="pt-32">
        <div className="lg:px-37,5 sm:max-w-[90%] md:max-w-full m-auto text-black">
          <Text 
            header={"تواصل معنا"} 
            paragraph={""} 
          />
          <Boxs />
          <Body />
        </div>
      </div>
    </div>
  );
};

interface TextProps {
  header: string;
  paragraph: string;
}

function Text({ header, paragraph }: TextProps) {
  return (
    <div className="max-lg:px-5">
      <h1 className="font-normal md:text-[40px] leading-12 text-center text-[30px]">{header}</h1>
      <p className={`mb-7.5 text-center m-auto md:mb-15 max-w-[95%] md:max-w-[60%] lg:max-w-[50%] max-sm:text-[12px]`}>{paragraph}</p>
    </div>
  );
}

function Boxs() {
  return (
    <div className="my-7.5 flex md:flex-row flex-wrap gap-7 lg:max-w-[80%] md:max-w-[90%] m-auto">
      <Box iconname={<FaLocationDot className="text-(--bg-color) text-[20px]" />} address={" طريق الجولي فيل"} text={"شارع سان جوزيف"} />
      <Box iconname={<FaPhoneVolume className="text-(--bg-color) text-[20px]" />} address={"01040145657"} text={"01040770102"} />
      <Box iconname={<BsEnvelope className="text-(--bg-color) text-[30px] my-2" />} address={"FeReghef@gmail.com"} text={""} />
    </div>
  );
}

interface BoxProps {
  iconname: string | React.ReactNode;
  address: string;
  text: string;
}

function Box({ iconname, address, text }: BoxProps) {
  return (
    <div className="rounded-lg w-full md:flex-[30%] py-6.25 flex items-center justify-center flex-col gap-2.5 bg-[#eee] max-w-[85%] m-auto">
      <span>{iconname}</span>
      <p className="text-center">{address}</p>
      <p className="text-center">{text}</p>
    </div>
  );
}

function Body() {
  return (
    <div className="shadow-[0_0_20px_0_rgba(0,0,0,0.1)] md:p-12.5 rounded-2xl my-12.5 md:max-w-[90%] lg:max-w-[80%] max-w-[85%] m-auto">
      <Text header={"ارسل لنا"} paragraph={"تواصلوا معنا لطرح جميع أسئلتكم وآرائكم، أو يمكنكم حل مشاكلكم في وقت أقصر من خلال مكاتب الاتصال لدينا.."} />
      <Inputs />
    </div>
  );
}

function Inputs() {
  return (
    <div className="px-7.5 md:px-0 pb-12.5 md:flex md:gap-x-5 gap-y-5 justify-between m-auto flex-wrap">
      <Input inputtyp={"text"} label={"الاسم"} width={45} />
      <Input inputtyp={"email"} label={"الايميل*"} width={45} />
      <Input inputtyp={"number"} label={"الموبايل"} />
      <TextArea label={"رسالتك"} />
      <button className="cursor-pointer px-3.75 md:px-6.25 py-1.25 text-white bg-(--bg-color) rounded-[5px]">ارسل</button>
    </div>
  );
}

interface InputProps {
  inputtyp: string;
  label: string;
  width?: number;
}

function Input({ inputtyp, label, width = 100 }: InputProps) {
  return (
    <div className={`flex flex-col w-full md:w-[${width}%]`}>
      <label id={label} className="block max-md:mb-1.25 mb-1.75">{label}</label>
      <input type={inputtyp} id={label} className="rounded-[5px] max-md:mb-3.75 bg-[#F3F4F7] w-full p-2 border-none outline-none md:full" />
    </div>
  );
}

interface TextAreaProps {
  label: string;
}

function TextArea({ label }: TextAreaProps) {
  return (
    <div className={`flex flex-col w-full`}>
      <label className="block max-md:mb-1.25 mb-1.75">{label}</label>
      <textarea rows={4} className="resize-none scrollbar-none overflow-y-auto rounded-[5px] max-md:mb-3.75 bg-[#F3F4F7] w-full p-2 border-none outline-none md:full" />
    </div>
  );
}

export default Page;