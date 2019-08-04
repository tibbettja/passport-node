var success = (res, result, stat) => {
    res.status(stat).send({ status: 200, result })
}

var failure = (res, err, status, result=undefined) => {
    res.status(status).send({ status, error_message: err, result })
}

module.exports = {
    success,
    failure
}