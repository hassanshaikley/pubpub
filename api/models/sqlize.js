//insert into atoms (slug, title, description, "previewImage", type, "isPublished", inactive, "createdAt", "updatedAt") VALUES ('sluggyyyy', 'the title bro', 'description brooo', 'previewImage', 'pub', 'true', 'false', '2001-02-16 20:38:40', '2001-02-16 20:38:40');

import fs from 'fs';
var path      = require("path");
var Sequelize = require("sequelize");

var sequelize = new Sequelize(process.env.POSTGRES_URI);

// Change to true to update the model in the database.
// NOTE: This will erase your data.
sequelize.sync({force: true}).then(function(err) {
  console.log('It worked!');
}, function (err) {
  console.log('An error occurred while creating the table:', err);
});

export const Journal = sequelize.define('journal', {
  journalName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isLowercase: true,
      isAlphanumeric: true, // No special characters
      is: /^.*[A-Za-z]+.*$/, // Must contain at least one letter
    },
  },
  slug: { type: Sequelize.STRING, allowNull: false},
  description: { type: Sequelize.STRING},
  logo: { type: Sequelize.STRING, allowNull: false},
  icon: Sequelize.STRING,
  about: Sequelize.STRING,
  website: Sequelize.STRING,
  twitter: Sequelize.STRING,
  facebook: Sequelize.STRING,
  headerMode: Sequelize.STRING,
  headerAlign: Sequelize.STRING,
  headerImage: Sequelize.STRING,
  collections: Sequelize.STRING,
  inactive: Sequelize.BOOLEAN,
  inactiveNote: Sequelize.STRING

});

export const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isLowercase: true,
      isAlphanumeric: true, // No special characters
      is: /^.*[A-Za-z]+.*$/, // Must contain at least one letter
    },
  },
  name: { type: Sequelize.STRING, allowNull: false},
  firstName: { type: Sequelize.STRING, allowNull: false},
  lastName: { type: Sequelize.STRING, allowNull: false},

  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  image: { type: Sequelize.STRING, allowNull: false},
  verification_hash: Sequelize.TEXT,
  resetHash: Sequelize.TEXT,
  bio: Sequelize.TEXT,
  salt: Sequelize.STRING,
  publicEmail: Sequelize.STRING,
  github: Sequelize.STRING,
  orcid: Sequelize.STRING,
  twitter: Sequelize.STRING,
  website: Sequelize.STRING,
  googleScholar: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  verifiedEmail: Sequelize.BOOLEAN,
  resetHashExpiration: Sequelize.DATE,
  registerDate: Sequelize.DATE,
  sendNotificationDigest: Sequelize.BOOLEAN,

});

export const Tag = sequelize.define('tag', {
  title: Sequelize.STRING,
  journal: Sequelize.STRING,
  inactive: Sequelize.BOOLEAN,
  inactive_date: Sequelize.DATE,
  inactive_note: Sequelize.BOOLEAN,
});

export const Atom = sequelize.define('atom', {
  slug: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false,
    validate: {
      isLowercase: true,
      isAlphanumeric: true, // No special characters
      // is: /^.*[A-Za-z]+.*$/, // Must contain at least one letter
    },
  },
  title: { type: Sequelize.STRING, unique: true, allowNull: false},
  description: { type: Sequelize.STRING},
  previewImage: { type: Sequelize.STRING},
  type: Sequelize.STRING,
  customAuthorString: Sequelize.STRING,
  isPublished: Sequelize.BOOLEAN,
  inactive: Sequelize.BOOLEAN,
  inactiveDate: Sequelize.DATE,
  inactiveNote: Sequelize.STRING,
});

export const Link = sequelize.define('link', {
  type: Sequelize.STRING,
  inactive: Sequelize.BOOLEAN,
  inactiveDate: Sequelize.DATE,
  inactiveNote: Sequelize.STRING,
  source: Sequelize.STRING,
  destination: Sequelize.STRING
});

