# Toolsy
A wordpress website featuring small apps built in preact (pretty much the same API as React, with a few extra and few missing features). The choice was made mainly due to tiny bundle size (preact doesn't have a SyntheticEvent wrapper but uses native addEventListener instead).

## Live Version
**:link: [Click here to visit Toolsy.dev](https://toolsy.dev/)**


## Tech Stack
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="21px" height="21px"></a> Javascript  
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="21px" height="21px"></a> CSS  
<a href="https://www.w3.org/TR/html5/" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="21px" height="21px"></a> HTML  
<a href="https://preactjs.com/" title="Preact"><img src="https://github.com/get-icon/geticon/raw/master/icons/preact.svg" alt="Preact" width="21px" height="21px"></a> Preact  
<a href="https://wordpress.org/" title="WordPress"><img src="https://github.com/get-icon/geticon/raw/master/icons/wordpress-icon.svg" alt="WordPress" width="21px" height="21px"></a> WordPress  
<a href="https://php.net/" title="PHP"><img src="https://github.com/get-icon/geticon/raw/master/icons/php.svg" alt="PHP" width="21px" height="21px"></a> PHP  

## A sneak peek at some of the tools
### Keyword Stuffing Checker
This tool checks the keyword density on the page you enter. It then estimates and highlights suspicious keywords that might be unnaturally overused. It uses a dedicated API endpoint and **backend built in Django**.

**:link: [Try it out here](https://toolsy.dev/tools/seo/keyword-stuffing-checker/)**
  
<kbd>![keyword-stuffing-checker](https://user-images.githubusercontent.com/49352605/146639610-5b616f10-5d3f-442b-a05d-f48f0db71316.png)</kbd>

---

### Youtube Tags Generator
This tool suggests you tags to include in your youtube tags, based on a seed keyword. This **tool calls google autocomplete API directly** from user's browser.

**:link: [Try it out here](https://toolsy.dev/tools/youtube/youtube-tags-generator/)**
  
<kbd>![youtube-tags-generator](https://user-images.githubusercontent.com/49352605/146640199-be5553b2-226f-43c8-8000-b4bebe558793.png)</kbd>

---

### Youtube Thumbnail Downloader
This tool allows you to download thumbnails of a youtube video easily. To resolve cors issues with file downloading, it uses a **serverless cloudflare worker** as a proxy. The proxy is not authenticated in any way, but uses a whitelist that only allows it to be used on youtube img urls, greatly reducing it potential misuse.  

**:link: [Try it out here](https://toolsy.dev/tools/youtube/youtube-thumbnail-downloader/)**
  
<kbd>![youtube-thumbnail-downloader](https://user-images.githubusercontent.com/49352605/146640538-90dcccaa-3bc1-483e-81e1-fec9651336c8.png)</kbd>

## Get in Touch With me
🔗 Check out my [portfolio](https://petersmid.com)  
💬 [Contact me](https://petersmid.com/#contact)
