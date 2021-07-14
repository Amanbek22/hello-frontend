import React, { useState } from "react";
import css from "../advert.module.css";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const AddPictures = ({ input }: any) => {
  const [value, setValue] = useState<any>([]);
  const [images, setImages] = useState<any>([]);

  input.onChange(images);

  const handleChange = (target: any) => {
    if (value.length < 5) {
      setImages((prev: any) => [target.files, ...prev]);
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (e: any) => {
        const newUrl = e.target.result;
        setValue((prev: any) => [newUrl, ...prev]);
      };
    }
  };

  const onDeleteHandler = (id: number) => {
    setValue((prev: any) =>
      prev.filter((img: any, index: number) => index !== id),
    );
  };

  return (
    <div className={css.add_picture_wrapper}>
      <div className={css.add_picture}>
        <AddPhotoAlternateOutlinedIcon className={css.add_picture_icon} />
        <p className={css.add_picture_text}>Выберите фото (макс 5) </p>
        <input
          className={css.add_picture_input}
          accept="image/*,image/jpeg"
          onChange={({ target }) => handleChange(target)}
          type="file"
          id="file-image"
        />
      </div>
      {value?.map((img: string, index: number) => (
        <div className={css.pictures_wrapper} key={img + index}>
          <img src={img} alt="image" className={css.add_picture_images} />
          <div className={css.delete} onClick={() => onDeleteHandler(index)}>
            <CloseOutlinedIcon className={css.delete_icon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddPictures;
