'use strict'

const assert = require('assert')
const diff = require('../lib/diff-set')

const EMPTY_RESULT = {
    add: [],
    del: [],
}

describe('diff-set', () => {

    describe('missing and empty values ', () => {

        it('should detect complete deletion if there is no new set of values', () => {
            const result = diff([1, 2, 3], null)
            const expected = {
                add: [],
                del: [1, 2, 3],
            }

            assert.deepEqual(result, expected)
        })

        it('should detect complete deletion if there is an empty new set of values', () => {
            const result = diff([1, 2, 3], [])
            const expected = {
                add: [],
                del: [1, 2, 3],
            }

            assert.deepEqual(result, expected)
        })

        it('should detect complete addition if there is no previous set of values', () => {
            const result = diff(null, [1, 2, 3])
            const expected = {
                add: [1, 2, 3],
                del: [],
            }

            assert.deepEqual(result, expected)
        })

        it('should detect complete addition if there is an empty previous set of values', () => {
            const result = diff([], [1, 2, 3])
            const expected = {
                add: [1, 2, 3],
                del: [],
            }

            assert.deepEqual(result, expected)
        })
    })

    describe('non-array values ', () => {

        it('should detect nothing if previous set is non-null non-array', () => {
            const result = diff('not an array!', [1, 2, 3])
            assert.deepEqual(result, EMPTY_RESULT)
        })

        it('should detect nothing if new set is non-null non-array', () => {
            const result = diff([1, 2, 3], 'also not an array!')
            assert.deepEqual(result, EMPTY_RESULT)
        })
    })

    describe('value differences ', () => {

        it('should detect added values', () => {
            const result = diff([2, 1], [1, 2, 3, 4])
            const expected = {
                add: [3, 4],
                del: [],
            }

            assert.deepEqual(result, expected)
        })

        it('should detect deleted values', () => {
            const result = diff([4, 2, 1, 3], [1, 2, 3])
            const expected = {
                add: [],
                del: [4],
            }

            assert.deepEqual(result, expected)
        })

        it('should detect added and deleted values', () => {
            const result = diff([4, 2, 1, 3], [1, 5])
            const expected = {
                add: [5],
                del: [2, 3, 4],
            }

            assert.deepEqual(result, expected)
        })
    })

    describe('duplicate prevention', () => {
        it('should treat multiple occurences of a value as a single value', () => {
            const result = diff([1, 1, 2, 2], [2])
            const expected = {
                add: [],
                del: [1],
            }

            assert.deepEqual(result, expected)
        })
    })

})
