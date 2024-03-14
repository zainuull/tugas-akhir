'use client';
import Image from 'next/image';
// Icons
import { MdOutlineContentCopy } from 'react-icons/md';
import { useState } from 'react';

const Rekening = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = () => {
    const textToCopy = '0983 XXXX XX'; // Your text to copy

    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);

    // Select the text inside the textarea
    textArea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the textarea element
    document.body.removeChild(textArea);

    // Set copy success state
    setCopySuccess(true);

    // Reset copy success state after 3 seconds
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  return (
    <div className="w-full bg-white h-20 rounded-lg flex items-center justify-center gap-x-3 text-sm xl:text-xs relative">
      <h1>Transfer to: </h1>
      <Image src={'/assets/bca.png'} alt="bca" width={50} height={50} />
      <p className="flex items-center gap-x-1">
        0983 XXXX XX
        <MdOutlineContentCopy
          onClick={handleCopyText}
          size={13}
          className="hover:text-blue-500 transition-all cursor-pointer"
        />
        {copySuccess && <span className="text-green-500 ml-1 absolute top-2 right-4">Copied!</span>}
      </p>
      <p>PT RAVELWARE TECHNOLOGY INDONESIA</p>
    </div>
  );
};

export default Rekening;
