import { CopyWithIcon } from './CopyButton';
import { memo } from 'preact/compat';

export const CopyButtonX = ({ copied, copyToClipboard, isMobile }) => {

  const copyButtonStyles = {
    minWidth: isMobile ? 80 : 170,
    cursor: "pointer",
    marginRight: "1.25rem"
  };

  return <button
    style={copyButtonStyles}
    disabled={copied}
    onClick={() => copyToClipboard()}
    class="button is-link p-2">
    {copied ? "Copied" : <CopyWithIcon>{isMobile ? "Copy" : "Copy to clipboard"}</CopyWithIcon>}
  </button>;
};

export const MemoedCopyButton = memo(CopyButtonX, (prevProps, nextProps) => {
  // Only re-render when `copied' changes
  return prevProps.copied === nextProps.copied && prevProps.isMobile === nextProps.isMobile;
});
