import { useState } from 'preact/hooks';
import { copyTextToClipboard } from '../copyToClipboard';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { RibbonTopLeft } from './RibbonTopLeft';
import { useMediaQuery } from 'react-responsive';
import { MemoedCopyButton, CopyButtonX } from "./CopyButtonX";

export function ResultBox({ ribbonProperties, ...props }) {
    const [copied, setCopied] = useState(false);
    const [flash, setFlash] = useState(false);

    const isMobile = useMediaQuery({
        query: '(max-device-width: 768px)'
    });


    const copyToClipboard = () => {
        copyTextToClipboard(props.children);
        setCopied(true);
        setFlash(true);
        setTimeout(() => { setCopied(false); }, 500);
        setTimeout(() => { setFlash(false); }, 200);
    };

    const pstyle = {
        overflowWrap: "anywhere",
        transition: "background-color 200ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        whiteSpace: "break-spaces",
        lineHeight: 1.4,
        padding: "8px",
        fontSize: "20px",
    };

    return (
        <div style="padding: 0" class="box is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center is-relative">

            {ribbonProperties && <RibbonTopLeft color={ribbonProperties.color}>{ribbonProperties.label}</RibbonTopLeft>}


            <div class="is-relative" style={{ fontFamily: "auto", height: "auto" }}>
                <div class="mb-0" style="padding: 1.25rem">
                    <p style={{ ...pstyle, backgroundColor: (flash ? "#cce6ff" : "white") }} background class="mr-3 ml-4">
                        {props.children}
                    </p>
                </div>
            </div>


            <div class="level">
                <CopyButtonX copied={copied} copyToClipboard={copyToClipboard} isMobile={isMobile} />
            </div>
        </div>
    );
}
