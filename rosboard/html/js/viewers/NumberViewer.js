class NumberViewer extends Viewer {
  /**
   * Gets called when Viewer is first initialized.
   * @override
   **/
  onCreate() {
    this.viewerNode = $('<div></div>')
      .css({ 'font-size': '11pt' })
      .appendTo(this.card.content);

    this.valueField = $('<div></div>')
      .addClass('monospace')
      .css({ 'overflow': 'hidden', 'text-overflow': 'ellipsis' })
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
