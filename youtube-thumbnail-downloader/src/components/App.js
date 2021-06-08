import { useState } from 'preact/hooks';
import { InputForm } from './InputForm';
import DisplayPart from './DisplayPart';

export default function App() {
  const [vcode, setVcode] = useState();

  const generateThumbnailUrl = (videoCode, resolutionName) => {
    if (videoCode) {
      return (`https://img.youtube.com/vi/${videoCode}/${resolutionName}.jpg`)
    } 
    return null
  }


  const thumbnails = {
    maxResDefault: generateThumbnailUrl(vcode, "maxresdefault"),
    hqDefault: generateThumbnailUrl(vcode, "hqdefault"),
    mqDefault: generateThumbnailUrl(vcode, "mqdefault"),
    defaultThumb: generateThumbnailUrl(vcode, "default"),
  }


  return (
    <div class="block" style={{ maxWidth: "800px", position: `relative` }}>
      <InputForm setVcode={setVcode} />
      <div>
        <DisplayPart data={thumbnails} />
      </div>
    </div>
  );
}