import cleanForm from "./cleanForm";

const exitEditMode = (setOfEdit?) => {
    cleanForm();
    setOfEdit();
    // if (typeof setOnEdit === "function") {
    //     setOnEdit(false); // Garantimos que é uma função
    // } else {
    //     console.error("setOnEdit is not a function");
    // }
};

export default exitEditMode;