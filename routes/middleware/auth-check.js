//This middleware protects endpoints from unauthorized access 
//Automatically redirects back to logged in


module.exports = (req, res, next) => {
    if(!req.user){
        //If User not logged in it redirects the response back to login with github.
        res.redirect('../../auth/login')
    }else {
        //Contitnue to the next handlers

        next()
    }
}