import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import Link from "next/link";

const HomePage = (): JSX.Element => {
  const [photo, setPhoto] = useState<File>();
  const [photoUrl, setPhotoUrl] = useState("");
  const setPhotoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (photo) {
      setPhotoUrl(URL.createObjectURL(photo));
      console.log(photoUrl);
    }
  }, [photo]);

  console.log(photo);
  return (
    <div>
      <h1>HomePagee</h1>
      {photoUrl && (
        <h4>
          Download link: <a href={photoUrl}>Download</a>
        </h4>
      )}
      <h4>Launch user camera only</h4>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={setPhotoHandler}
      />

      <h4>Launch user camera and files</h4>
      <input type="file" accept="image/*" />

      <h4>
        Go to Permission page: <Link href="/permissions">Test permission</Link>
      </h4>
    </div>
  );
};

export default HomePage;
