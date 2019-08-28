var success = (res, result, status) => {
    return res.status(200).send({ status, result })
}

var failure = (res, err, status, result=undefined) => {
    return res.status(200).send({ status, error_message: err, result })
}

module.exports = {
    success,
    failure
}