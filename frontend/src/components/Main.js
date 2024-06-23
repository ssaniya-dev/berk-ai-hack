import React, { useState, useEffect, useRef } from 'react';

const Main = () => {
  const [transcript, setTranscript] = useState('');
  const videoRef = useRef(null);

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

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error('Browser does not support Speech Recognition API');
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptSegment = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setTranscript((prevTranscript) => prevTranscript + transcriptSegment + ' ');
            } else {
              interimTranscript += transcriptSegment;
            }
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error detected: ' + event.error);
        };

        recognition.onend = () => {
          console.log('Speech recognition service disconnected');
        };

        recognition.start();
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
      <div className="text-white mt-4">
        <h2 className="text-xl font-bold">Transcript:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default Main;
