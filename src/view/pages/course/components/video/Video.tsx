import Video from "../../../../components/video/Video";
import { VideoModalType } from "../../../../../models/type";

function Videos(props: { data: VideoModalType[] }) {
  return (
    <div>
      {props.data.map((item: VideoModalType) => (
        <Video key={item.id} {...item} />
      ))}
    </div>
  );
}

export default Videos;
