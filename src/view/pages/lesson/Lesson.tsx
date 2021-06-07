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
      .then((res: VideoModalType) => {
        // console.log(res);
        setData({
          ...res,
          videoUrl: res?.videoUrl.replace("watch?v=", "embed/"),
        });
      });
  }, [id]);
  if (isPending) return <Preloader absolute />;
  return (
    <div className={`container`}>
      <div className={css.wrapper}>
        <iframe
          className={css.video_card}
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
