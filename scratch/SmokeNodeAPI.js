/* Copyright 2016 Streampunk Media Ltd.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Run a demonstration node

var NodeAPI = require('../api/NodeAPI.js');
var NodeRAMStore = require('../api/NodeRAMStore.js');
var Node = require('../model/Node.js');
var Device = require('../model/Device.js');
var Source = require('../model/Source.js');
var Flow = require('../model/Flow.js');
var Sender = require('../model/Sender.js');
var Receiver = require('../model/Receiver.js');
var formats = require('../model/Formats.js');
var transports = require('../model/Transports.js');

var node = new Node(null, null, "Punkd Up Node", "http://tereshkova.local:3000",
  "tereshkova");
var store = new NodeRAMStore(node);

var nodeAPI = new NodeAPI(3000, store);

nodeAPI.init().start();

var device = new Device(null, null, "Dat Punking Ting", null, node.id);

var videoSource = new Source(null, null, "Noisy Punk", "Will you turn it down!!",
  formats.video, null, null, device.id);

var audioSource = new Source(null, null, "Garish Punk", "What do you look like!!",
  formats.audio, null, null, device.id);

var audioFlow = new Flow(null, null, "Funk Punk", "Blasting at you, punk!",
  formats.audio, null, audioSource.id);

var videoFlow = new Flow(null, null, "Junk Punk", "You looking at me, punk?",
  formats.video, null, videoSource.id);

var audioSender = new Sender(null, null, "Listen Up Punk",
  "Should have listened to your Mother!", audioFlow.id,
  transports.rtp_mcast, device.id, "http://tereshkova.local/audio.sdp");

var videoSender = new Sender(null, null, "In Ya Face Punk",
  "What do you look like?", videoFlow.id,
  transports.rtp_mcast, device.id, "http://tereshkova.local/video.sdp");

var audioReceiver = new Receiver(null, null, "Say It Punk?",
  "You talking to me?", formats.audio, null, null, device.id,
  transports.rtp_mcast);

var videoReceiver = new Receiver(null, null, "Watching da Punks",
  "Looking hot, punk!", formats.video, null, null, device.id,
  transports.rtp_mcast);

function putRes(res) {
  return function () { return nodeAPI.putResource(res); };
}

nodeAPI.putResource(device)
.then(putRes(videoSource))
.then(putRes(audioSource))
.then(putRes(videoFlow))
.then(putRes(audioFlow))
.then(putRes(videoSender))
.then(putRes(audioSender))
.then(putRes(videoReceiver))
.then(putRes(audioSender))
.catch(console.error.bind(null, 'Failed to register resources:'))
.done(function() { console.log('Demo registration complete.'); });
