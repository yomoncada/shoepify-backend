const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const alreadyAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

const canBeHere = (req, res, next)  => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/unathorized')
    }
}

module.exports = {
    alreadyAuthenticated,
    isLoggedIn,
    canBeHere
}