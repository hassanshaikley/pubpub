//insert into atoms (slug, title, description, "previewImage", type, "isPublished", inactive, "createdAt", "updatedAt") VALUES ('sluggyyyy', 'the title bro', 'description brooo', 'previewImage', 'pub', 'true', 'false', '2001-02-16 20:38:40', '2001-02-16 20:38:40');
var Sequelize = require("sequelize");

process.env.POSTGRES_URI = 'postgres://127.0.0.1:5432/database_test_development'

var sequelize = new Sequelize(process.env.POSTGRES_URI);

// Change to true to update the model in the database.
// NOTE: This will erase your data.
const Sync = function(cb){
  sequelize.sync({force: true}).then(function(err) {
    console.log('It worked!');
    cb();
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });
}

const Journal = sequelize.define('journal', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      // isAlphanumeric: true, // No special characters
      // is: /^.*[A-Za-z]+.*$/, // Must contain at least one letter
    },
  },
  slug: { type: Sequelize.STRING, allowNull: false},
  description: { type: Sequelize.STRING},
  logo: { type: Sequelize.STRING},
  icon: Sequelize.STRING,
  about: Sequelize.TEXT,
  website: Sequelize.STRING,
  twitter: Sequelize.STRING,
  facebook: Sequelize.STRING,
  headerMode: Sequelize.STRING,
  headerAlign: Sequelize.STRING,
  headerImage: Sequelize.STRING,
  // collections: Sequelize.STRING,
  inactive: Sequelize.BOOLEAN,
  inactiveNote: Sequelize.STRING,
  mongoId: Sequelize.STRING,

});

const User = sequelize.define('user', {
  userName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isLowercase: true,
      // isAlphanumeric: true, // No special characters, but we need _
      is: /^.*[A-Za-z_]+.*$/, // Must contain at least one letter
    },
  },
  firstName: { type: Sequelize.STRING, allowNull: false},
  lastName: { type: Sequelize.STRING, allowNull: false},

  email: {
    type: Sequelize.STRING,
    allowNull: false, unique: true,
    validate: {
      // isEmail: true,
    },
  },
  image: { type: Sequelize.STRING, allowNull: false},
  verification_hash: Sequelize.TEXT,
  resetHash: Sequelize.TEXT,
  bio: Sequelize.TEXT,
  salt: {
    type: Sequelize.TEXT,
    allowNull: false
  },
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
  mongoId: Sequelize.STRING,

  }, {
    getterMethods   : {
      fullName       : function()  { return this.firstName + ' ' + this.lastName }
    },
  }
);

const Tag = sequelize.define('tag', {
  title: Sequelize.STRING,
  journal: Sequelize.STRING,
  inactive: Sequelize.BOOLEAN,
  inactive_date: Sequelize.DATE,
  inactive_note: Sequelize.BOOLEAN,
  mongoId: Sequelize.STRING,

});

const Atom = sequelize.define('atom', {
  slug: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false,
    validate: {
      // isLowercase: true,
      // isAlphanumeric: true, // No special characters
      //  is: /^.*[A-Za-z_]+.*$/, // Must contain at least one letter
    },
  },
  title: { type: Sequelize.TEXT, allowNull: false},
  description: { type: Sequelize.STRING},
  previewImage: { type: Sequelize.STRING},
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  customAuthorString: Sequelize.TEXT,
  isPublished: Sequelize.BOOLEAN,
  inactive: Sequelize.BOOLEAN,
  inactiveDate: Sequelize.DATE,
  inactiveNote: Sequelize.STRING,
  mongoId: Sequelize.STRING,

});


const Version = sequelize.define('version', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: Sequelize.TEXT,
  isPublished: Sequelize.BOOLEAN,
  publishDate: Sequelize.DATE,
  mongoId: Sequelize.STRING,
  content: Sequelize.JSON,



});

const Vote = sequelize.define('vote', {
  value: Sequelize.INTEGER, // -1 for downvote, 1 for upvote, this allows easy summing

});

