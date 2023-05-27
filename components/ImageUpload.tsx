import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaWindowClose } from 'react-icons/fa';

interface ImageUploadProps {
  onChange: (base64: any) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    disabled: disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-500 cursor-pointer hover:border-neutral-400 transition-colors duration-300',
        })}
      >
        <input {...getInputProps()} />
        {base64 ? (
          <div className='flex items-center justify-center'>
            <Image src={base64} height='100' width='100' alt='Upload Image' />
          </div>
        ) : (
          <p className='text-white'>{label}</p>
        )}
      </div>
      {base64 !== '' && (
        <span
          className='text-neutral-500 hover:text-red-700 text-center transition-colors duration-300 cursor-pointer flex items-center justify-center gap-1'
          onClick={() => {
            setBase64('');
            handleChange('');
          }}
        >
          <FaWindowClose />
          <span>Remove Image</span>
        </span>
      )}
    </>
  );
};

export default ImageUpload;
