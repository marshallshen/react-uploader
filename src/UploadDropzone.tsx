import { UploaderInterface, UploadWidgetResult, UploadWidgetConfig } from "uploader";
import React, { useLayoutEffect } from "react";
import { useElementRef } from "./Utils";

interface Props {
  height?: string;
  onComplete?: (files: UploadWidgetResult[]) => void;
  onUpdate?: (files: UploadWidgetResult[]) => void;
  options?: UploadWidgetConfig;
  uploader: UploaderInterface;
  width?: string;
}

export const UploadDropzone = ({ uploader, options, onComplete, onUpdate, width, height }: Props): JSX.Element => {
  const [element, elementRef] = useElementRef();

  useLayoutEffect(() => {
    if (element !== undefined) {
      const onUpdateParams: UploadWidgetConfig = onUpdate === undefined ? {} : { onUpdate };

      uploader
        .open({
          ...options,
          ...onUpdateParams,
          container: element,
          layout: "inline"
        })
        .then(
          files => {
            if (onComplete !== undefined) {
              onComplete(files);
            }
          },
          error => console.error("Uploader error.", error)
        );
    }
  }, [element]);

  return (
    <div
      ref={elementRef}
      style={{
        position: "relative",
        width: "100%",
        minWidth: "280px",
        maxWidth: width ?? "600px",
        height: height ?? "375px"
      }}
    />
  );
};
