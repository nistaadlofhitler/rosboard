class NumberViewer extends Viewer {
  /**
   * Gets called when Viewer is first initialized.
   * @override
   **/
  onCreate() {
    this.viewerNode = $('<div style="height: 100%; width: 100%;"></div>')
      .css({ 'font-size': '150pt' })
      .appendTo(this.card.content);

    this.valueField = $('<div style="height: 100%; width: 100%;"></div>')
      .addClass('monospace')
      .css({ 
       'overflow': 'visible',
       'text-overflow': 'ellipsis' , 
       'display': 'flex' , 
       'align-items': 'center' , 
       'text-align': 'center' , 
       'justify-content': 'center' })
      .appendTo(this.viewerNode);

    super.onCreate();
  }

  onData(msg) {
    this.card.title.text(msg._topic_name);
    this.valueField.text(msg.data);
  }
}

NumberViewer.friendlyName = "Number";
NumberViewer.supportedTypes = [
  "std_msgs/msg/Bool",
  "std_msgs/msg/Byte",
  "std_msgs/msg/Char",
  "std_msgs/msg/Int8",
  "std_msgs/msg/Int16",
  "std_msgs/msg/Int32",
  "std_msgs/msg/Int64",
  "std_msgs/msg/UInt8",
  "std_msgs/msg/UInt16",
  "std_msgs/msg/UInt32",
  "std_msgs/msg/UInt64",
  "std_msgs/msg/Float32",
  "std_msgs/msg/Float64",
];
NumberViewer.maxUpdateRate = 100.0;
Viewer.registerViewer(NumberViewer);