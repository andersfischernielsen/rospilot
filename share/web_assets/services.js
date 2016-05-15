/*
 * Copyright 2012 the original author or authors.
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Copter
{
    static get parameters()
    {
        return [new ng.core.Inject('$rostopic')];
    }

    constructor($rostopic)
    {
        this.rc_channels = $rostopic('/rospilot/rcstate', 'rospilot/RCState')
            .map(message => message.channel);
    }

    getRCChannels()
    {
        return this.rc_channels;
    }
}

class RosParam
{
    static get parameters()
    {
        return [new ng.core.Inject('ROS')];
    }

    constructor(ROS)
    {
        this.ROS = ROS;
    }

    get(key, callback)
    {
        var param = new ROSLIB.Param({ros: this.ROS, name: key});
        param.get(callback);
    }

    set(key, value)
    {
        var param = new ROSLIB.Param({ros: this.ROS, name: key});
        param.set(value);
    }
}
