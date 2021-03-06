### WebRTC-Analyzer

This tool helps you to debug WebRTC connections.

##### Current features:

- Able to display any info about the PC track
- Able to display PC statuses (`signalingState`, `iceGatheringState`, `connectionState`, `iceGatheringState`)
- Able to display any info from PC.getStats
- Support for multiple RTCPeerConnection instances
- The debuggers position could be changed by the user. (left, right)
- Reactive component

##### Desired features:

- Able to display `offer` and `answer`
- Able to display the generated ICE Candidates
- User is able to customize what he/she wants to see


![WebRTC-Analyzer](https://i.imgur.com/8eLNbUQ.png)

### How to use

Install with yarn.
```js
yarn add webrtc-analyzer
```

Install with npm.
```js
npm i webrtc-analyzer
```

### Example code

##### Reactive way

```js
import { Analyzer } from "webrtc-analyzer";
<Analyzer peerConnections={[pc1, pc2]} isVisible={true} position="right" />
```


##### Vanilla JS way

```js
import { renderWebRTCAnalyzer } from "webrtc-analyzer";
renderWebRTCAnalyzer({
    peerConnections: [pc1, pc2], //Array - containing RTCPeerConnection instances
    isVisible: true, //Boolean - true by default
    position: 'right' //String - right by default (left | right)
}, '#wa-app') //Select where the component gets rendered to
```

##### Example page
[Example](https://analyzer.webrtc.rocks)

##### Show & Hide

`CTRL` + `H` to toggle


##### Move position

`CTRL` + `W` to toggle

### Version

3.1.1

### Contact

- Gabriel Mičko on [Twitter](https://twitter.com/gabriel_micko), [GitHub](https://github.com/gabrielmicko)