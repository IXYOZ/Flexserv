"use client";

import { useState, useRef, useEffect } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function DropDown({ label, options, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutSide(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-200 px-3  py-1 rounded hover:bg-gray-400 text-black"
      >
        {selected}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 max-w-screen-sm">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover: bg-gray-100 cursor-pointer text-black hover:bg-blue-500 hover:border-2-white hover:text-white"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
