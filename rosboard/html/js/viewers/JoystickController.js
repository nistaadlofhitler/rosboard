"use strict";

class JoystickController extends Viewer {
  /**
    * Gets called when Viewer is first initialized.
    * @override
  **/
  onCreate() {
    this.viewer = $('<div  ></div>')
      .css({'font-size': '11pt'
    , "filter": "invert(100%) saturate(50%)" ,
      'height': '250px'
    })
      .appendTo(this.card.content);

    this.joyId = "joy-" + Math.floor(Math.random()*10000);
    this.joy = $('<div id="' + this.joyId + '"></div>')
      .css({
        "height": "250px",
      })
      .appendTo(this.viewer);


    this.coordinatesDisplay = $('<div></div>')
      .css({
        'font-size': '30px',
        'color': 'white',
        'margin-top': '10px',
        
      })
      .appendTo(this.viewer);

    // Update the display with initial values
    this.updateCoordinatesDisplay(0, 0, 0);


    var options = {
        zone: document.getElementById(this.joyId),
        mode: 'semi',
        color: 'blue', 
        size: 150,
        catchDistance: 300,
    };
    var manager = nipplejs.create(options);
    manager.on('start', function(evt, data) {
      let joystickX = 0.0;
      let joystickY = 0.0;
      currentTransport.update_joy({joystickX, joystickY});
    }).on('end', function(evt, data) {
      let joystickX = 0.0;
      let joystickY = 0.0;
      currentTransport.update_joy({joystickX, joystickY});
    }).on('move', function(evt, data) {
      let radian = data['angle']['radian'];
      let distance = data['distance'];
      let joystickX = Math.max(Math.min(Math.cos(radian)/75*distance, 1), -1);
      let joystickY = -1*Math.max(Math.min(Math.sin(radian)/75*distance , 1), -1);
      currentTransport.update_joy({joystickX, joystickY});
    });
  }
  updateCoordinatesDisplay(x, y, z) {
    this.coordinatesDisplay.html(`Linear Velocity: ${x.toFixed(2)}<br>Angular Velocity: ${z.toFixed(2)}`);
  }

  onData(msg) {
    this.card.title.text(msg._topic_name);
    const xCoordinate = msg.linear.x; 
    const yCoordinate = msg.linear.y; // Replace 'y' with the actual field name in the message
    const zCoordinate = msg.angular.z; // Replace 'z' with the actual field name in the message

    this.updateCoordinatesDisplay(xCoordinate, yCoordinate, zCoordinate);
  }
}

JoystickController.friendlyName = "JoystickController";

JoystickController.supportedTypes = [
  "geometry_msgs/msg/Twist",
];

JoystickController.maxUpdateRate = 10.0;

Viewer.registerViewer(JoystickController);