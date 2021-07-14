import React, { useCallback, useState } from "react";
import { IDisplayImage, IThumbnail } from "./types";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    boxShadow: "0 2px 4px rgb(0 0 0 / 5%), 0 0 0 3px rgb(63 63 68 / 10%)",
    backgroundColor: "#2a2a2a",
    width: 800,
    height: 600,
    margin: "auto",
  },
  thumbnail: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    overflowY: 'scroll',
    height: 600
  } as React.CSSProperties | undefined,
  cardThumb: {
    width: 120,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 100,
    marginBottom: 20,
    boxShadow: "1 3px 6px rgb(90 90 90 / 5%), 0 0 0 3px rgb(180 181 182 / 10%)",
    backgroundColor: "#fff",
  } as React.CSSProperties | undefined,
  imgThumb: {
    maxWidth: 100,
    verticalAlign: "middle",
    objectFit: "cover",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer",
  } as React.CSSProperties | undefined,
  mainImage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  label: {
    color: "#fff",
    fontSize: "2rem",
    position: "relative",
    right: "2rem",
    fontFamily: 'Montserrat'
  } as React.CSSProperties,
};

const DisplayImage: React.FC<IDisplayImage> = ({ images, defaultImage }) => {
  const [thumbnail, setThumbnail] = useState<IThumbnail>({ name: "", src: "" });
  const onChangeThumbnail = useCallback((src: string, name: string) => {
    setThumbnail((prevState) => ({
      ...prevState,
      name,
      src,
    }));
  }, []);

  return (
    <div className="container" style={styles.container}>
      <div className="images-thumbnail" style={styles.thumbnail}>
        {images.length
          ? images.map((file, index) => {
              return (
                <div
                  key={`${file.name}_${index}`}
                  className="card-thumb"
                  style={styles.cardThumb}
                >
                  <img
                    src={`${file.path}`}
                    alt={file.name}
                    width={100}
                    height={100}
                    style={styles.imgThumb}
                    onClick={() => onChangeThumbnail(file.path, file.name)}
                  />
                </div>
              );
            })
          : ""}
      </div>
      {images.length ? (
        <div className="main-image" style={styles.mainImage}>
          <label
            style={styles.label}
          >
            {thumbnail.name === "" ? defaultImage.name : thumbnail.name}
          </label>
          <img
            src={thumbnail.src === "" ? defaultImage.src : thumbnail.src}
            alt={thumbnail.name === "" ? defaultImage.name : thumbnail.name}
            width={500}
            height={500}
            style={{
              objectFit: "cover",
              position: "relative",
              right: "2rem",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayImage;
