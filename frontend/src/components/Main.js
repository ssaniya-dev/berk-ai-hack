import React, { useState, useEffect, useRef } from 'react';

const Main = () => {
  const [transcript, setTranscript] = useState('');
  const [completeTranscript, setCompleteTranscript] = useState('');
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

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

        recognitionRef.current = recognition;
      })
      .catch((err) => {
        console.error('Error accessing media devices.', err);
      });
  }, []);

  const handleMouseDown = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleMouseUp = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Transcript:', transcript.trim());
      setCompleteTranscript((prevTranscript) => prevTranscript + transcript);
      setTranscript('');
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 items-center justify-center min-h-screen p-4 font-montserrat">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 text-transparent bg-clip-text animate-gradient">
        WhatsUp!
      </h1>
      <div className="border-4 rounded-lg overflow-hidden shadow-lg max-w-4xl max-h-3xl">
        <video
          ref={videoRef}
          autoPlay
          className="w-full h-full object-cover"
        ></video>
      </div>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Push to Talk
      </button>
    </div>
  );
};

export default Main;