const FollowsUser = sequelize.define('followsuser', {
  mongoId: Sequelize.STRING,
});
const FollowsAtom = sequelize.define('followsatom', {
  mongoId: Sequelize.STRING,
});
const FollowsJournal = sequelize.define('followsjournal', {
  mongoId: Sequelize.STRING,
});


// Not sure this is right. May just require an atom ID.
const Reply = sequelize.define('reply', {
  mongoId: Sequelize.STRING,

});

const Contributor = sequelize.define('contributor', {
  permission: Sequelize.STRING, //ie Author, Editor, Reader, Contributor
  mongoId: Sequelize.STRING,
})

const Role = sequelize.define('role', {
   type: Sequelize.STRING,
 });


const JournalAdmin = sequelize.define('journaladmins', {
  mongoId: Sequelize.STRING,

})

const Feature = sequelize.define('feature', {
  approved: { // this variable isn't necessary if just want to use approvalDate and rejectionDate
    // 0 for submitted, -1 for disapproved, 1 for approved
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  approvalDate: Sequelize.DATE,
  rejectionDate: Sequelize.STRING,
  mongoId: Sequelize.STRING,

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
Atom.belongsTo(User, {as: 'inactiveBy', notNull: true });
// Atom.belongsTo(User,  { foreignKey: { allowNull: false }, as: 'createdBy' }); -- nevermind don't need this, just versiosn need this

Vote.belongsTo(User)
Vote.belongsTo(Atom)

// Contributor.belongsTo(User)
// Contributor.belongsTo(Atom)

FollowsUser.belongsTo(User, {foreignKey: { allowNull: false }, as: 'source'})
FollowsAtom.belongsTo(User, {foreignKey: { allowNull: false }, as: 'source'})
FollowsJournal.belongsTo(User, {foreignKey: { allowNull: false }, as: 'source'})

FollowsUser.belongsTo(User, {as: 'destination'})
FollowsJournal.belongsTo(Journal, {as: 'destination'})
FollowsAtom.belongsTo(Atom, {as: 'destination'})

Atom.hasMany(Contributor) //belongsto
Atom.hasMany(Role)

Role.belongsTo(User)
Role.belongsTo(Atom) //does it belong to an atom or a reply?


Reply.belongsTo(Atom, {as: 'rootReply'})
Reply.belongsTo(Atom, {as: 'parent'})
Reply.belongsTo(Atom, {as : 'source'})
Reply.belongsTo(User)
User.hasMany(Reply)

JournalAdmin.belongsTo(User, {foreignKey: 'createdById'})
JournalAdmin.belongsTo(User, {foreignKey: 'userId'})
JournalAdmin.belongsTo(Journal)

Contributor.belongsTo(User, { foreignKey: 'createdById'})
Contributor.belongsTo(User)
Contributor.belongsTo(Atom)

User.hasMany(Role)

// Tag.belongsTo(Atom, {as: 'parent' });
// Tag.belongsTo(User, {as: 'createdBy' });
// Tag.belongsTo(User, {as: 'publishedBy' });
// Tag.belongsTo(Atom, {as: 'atom' });

// Journal.belongsToMany(JournalAdmin)
// JournalAdmin.hasOne(User, {as: 'admin'})

// Feature.belongsTo(Journal)
// User.hasMany(Featured)
// Journal.hasMany(Feature)

Feature.belongsTo(User, { foreignKey: 'createdById'} )
Feature.belongsTo(Atom)
Feature.belongsTo(Journal)

Atom.hasMany(Feature)

Version.belongsTo(Atom,{ foreignKey: { allowNull: false }})
Atom.hasMany(Version)

const db = {
  Journal: Journal,
  User: User,
  Atom: Atom,
  Version: Version,
  Reply: Reply,
  Role: Role,
  Contributor: Contributor,
  JournalAdmin: JournalAdmin,
  Vote: Vote,
  Sync: Sync,
  Feature: Feature,
  FollowsAtom: FollowsAtom,
  FollowsUser: FollowsUser,
  FollowsJournal: FollowsJournal,

};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
