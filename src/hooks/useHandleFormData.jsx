import { useState } from "react";

function useHandleFormData({ initData = {} }) {
  const [data, setData] = useState({ ...initData });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return { data, setData, handleChange };
}

export default useHandleFormData;
