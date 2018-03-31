# node-red-contrib-diff-set

This project contains a <a href="https://nodered.org">Node-RED</a> node which detects changes in an input set of values and emits them as output - similar to Reactive's <a href="http://rxmarbles.com/#distinctUntilChanged">distinctUntilChanged</a> operator or Node-RED's own <a href="https://flows.nodered.org/node/node-red-node-rbe">_RBE_</a> node. Other than those two, this node makes the changes in the given set of values visible.

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


## Known limitations
- As the node name points out, this node handles the given arrays of data as _sets_, meaning that changes in order are ignored. For instance, _[1, 2, 3]_ is identical to _[2, 3, 1]_.
- Currently, equality and differences between values in the set are determined by <a href="https://www.ecma-international.org/ecma-262/6.0/#sec-samevaluezero">SameValueZero</a>, but do not detect true value equality in complex JavaScript objects. E. g. _"bar" === "bar"_, but _{foo:"bar"} !== {foo:"bar"}_

## License
MIT License