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

var DeviceTypes = require('../model/DeviceTypes.js');
var test = require('tape');

test('A valid device type', function(t) {
  t.ok(DeviceTypes.validDeviceType('urn:x-nmos:device:generic'),
    'is "urn:x-nmos:device:generic".');
  t.ok(DeviceTypes.validDeviceType('urn:x-nmos:device:pipeline'),
    'is "urn:x-nmos:device:pipeline".');
  t.ok(DeviceTypes.validDeviceType(DeviceTypes.generic),
    'is DeviceType.generic.');
  t.ok(DeviceTypes.validDeviceType(DeviceTypes.pipeline),
    'is DeviceType.pipeline.');
  t.notOk(DeviceTypes.validDeviceType('streampunk'),
    'is not an arbitrary string.');
  t.notOk(DeviceTypes.validDeviceType(),
    'is not no arguments.');
  t.notOk(DeviceTypes.validDeviceType(null),
    'is not a null value.');
  t.notOk(DeviceTypes.validDeviceType(42),
    'is not a number.');
  t.notOk(DeviceTypes.validDeviceType(undefined),
    'is not an undefined value.');
  t.notOk(DeviceTypes.validDeviceType({}),
    'is not an empty object.');
  t.end();
});
