var success = (res, result, stat) => {
    return res.status(stat).send({ status: 200, result })
}

var failure = (res, err, status, result=undefined) => {
    return res.status(status).send({ status, error_message: err, result })
}

module.exports = {
    success,
    failure
}