import React, { useEffect, useRef } from 'react';

const Main = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: true,
      audio: true,
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err);
      });
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 items-center justify-center min-h-screen p-4 font-montserrat">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 text-transparent bg-clip-text animate-gradient">
        WhatsUp name!
      </h1>
      <div className="border-4 rounded-lg overflow-hidden shadow-lg max-w-4xl max-h-3xl">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full object-cover"
        ></video>
      </div>
      <audio ref={audioRef} autoPlay className="hidden"></audio>
    </div>
  );
};

export default Main;
