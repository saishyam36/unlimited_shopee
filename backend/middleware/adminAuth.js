import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
    const {token} = req.headers
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: 'Forbidden: Admins only' })
        }
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token',error })
    }
}

export default adminAuth