// Link.hasMany(Roles, {as: 'roles' });

export const Notification = sequelize.define('notification', {
  type: Sequelize.STRING,
  journal : Sequelize.STRING,
  read: Sequelize.BOOLEAN,
  emailSent: Sequelize.BOOLEAN,
  sourceHost : Sequelize.STRING,

});




export const Version = sequelize.define('version', {
  type: Sequelize.STRING,
  message: Sequelize.STRING,
  isPublished: Sequelize.BOOLEAN,
  publishDate: Sequelize.DATE,
});


export const Vote = sequelize.define('vote', {
  vote: Sequelize.INTEGER, // -1 for downvote, 1 for upvote, this allows easy summing
});

export const Follows = sequelize.define('follows', {
});

// Not sure this is right. May just require an atom ID.
export const Reply = sequelize.define('reply', {
  content: Sequelize.STRING
});

// Journals have several Users with several roles
export const Role = sequelize.define('role', {
  type: Sequelize.STRING, //ie Author, Editor, Reader, Contributor
})

export const JournalAdmins = sequelize.define('journaladmins', {

})

export const Submitted = sequelize.define('submitted', {
  approved: { // this variable isn't necessary if just want to use approvalDate and rejectionDate
    // 0 for submitted, -1 for disapproved, 1 for approved
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  approvalDate: Sequelize.DATE,
  rejectionDate: Sequelize.STRING,
})



// Link.belongsTo(User, {
//   as: 'links',
//   onDelete: "CASCADE",
//   foreignKey: { allowNull: false }
// });
// User.hasMany(Link, {as: 'links', onDelete: "CASCADE", foreignKey: { allowNull: false } });
// User.belongsToMany(User, { onDelete: "CASCADE", as: 'following', through: 'Follow', foreignKey: 'follower' })
// User.belongsToMany(User, { onDelete: "CASCADE", as: 'followers', through: 'Follow', foreignKey: 'followee' })

Tag.belongsTo(User, {as: 'inactiveBy' });
Atom.belongsTo(User, {as: 'inactiveBy' });

Link.belongsTo(User, {as: 'createdBy' });
Link.belongsTo(User, {as: 'inactiveBy' });
Link.hasMany(Tag, {as: 'collections' });
Link.hasMany(Atom, {as: 'rootReply' });

Vote.belongsTo(User)
Vote.belongsTo(Atom)

Follows.belongsTo(User)
Follows.belongsTo(User, {as: 'destinationUser'})
Follows.belongsTo(Journal, {as: 'destinationJournal'})
Follows.belongsTo(Atom, {as: 'destinationAtom'})

Role.hasOne(User)
Atom.hasMany(Contirbutor)

Notification.belongsTo(Atom, {as: 'pub' });
Notification.belongsTo(User, {as: 'sender' });
Notification.belongsTo(User, {as: 'recipient' });
// Role.belongsTo(Link, {as: 'role'})
Tag.belongsTo(Atom, {as: 'parent' });
Tag.belongsTo(User, {as: 'createdBy' });
Tag.belongsTo(User, {as: 'publishedBy' });
Tag.belongsTo(Atom, {as: 'atom' });

Reply.belongsTo(Atom, {as: 'reply'})
User.hasMany(Reply, {as: 'replies'})

Journal.hasMany(JournalAdmin)
JournalAdmin.hasOne(User, {as: 'admin'})

Submitted.belongsTo(Journal)
User.hasMany(Submitted)

export function getAtomDataPG() {
  console.log("getting Atom data ok")
  Atom.find({
    where: {
      id: 1
    }
  }
).then(function(atomData){
    console.log(atomData)
    return atomData;
  }).catch(function(error){
    console.log(error)
  })
}


// const db = {
//   Journal: Journal,
//   Atom: Atom,
//   Link: Link,
//   Tag: Tag,
//   Notification: Notification,
//   User: User,
//   // Follow: Follow,
// };

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
