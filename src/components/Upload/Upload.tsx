import clsx from 'clsx';
import React, { useState } from 'react';

export interface UploadProps {
  className?: string;
  upload: (file: string) => Promise<string>;
}

export const Upload: React.FC<UploadProps> = ({ className, upload }) => {
  const [preview, setPreview] = useState({
    data: '',
    name: ''
  });

  const handleEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const [file] = e.target.files || e.dataTransfer.files;

    if (!file) return;
    uploadFile(file);
  };

  function uploadFile(file: any) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      const fileRes = btoa(reader.result as string);
      const data = `data:image/jpg;base64,${fileRes}`;
      setPreview({
        data,
        name: file.name
      });
      upload(data);
    };

    reader.onerror = () => {
      setPreview({
        data: '',
        name: ''
      });
    };
  }
  return (
    <div
      className={clsx('ui-relative ui-flex ui-justify-center ui-items-center ui-w-full', className)}
      onDragEnter={(e) => handleEnter(e)}
      onDragLeave={(e) => handleLeave(e)}
      onDragOver={(e) => handleOver(e)}
      onDrop={(e) => handleUpload(e)}
    >
      <label
        className='ui-flex ui-flex-col ui-justify-center ui-items-center ui-w-full ui-h-64 ui-bg-gray-50 ui-rounded-lg ui-border-2 ui-border-gray-300 ui-border-dashed ui-cursor-pointer dark:hover:ui-bg-bray-800 dark:ui-bg-gray-700 ui-hover:ui-bg-gray-100 dark:ui-border-gray-600 dark:hover:ui-border-gray-500 dark:hover:ui-bg-gray-600'
        htmlFor='dropzone'
      >
        <div className='ui-flex ui-flex-col ui-justify-center ui-items-center ui-pt-5 ui-pb-6'>
          <svg
            aria-hidden='true'
            className='ui-mb-3 ui-w-10 ui-h-10 ui-text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
          <p className='ui-mb-2 ui-text-sm ui-text-gray-500 dark:ui-text-gray-400'>
            <span className='font-semibold'>Click to upload</span> or drag and drop
          </p>
          <p className='ui-text-xs ui-text-gray-500 dark:ui-text-gray-400'>SVG, PNG, JPG or GIF</p>
        </div>
        <input
          accept='image/*'
          className='ui-hidden'
          id='dropzone'
          type='file'
          onChange={(e) => handleUpload(e)}
        />
        {preview.data && (
          <div className='ui-absolute ui-pr-8 ui-w-full ui-bottom-4 ui-left-4 ui-overflow-hidden ui-flex ui-items-center'>
            <img
              alt='preview'
              className='ui-w-12 ui-h-12 ui-object-cover ui-rounded-full ui-mr-2'
              src={preview.data}
            />
            <span className='ui-flex-1 ui-truncate ui-text-white'>{preview.name}</span>
          </div>
        )}
      </label>
    </div>
  );
};
