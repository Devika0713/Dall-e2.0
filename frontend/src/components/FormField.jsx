/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {/* in html we use for inside label to specify which form field the label is associated with */}
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600"
        >
          {labelName}
        </label>

        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-[12px] bg-sky-950 py-1 px-2 rounded-[5px] text-slate-100"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-sky-950 focus:border-sky-950 outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
