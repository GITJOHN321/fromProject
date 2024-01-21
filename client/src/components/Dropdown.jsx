import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useCategories } from "../context/CategoryContext";
import { notRepeatArrays } from "../utils/utilsScripts.js";

function Dropdown({ list, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getSubcategories, listSubCategories, setListSubCategories } =
    useCategories();
  const [Name, setName] = useState(name);

  const onsubmit = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
    console.log(listSubCategories)
  };
  const onClickOption = (evt, e) => {
    evt.preventDefault();

    if (e.name_category) {
      getSubcategories(e.id_category);
      setName(e.name_category);

    }else if (e.name_subcategory) {
      setName(e.name_subcategory);

      if (notRepeatArrays(listSubCategories, e)) {
        alert('¡Subcategory Repeat!')
      } else {
        setListSubCategories([...listSubCategories, e]);
      }
    }
    setIsOpen(false);
  };
  return (
    <div>
      <div className="z-10 relative flex flex-col items-center">
        <button
          onClick={(e) => onsubmit(e)}
          className="bg-sky-600  hover:bg-sky-500 border-2 flex items-center text-white px-4 py-2 mt-2 rounded-md w-full"
        >
          {Name}
          {!isOpen ? (
            <AiOutlineCaretDown className=""></AiOutlineCaretDown>
          ) : (
            <AiOutlineCaretUp className=""></AiOutlineCaretUp>
          )}
        </button>
        {isOpen && (
          <div className="absolute top-16 flex flex-col tiems-start rounded-lg py-2 w-full bg-slate-100 border-blue-200 border-2 shadow-lg">
            {list.map((e, i) => (
              <button
                onClick={(evt) => onClickOption(evt, e)}
                className="flex w-full justify-between hover:bg-blue-200 cursor-pointer  p-2"
                key={i}
              >
                {e.name_category && <h3>{e.name_category}</h3>}
                {e.name_subcategory && <h3>{e.name_subcategory}</h3>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
