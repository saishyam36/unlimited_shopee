import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error })
    }
}

export const sseAuthUser = (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.id;
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error })
    }
}

export default authUser
