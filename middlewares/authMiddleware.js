import jwt from 'jsonwebtoken'

const isUserLoggedIn = async (req, res, next) => {
    try {
        let bearer = req.headers['authorization'];

        if (!bearer) {
            return res.status(400).json({
                success: false,
                message: "login is needed"
            })
        }

        if (bearer.charAt(0) == 'B') bearer = bearer.split(' ')[0];

        const verified = await jwt.verify(bearer, process.env.SECRET);

        if (!verified) {
            return res.status(400).json({
                success: false,
                message: "token invalid"
            })
        }

        next();

    } catch (error) {
        console.log("error while checking user")
        console.log(error)
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}


export { isUserLoggedIn }