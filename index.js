const PREV_SET_KEY = 'node-red-contrib-set-diff_previous_set_of_values'
const CHANGES_PROPERTY = 'diff'

const diff = require('./lib/set-diff')

module.exports = (RED) => {
    function detectChangesInValues(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', (msg) => {
            const context = node.context()
            const prevSet = context.get(PREV_SET_KEY)
            const currSet = msg.payload

            const changes = diff(prevSet, msg.payload)
            msg[CHANGES_PROPERTY] = changes

            context.set(PREV_SET_KEY, currSet)
            node.send(msg)
        });
    }
    RED.nodes.registerType('set-diff', detectChangesInValues)
}
