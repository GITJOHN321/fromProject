import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useCategories } from "../context/CategoryContext";

function Dropdown({ list }) {
  const [isOpen, setIsOpen] = useState(false);
  const {getSubcategories, subcategories} = useCategories()
  const onsubmit = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev)
  };
  const onClickOption = (evt, id) => {
    evt.preventDefault()
    getSubcategories(id)
    console.log(subcategories)
  }
  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={(e) => onsubmit(e)}
        className="bg-fuchsia-800 hover:bg-fuchsia-900 border-2 flex items-center text-white px-4 py-2 mt-2 rounded-md w-full"
      >
        Filter
        {!isOpen ? (
          <AiOutlineCaretDown className=""></AiOutlineCaretDown>
        ) : (
          <AiOutlineCaretUp className=""></AiOutlineCaretUp>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-16 flex flex-col tiems-start rounded-lg p-2 w-full bg-zinc-500">
          {list.map((e) => (
            <button onClick={(evt) => onClickOption(evt, e.id_category)} className="flex w-full justify-between hover:bg-zinc-600 cursor-pointer rounded-lg p-2" key={e.id_category ? e.id_category : e.id_subcategory}>
              {e.name_category && (<h3>{e.name_category}</h3>)}
              {e.name_subcategory && (<h3>{e.name_subcategory}</h3>)}
            </button>
        
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
