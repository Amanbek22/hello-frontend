import React, { useState } from "react";
import styled from "styled-components";

const AddPhoto = styled.label`
  margin: 0 auto;
  & input {
    display: none;
  }
  & .button {
    cursor: pointer;
    background: #ffffff;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    & img {
      max-width: 100%;
      height: auto;
    }
  }
`;

function AddPicture({ input }: any) {
  const [value, setValue] = useState(() => input.value);
  const handleChange = (target: any) => {
    input.onChange(target.files);
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (e: any) => {
      const newUrl = e.target.result;
      setValue(newUrl);
    };
  };
  return (
    <AddPhoto>
      <div className="button">
        {value ? (
          <img src={value} height="150" width="150" alt="#" />
        ) : (
          <img src="/img/camera.png" alt="Picture" />
        )}
      </div>
      <input onChange={({ target }) => handleChange(target)} type="file" />
    </AddPhoto>
  );
}

export default AddPicture;
