const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).send('NOT A VALID TOKEN');
      }
      /* IF USER HAS VALID BEARER ACCESS TOCKEN THEN USER ID WILL BE ATTACHED TO REQ */
      req.userid = user.id;
      next();
    });
  } else {
    res.status(401).send('No AUTH HEADER');
  }
};
