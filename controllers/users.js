const User = require("../models/user");

// Below is used for encrypting password
const CryptoJS = require('crypto-js');
const encryptWithAES = (text) => {
  var passphrase = process.env.SALT || '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
// End of encryption

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {user: req.session.user});
  },

  Create: (req, res) => {
    const user = new User({email: req.body.email, password: encryptWithAES(req.body.password),
                          first_name: req.body.first_name,
                          last_name: req.body.last_name,
                          dob: req.body.dob,
                          gender: req.body.gender,
                          home_town: req.body.home_town,
                          bio: req.body.bio,
         });
    user.save((err) => {
      if (err) {
        if (err.name === "ValidationError") {
          res.status(409).send("Email already in use");
        } else {
          res.status(400).send("Oops, something went wrong!");
        }
      } else {
        req.session.user = user;
        res.status(201).redirect(`/users/${user.email}` );
      }
    });
  },

  Display: (req, res, next) => {

    const email = req.params.email

    User.findOne({email: email})
    .exec()
    .then(doc => {
        res.render('users/profile', {
            profile: doc,
            user: req.session.user
        });
    })
  },

  Update: (req, res) => {
    if (req.params.email === req.session.user.email) {
      res.render("users/profile/edit", { user: req.session.user })
    } else {
      res.redirect(`/users/${req.params.email}`)
    }
  },

  UpdateDetails: (req, res) => { 
    Object.keys(req.body).forEach((k) =>req.body[k] == '' && delete req.body[k]);
    User.findByIdAndUpdate({_id: req.session.user._id},
      req.body
    ).exec((err, post) => {
      if (err) res.json(err);
      else {
        User.findOne({ email: req.session.user.email }).then((user) => {
          req.session.user = user,
          res.status(201).redirect(`/users/${req.session.user.email}`)
        })
      };
    })
  }
};

module.exports = UsersController;



