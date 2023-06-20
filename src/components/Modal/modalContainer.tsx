"use client";

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface FormContainerProps {
  children: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  title: string;
}

export default function ModalContainer({
  children,
  modalOpen,
  setModalOpen,
  title,
}: FormContainerProps) {
  return (
    <>
      {modalOpen ? (
        <div className="absolute w-full h-full flex items-center justify-center bg-white-opacity40 z-10">
          <div className="flex flex-col relative w-[400px] bg-black-opacity80 p-8 rounded-lg">
            <AiOutlineClose
              className="absolute top-2 right-2"
              cursor="pointer"
              size={24}
              color={"#ffffff"}
              onClick={() => setModalOpen(false)}
            />
            <h4 className="text-center text-white text-xl font-medium">
              {title}
            </h4>
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
