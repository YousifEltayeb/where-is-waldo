import passport from 'passport';
import { prisma } from './prismaClient';
import passportJWT from 'passport-jwt';

import 'dotenv/config';

const SECRET = process.env.SECRET;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
if (SECRET) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  };
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const round = await prisma.round.findUnique({
          where: {
            id: jwt_payload.user.id,
          },
        });
        if (round) {
          return done(null, round);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
}
