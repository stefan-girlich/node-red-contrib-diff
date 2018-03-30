const helper = require('node-red-node-test-helper')
const assert = require('assert')
const diffNode = require('../index')


const assertEquals = (actual, expected, done) => {
    try {
        assert.deepStrictEqual(actual, expected)
    } catch (e) {
        done(e)
        return
    }
    done()
}

describe('set-diff Node-RED node', () => {

    afterEach(() => {
        helper.unload()
    })

    describe('basic functionality', () => {
        it('should be loaded', (done) => {
            const flow = [{ id: 'n1', type: 'set-diff', name: 'test name', emitEmpty: false }]
            helper.load(diffNode, flow, () => {
                var node = helper.getNode('n1')
                assertEquals(node.name, 'test name', done)
            })
        })

        it('should detect all new values as additions when no previous payload stored', (done) => {
            const flow = [
                { id: 'n1', type: 'set-diff', name: 'test name', emitEmpty: false, wires: [['n2']] },
                { id: 'n2', type: 'helper', emitEmpty: false }
            ]

            helper.load(diffNode, flow, () => {
                var n2 = helper.getNode('n2')
                var n1 = helper.getNode('n1')

                n2.on('input', (msg) => {
                    const expected = {
                        add: [1, 2, 3],
                        del: [],
                    }

                    assertEquals(msg.diff, expected, done)
                })

                n1.receive({ payload: [1, 2, 3] })
            })
        })

        it('should detect all additions and deletions compared to a previous payload', (done) => {
            const flow = [
                { id: 'n1', type: 'set-diff', name: 'test name', emitEmpty: false, wires: [['n2']] },
                { id: 'n2', type: 'helper' }
            ]

            helper.load(diffNode, flow, () => {
                var n2 = helper.getNode('n2')
                var n1 = helper.getNode('n1')

                n1.receive({ payload: [1, 2, 3] })

                n2.on('input', (msg) => {
                    const expected = {
                        add: [4, 5],
                        del: [1],
                    }

                    assertEquals(msg.diff, expected, done)
                })

                n1.receive({ payload: [4, 2, 3, 5] })
            })
        })
    })
})
