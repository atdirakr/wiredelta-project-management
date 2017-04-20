var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'tblusers',
   idAttribute: 'userId',
});

// module.exports = {
//    User: User
// };

var Project = DB.Model.extend({
   tableName: 'tblproject',
   idAttribute: 'id',
});

module.exports = {
	User: User,
   	Project: Project
};