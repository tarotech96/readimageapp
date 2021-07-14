import React, { useState } from "react";
import DisplayImage from "./DisplayImage";
import { IThumbnail } from "./types";

const styles = {
  input: {
    fontSize: "1rem",
  },
};

const App: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [defaultImage, setDefaultImage] = useState<IThumbnail>({
    name: "",
    src: "",
  });

  const onSelectFolder = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles.item(i) as File;
      if (!file.type.match("image.*")) {
        continue;
      }

      const reader = new FileReader();
      reader.onload = function () {
        setImages((prevState) => [
          ...prevState,
          { ...file, name: file.name, path: reader.result as string },
        ]);

        setDefaultImage({ name: file.name, src: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="select-folder">
        <label>フォルダ選択</label>
        <div className="input-select">
          <input
            type="file"
            directory=""
            webkitdirectory=""
            onChange={(event) => onSelectFolder(event)}
            style={styles.input}
          />
        </div>
      </div>
      <div className="images">
        <DisplayImage images={images} defaultImage={defaultImage} />
      </div>
    </div>
  );
};

export default App;
