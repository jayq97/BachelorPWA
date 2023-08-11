import { perf } from "../firebaseConfig";

export const MicrofonOn = (transcriptRef, setMicActive) => {
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const newRec = new recognition();
  newRec.lang = "de-DE";

  const microphoneActivationTrace = perf.trace("microphone_activation");
  microphoneActivationTrace.start();

  newRec.start();

  microphoneActivationTrace.stop();

  newRec.onresult = (event) => {
    const microphoneRecognitionTrace = perf.trace("microphone_recognition");
    microphoneRecognitionTrace.start();

    transcriptRef.current = event.results[0][0].transcript;
    setMicActive(false);
    newRec.stop();

    microphoneRecognitionTrace.stop();
  };
};