import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageUrl(dataUrl);
      }
    }
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      {!stream && <button onClick={startCamera}>Open Camera</button>}
      {stream && (
        <div>
          <video ref={videoRef} autoPlay />
          <button onClick={stopCamera} className='cancel-button'>Close Camera</button>
          <button onClick={handleCapture} className='button'>Take Picture</button>
        </div>
      )}
      {imageUrl && <img src={imageUrl} alt="Captured" />}
    </div>
  );
};

export default CameraComponent;
