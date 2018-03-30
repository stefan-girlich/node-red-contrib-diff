const PREV_SET_KEY = 'node-red-contrib-diff-set_previous_set_of_values'
const CHANGES_PROPERTY = 'diff'

const diff = require('./lib/diff-set')

module.exports = (RED) => {
    function detectChangesInValues(config) {
        RED.nodes.createNode(this, config);

        const emitEmpty = !!config.emitEmpty

        var node = this;

        node.on('input', (msg) => {
            const context = node.context()
            const prevSet = context.get(PREV_SET_KEY)
            const currSet = msg.payload

            const changes = diff(prevSet, msg.payload)
            msg[CHANGES_PROPERTY] = changes

            context.set(PREV_SET_KEY, currSet)

            const changesAreEmpty = changes.add.length == 0 && changes.del.length == 0
            if (!emitEmpty && changesAreEmpty) {
                return
            }

            node.send(msg)
        });
    }
    RED.nodes.registerType('diff-set', detectChangesInValues)
}
