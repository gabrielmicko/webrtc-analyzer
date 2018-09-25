import { h, render, rerender } from 'preact';
import Analyzer from './Analyzer';
import CSS from './analyzer.css';

let root = null;
function renderWebRTCAnalyzer(options, appendTo = 'body') {
  root = render(<Analyzer {...options} />, document.querySelector(appendTo), root);
}

var pc1 = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

var pc2 = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

pc1.addEventListener('icecandidate', c => {
  console.log('[pc1] Candidate created.', c);
  if (c.candidate) {
    pc2.addIceCandidate(c.candidate);
  }
});

pc2.addEventListener('icecandidate', c => {
  console.log('[pc2] Candidate created.', c);
  if (c.candidate) {
    pc1.addIceCandidate(c.candidate);
  }
});

navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: true
  })
  .then(mediaStream => {
    try {
      console.log('[local] Got media stream.');
      if (mediaStream && mediaStream.getTracks) {
        let tracks = mediaStream.getTracks();

        if (tracks && tracks.length > 0) {
          tracks.forEach(function(track) {
            console.log('[pc1] Track added.', track);
            pc1.addTrack(track, mediaStream);
          });
        } else {
          console.log('[pc1] No tracks found.');
        }
      } else {
        console.log('[local] Not found getTracks function.');
      }
      console.log('[pc1] Ready 4 action.');
      pc1.createOffer().then(offer => {
        console.log('[pc1] Offer created.', offer);
        pc1.setLocalDescription(offer).then(() => {
          console.log('[pc1] Offer set as local description.');
          pc2.setRemoteDescription(offer).then(() => {
            console.log('[pc2] Offer set as remote description.');
            pc2.createAnswer().then(answer => {
              console.log('[pc2] Answer created.', answer);
              pc2.setLocalDescription(answer).then(() => {
                console.log('[pc2] Answer set as local description.');
                pc1.setRemoteDescription(answer).then(() => {
                  console.log('[pc1] Answer set as remote description.');
                }, console.error);
              }, console.error);
            }, console.error);
          }, console.error);
        }, console.error);
      }, console.error);
    } catch (e) {
      console.log(e);
    }
  }, console.error);

renderWebRTCAnalyzer({
  peerConnections: [pc1, pc2]
});

export { renderWebRTCAnalyzer, Analyzer };
