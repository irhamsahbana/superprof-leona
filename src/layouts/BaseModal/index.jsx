import React from "react";
import { ButtonOutline, ButtonMain } from "../../components/Button";

export default function BaseModal(props) {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 backdrop-opacity-10 backdrop-invert">
      <div className="flex-col bg-white py-12 px-16 rounded-xl w-max">
        <h3 className="text-center text-xl font-Inter font-bold text-main-blue mb-4">
          {props.heading}
        </h3>
        {/* content area*/}
        <div className="flex-grow h-auto overflow-y-auto my-8 w-96">
          {props.children}
        </div>
        <div className="flex flex-row float-right">
          <ButtonOutline
            text="Close"
            hoverColor="hover:bg-slate-50"
            textColor="text-blue-400"
            borderColor="border-blue-400"
            onClick={props.handleClose}
          />
          <ButtonMain
            text={props.text}
            bgColor="bg-blue-400"
            hoverColor="hover:bg-blue-500"
            onClick={props.onClick}
          />
        </div>
      </div>
    </div>
  );
}
