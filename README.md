# node-red-contrib-diff-set

This project contains a <a href="https://nodered.org">Node-RED</a> node which detects changes in an input set of values and emits them as output - similar to Reactive's <a href="http://rxmarbles.com/#distinctUntilChanged">distinctUntilChanged</a> operator.

This can come in handy when you are dealing with a node which generates identical output at a high frequency whereas you are only interested in actual changes in data.

## Installation


### From source

```
git clone https://github.com/stefan-girlich/node-red-contrib-diff-set.git your $TARGET_FOLDER
cd $TARGET_FOLDER
npm install
npm test
cd $YOUR_PROJECT_FOLDER
npm link $TARGET_FOLDER
node-red-stop
node-red-start
# refresh your Node-RED browser tab
```

## Usage

1. Drag in 


## Known limitations
- As the node name points out, this node handles the given arrays of data as _sets_, meaning that changes in order are ignored. For instance, _[1, 2, 3]_ is identical to _[2, 3, 1]_.

## License
MIT License