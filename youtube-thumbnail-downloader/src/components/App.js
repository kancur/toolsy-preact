import { useMemo, useState } from 'preact/hooks';
import { InputForm } from './InputForm';
import DisplayPart from './DisplayPart';

export default function App() {
  const [vcode, setVcode] = useState();

  const generateThumbnailUrl = (videoCode, resolutionName) => {
    if (videoCode) {
      return (`https://img.youtube.com/vi/${videoCode}/${resolutionName}.jpg`)
    } else {
      return null
    }
  }


  const thumbnailsGen = {
    "maxResDefault": generateThumbnailUrl(vcode, "maxresdefault"),
    "hqDefault": generateThumbnailUrl(vcode, "hqdefault"),
    "mqDefault": generateThumbnailUrl(vcode, "mqdefault"),
    "defaultThumb": generateThumbnailUrl(vcode, "default"),
  }

  const thumbnails = useMemo(() => thumbnailsGen,[vcode]);

  return (
    <div class="block" style={{ maxWidth: "800px" }}>
      <InputForm setVcode={setVcode} />
      <div>
        <DisplayPart data={thumbnails} />
      </div>
    </div>
  );
}