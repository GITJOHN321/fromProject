function SubcategoryTag({ name }) {

  return (
      <span  className="bg-blue-100 text-blue-800 text-sm font-medium  w-full px-1 mx-0.5 py-0.5 rounded dark:bg-blue-900 dark:text-white cursor-pointer ">
        {name}
      </span>
  );
}

export default SubcategoryTag;
