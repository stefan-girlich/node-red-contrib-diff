const _ = require('lodash')

const ADD_KEY = 'add'
const DEL_KEY = 'del'

const createResult = (addedValues, deletedValues) => {
    const result = {}
    result[ADD_KEY] = addedValues || []
    result[DEL_KEY] = deletedValues || []
    return result
}

const normalizeValues = (values) => {
    values = _.cloneDeep(values).sort()
    values = _.uniq(values)
    return values
}

const isNonNullNonArray = (candidate) => {
    return !_.isNull(candidate) && !_.isUndefined(candidate) && !_.isArray(candidate)
}

module.exports = (previousValues, currentValues) => {
    if (isNonNullNonArray(previousValues)) {
        return createResult()
    }

    if (isNonNullNonArray(currentValues)) {
        return createResult()
    }

    if (_.isEmpty(previousValues)) {
        return createResult(currentValues)
    }

    if (_.isEmpty(currentValues)) {
        return createResult([], previousValues)
    }

    previousValues = normalizeValues(previousValues)
    currentValues = normalizeValues(currentValues)

    const addedValues = _.difference(currentValues, previousValues)
    const deletedValues = _.difference(previousValues, currentValues)

    return createResult(addedValues, deletedValues)
}
