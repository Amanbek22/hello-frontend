import css from "./lesson.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Preloader from "../../preloader/preloader";
import { getData } from "../../../firebase/firebase.actions";
import { VideoModalType } from "../../../models/type";

function Lesson() {
  const { id, vid }: { id: string; vid: string } = useParams();
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<VideoModalType | null>(null);
  useEffect(() => {
    getData({
      path: `bilim/${id}/video`,
      doc: vid,
    })
      .finally(() => setIsPending(false))
      .then((res: VideoModalType) =>
        setData({
          ...res,
          videoUrl: res?.videoUrl.replace("watch?v=", "embed/"),
        }),
      );
  }, [id]);
  if (isPending) return <Preloader absolute />;
  return (
    <div className={`container`}>
      <div className={css.wrapper}>
        {/*<video width="100%">*/}
        {/*  <source*/}
        {/*    src={data?.videoUrl}*/}
        {/*    type='video/ogg; codecs="theora, vorbis"'*/}
        {/*  />*/}
        {/*  <source*/}
        {/*    src={data?.videoUrl}*/}
        {/*    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'*/}
        {/*  />*/}
        {/*</video>*/}
        <iframe
          src={data?.videoUrl}
          width="100%"
          height="400px"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <h2 className={css.title}>{data?.name}</h2>
        <p className={css.description}>{data?.description}</p>
      </div>
    </div>
  );
}

export default Lesson;
