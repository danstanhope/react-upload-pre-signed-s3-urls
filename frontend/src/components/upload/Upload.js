import axios from 'axios';
import React from "react";
import { Circle } from "rc-progress";
import Uploady, { useRequestPreSend, useItemProgressListener } from '@rpldy/uploady';
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadButton from '@rpldy/upload-button';

import './Upload.css';

const UploadProgress = () => {
  const progressData = useItemProgressListener() || { completed: 0 };
  const { completed } = progressData;

  return (<div className={completed === 0 ? 'invisible flex flex-row-reverse mb-2 h-25' : "flex flex-row-reverse mb-2 h-25"}>
    <Circle
      className="progress-circle"
      strokeWidth={5}
      strokeColor={completed === 100 ? "#4dc14d" : "#40affd"}
      percent={completed} />
    <span className="px-2 py-2 text-sm text-gray-700">{completed === 100 ? "All done!" : "Uploading..."}</span>
  </div>);
};

const SignedUploadDragAndDrop = () => {
  useRequestPreSend(async ({ items, options }) => {
    const files = items.length > 0 ? items[0] : {};

    let { file } = files;
    let { name, type } = file;

    const response = await axios(
      '<YOUR APIGATEWAY ENDPOINT URL>' +
      new URLSearchParams({
        name,
        type,
      })
    );

    let { data } = response;
    let uploadUrl = data.upload_url;

    return {
      options: {
        destination: {
          url: uploadUrl,
          method: 'PUT',
          headers: {
            'Content-Type': type,
          },
        },
      },
    };
  });

  return (<UploadDropZone
    className="drag-and-drop border-dashed border-2 w-64 h-32 rounded justify-center items-center flex flex-col"
    onDragOverClassName="drag-over">
    <span
      className="block text-gray-600 mb-4">
      Drag and drop your files anywhere or
    </span>
    <UploadButton
      className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" >
      Click To Upload!
    </UploadButton>
  </UploadDropZone>);
};

export default function Upload() {
  return (
    <div className="upload-container">
      <Uploady destination={{}}>
        <UploadProgress />
        <SignedUploadDragAndDrop />
      </Uploady>
    </div>
  );
}
