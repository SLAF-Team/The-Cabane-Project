import jwt_decode from "jwt-decode";
import prisma from './prisma.ts'

export const checkAuth = async (request) => {
  const { authorization } = request.headers
  if (!authorization) {
    return false
  }
  const token = authorization.replace(/^Bearer\s/,"")
    //a faire : verifier la date d'expiration avec exp en faisant un check de la date du token vs Date.now
  const { id } = jwt_decode(token)
  if (!id) {
    return false
  }
  const user = await prisma.user.findUnique({
    where: {id}
  })
  if (!user) {
    return false
  }
  return true
}

