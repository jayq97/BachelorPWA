import { perf } from "../firebaseConfig";

export const MicrophoneOn = (setTranscript, setMicActive) => {
  const microphoneActivationTrace = perf.trace("activate_microphone");
  microphoneActivationTrace.start();

  setMicActive(true);
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const newRec = new recognition();
  newRec.lang = "de-DE";
  newRec.start();

  microphoneActivationTrace.stop();

  newRec.onresult = (event) => {
    const microphoneRecognitionTrace = perf.trace(
      "check_microphone_recognition"
    );
    microphoneRecognitionTrace.start();

    setTranscript(event.results[0][0].transcript);
    setMicActive(false);
    newRec.stop();

    microphoneRecognitionTrace.stop();
  };
};
