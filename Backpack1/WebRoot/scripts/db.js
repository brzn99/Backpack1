function hello()
{
	
	alert("hello");
 
}



function openDB() {

	if (!window.openDatabase) // Check browser is supported SQLite or not.
	{
		alert('Databases are NOT supported in this browser.');

	} else {
		alert('Databases are supported in this browser.');
		var db = openDatabase('billr_db', '1.0', 'my first database',
				2 * 1024 * 1024);
		alert('Databases opened.');
		return db;
	}

}

function createTables(db) {

	//alert('createTables called=' + db);
	db.transaction(function(tx) {
		try {
			tx.executeSql('CREATE TABLE foo (id, text)');
			//alert('table foo created.');
		} catch (err) {
			alert(err);
		}
	});
	db.transaction(function(tx) {
		try {
			// insertRows(db);
		} catch (err) {
			alert(err);
		}
	});
}

function insertRows(db) {

	//alert('insert rows called.');
	db.transaction(function(tx) {
		tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "synergies")');
		// tx.executeSql("COMMIT",[]);
	//	alert('row created.');
		tx.executeSql('SELECT * FROM foo', [], function(tx, results) {
			var len = results.rows.length, i;
			alert("len=" + len);
			for (i = 0; i < len; i++) {
				alert(results.rows.item(i).text);
			}
		});
	});
}

function insertSemester(semester) {

//	alert('insert semester called=' + semester);
	var db = openDB();
	db.transaction(function(tx) {
		try {
			id = 1;
			// tx.executeSql('INSERT INTO foo (id, text) VALUES (1,
			// '+semester+')');
			tx.executeSql('INSERT into foo (id, text) VALUES (?, ?);', [ id,
					semester ]);
		//	alert('row created.');
			tx.executeSql('SELECT * FROM foo', [], function(tx, results) {
				var len = results.rows.length;
			//	alert("len=" + len);
				for (i = 0; i < len; i++) {
				//	alert(results.rows.item(i).text);
				}

			});
		} catch (err) {
			alert(err);
		}
	});
}

function initDB() {
	
	//alert("init db");
	var db;
	
	try {

		if (!window.openDatabase) {

			alert('not supported');

		} else {

			var shortName = 'backpack2';

			var version = '1.0';

			var displayName = 'Backpack Database';

			var maxSize = 65536; // in bytes
			
			db = openDatabase(shortName, version, displayName, maxSize);
			
		}

	} catch (e) {

		alert("db error="+e);

		if (e == 2) {

			// Version number mismatch.

			alert("Invalid database version.");

		} else {

			alert("Unknown error " + e + ".");

		}

		return db;

	}

	//alert(db);
	return db;

}
function createTBackpackTables(db)

{
	//alert("create semester table.");
	db
			.transaction(

			function(transaction) {

				/*
				 * The first query causes the transaction to (intentionally)
				 * fail if the table exists.
				 */
				try {
					transaction
							.executeSql(
									'CREATE TABLE semester(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, sname TEXT NOT NULL DEFAULT "Semester not defined", theSession TEXT NOT NULL DEFAULT "");',
									[], myTransactionSuccessCallback,
									myTransactionErrorCallback);
					// alert("create semester table ok.");
					// tx.executeSql('CREATE TABLE foo (id, text)');
				} catch (err) {
					 alert(err);
				}

				// transaction.executeSql('insert into people (name, shirt)
				// VALUES ("Joe", "Green");', [], nullDataHandler,
				// errorHandler);

			}

			);

}
//course name, number, semester, credits, days, time , building, room,profressor, professor email phone
function createClassesTable(db)

{
	//alert("create classes table.");
	db
			.transaction(

			function(transaction) {

				/*
				 * The first query causes the transaction to (intentionally)
				 * fail if the table exists.
				 */
				try {
					var str='CREATE TABLE classes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ';
					str=str+'className TEXT NOT NULL DEFAULT "Class not defined", ';
					str=str+'semesterId INTEGER NOT NULL, ';
					str=str+'credits INTEGER, ';
					str=str+'days TEXT, ';
					str=str+'timeOfClass TEXT, ';
					str=str+'classNumber TEXT, ';
					str=str+'building TEXT, ';
					str=str+'room TEXT, ';
					str=str+'teacher TEXT, ';
					str=str+'teacherEmail TEXT, ';
					str=str+'teacherPhone TEXT);',
					
					transaction
							.executeSql(str,
									[], myTransactionSuccessCallback,
									myTransactionErrorCallback);
					// alert("create semester table ok.");
					// tx.executeSql('CREATE TABLE foo (id, text)');
				} catch (err) {
					alert(err);
				}

				// transaction.executeSql('insert into people (name, shirt)
				// VALUES ("Joe", "Green");', [], nullDataHandler,
				// errorHandler);

			}

			);

}

function createNotesTable(db)

{
	//alert("create notes table.");
	db
			.transaction(

			function(transaction) {
				try {
					var str='CREATE TABLE notes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ';
					str=str+'classId INTEGER NOT NULL , ';
					str=str+'dateCreated TEXT NOT NULL , ';
					str=str+'dateModified TEXT NOT NULL, ';
					str=str+'notes TEXT);',
					
					transaction
							.executeSql(str,
									[], myTransactionSuccessCallback,
									myTransactionErrorCallback);
					// alert("create semester table ok.");
					// tx.executeSql('CREATE TABLE foo (id, text)');
				} catch (err) {
					alert(err);
				}

				// transaction.executeSql('insert into people (name, shirt)
				// VALUES ("Joe", "Green");', [], nullDataHandler,
				// errorHandler);

			}

			);

}


function myTransactionErrorCallback(error)

{

	if (error) {
		//alert('myTransactionErrorCallback.  Error was ' + error.message
			//	+ ' (Code ' + error.code + ')');
	}

}

function myTransactionSuccessCallback()

{

	//alert("J. Doe's shirt is Mauve.");

}

function createSemester(name, session) {

	alert('createSemester() called=' + name);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			id = 1;
			// tx.executeSql('INSERT INTO foo (id, text) VALUES (1,
			// '+semester+')');
			tx.executeSql(
					'INSERT into semester (sname, theSession) VALUES (?, ?);',
					[ name, session ]);
		} catch (err) {
			alert(err);
		}
	});
}

function getAllSemesters(callback) {

	//alert('getAllSemesters() called');
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM semester;', [], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}
function getSemester(semester, callback) {

	//alert('getSemester() called=' + semester);
	var db = initDB();
	var results;
	db.transaction(function(tx) {
		try {
			// tx.executeSql("select * from semester where sname=?;", [ semester
			// ]); // array of values for the ? placeholders
			//alert('getSemester() execute sql=' + semester);
			tx.executeSql('SELECT * FROM semester where sname=?', [ semester ],
					callback, myTransactionErrorCallback);
			//alert('getSemester() execute sql2=' + semester);

		} catch (err) {
			alert(err);
		}
	});
}
function billr(id, callback) {
	//alert('billr()='+id);
}

function getSemesterById(id, callback) {

//	alert('getSemesterById()');
	var db = initDB();
	var results;
	db.transaction(function(tx) {
		try {
			// tx.executeSql("select * from semester where sname=?;", [ semester
			// ]); // array of values for the ? placeholders
			tx.executeSql('SELECT * FROM semester where id=?', [ id ],
					callback, myTransactionErrorCallback);

		} catch (err) {
			alert(err);
		}
	});
	return results;
}
//course name, number, semester, credits, days, time , building, room,profressor, professor email phone

function ClassObject()
{
	//alert("ClassObject");
	this.classNm="";
	this.classNumber=-1;
	this.semesterId=0;
	this.credits=0;
	this.days="";
	this.time="";
	this.building="";
	this.room="";
	this.teacher="";
	this.teacherEmail="";
	this.teacherPhone="";
	this.id="-1";
	
}
function createDBClass(theClass) {

	
	//alert('createDBClass() called=' + theClass);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'INSERT into classes (className, semesterId, credits, days, timeOfClass, building, room, teacher, teacherEmail, teacherPhone, classNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
					[ theClass.classNm, theClass.semesterId, theClass.credits, theClass.days, theClass.time, theClass.building, theClass.room, theClass.teacher, 
					  theClass.teacherEmail, theClass.teacherPhone, theClass.classNumber ]);
		} catch (err) {
			alert(err);
		}
	});
}

function updateDBClass(theClass) {

    //transaction.executeSql("UPDATE people set shirt=? where name=?;",

      //      [ shirt, name ]); // array of values for the ? placeholders
	
//	alert('updateDBClass() called=' + theClass.id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update classes set className=?, semesterId=?, credits=?,  days=?,  timeOfClass=?, building=?, room=?, teacher=?, teacherEmail=?, teacherPhone=?, classNumber = ? where id=?;',
					[ theClass.classNm, theClass.semesterId, theClass.credits, theClass.days, theClass.time, theClass.building, theClass.room, theClass.teacher, 
					  theClass.teacherEmail, theClass.teacherPhone, theClass.classNumber, theClass.id]);
		} catch (err) {
			alert(err);
		}
	});
}

function updateDBClass2(theClass) {

    //transaction.executeSql("UPDATE people set shirt=? where name=?;",

      //      [ shirt, name ]); // array of values for the ? placeholders
	
	//alert('updateDBClass() called=' + theClass.id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update classes set className=? where id=?;',
					[ theClass.classNm, theClass.id]);
		} catch (err) {
			alert(err);
		}
	});
}

function getAllClassesForSemester(semester, callback) {

//	alert('getAllClassesForSemester() called='+semester.id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM classes where semesterId=?;', [semester.id], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getDBClass(classId, callback) {

	
//	alert('getDBClass() called=' + classId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM classes where id=?;', [classId], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getDBClassByName(name, callback) {

	
//	alert('getDBClass() called=' + classId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM classes where className=?;', [name], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}


function storeClass()
{
	
	localStorage.DBClass=results.rows.item(i);
}

function getAllNotesForClass(classId, callback) {

//	alert('getAllNotesForClass() called='+classId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM notes where classId=? order by dateCreated  ;', [classId], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getDBNote(id, callback) {

	
//	alert('getDBNote() called=' + id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM notes where id=?;', [id], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function deleteData() {

	alert('deleteData() called');
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'drop table classes;',
					[ ]);
			tx.executeSql(
					'drop table semester;',
					[ ]);
		} catch (err) {
			alert(err);
		} 
	});
}

function createDBNotes(classId, theNote) {

	theTime=getTime();
	//alert('createDBNotes() called=' + classId+", notes="+theNote+", time="+theTime);
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'INSERT into notes (classId, notes, dateCreated, dateModified) VALUES (?, ?, ?, ?);',
					[ classId, theNote, theDateTime, theDateTime ]);
		} catch (err) {
			alert(err);
		}
	});
}

function getToday()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd < 10)
	{
		dd='0'+dd;
	} 
	
	if(mm<10)
	{
		mm='0'+mm;
	} 
	today = yyyy+""+mm+""+dd;
	
	return today;
}

function getTime()
{
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var timeStr;
	if (minutes < 10)
	{
		minutes = "0" + minutes;
	}
	timeStr=hours + ":" + minutes + " ";
	if(hours > 11)
	{
		timeStr=timeStr+"PM";
	} 
	else 
	{
		timeStr=timeStr+"AM";
	}
	return timeStr;
}




function getDBClass2(id, theCallback) {

	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM classes where id=?;', [id], theCallback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getDBClass3(classId, theCallback) {

	alert("dbclass2="+classId);
	var db = initDB();
	db.transaction(function(tx) {
	   tx.executeSql('SELECT * FROM classes where id = ?', 
	                 [classId],
	                 function(tx, results)
	                 {
		   				//alert("here1="+theCallback);
		   				theCallback(results);
	                 },
	                 function(tx, error)
	                 {
	                	 alert(error);
	                 }
	   );
	});
}

function updateDBNotes(noteId, theNote) {

	//alert("update notes="+noteId);
	theTime=getTime();
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update notes set notes=?, dateModified=? where id=?;',
					[ theNote, theDateTime, noteId ]);
		} catch (err) {
			alert(err);
		}
	});
}

function createQAMasterTable(db)

{
	//alert("create qamaster table.");
	db
			.transaction(

			function(transaction) {
				try {
					var str='CREATE TABLE QAMaster(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ';
					str=str+'classId INTEGER NOT NULL , ';
					str=str+'name INTEGER NOT NULL , ';
					str=str+'dateCreated TEXT NOT NULL , ';
					str=str+'dateModified TEXT NOT NULL);',
					
					transaction
							.executeSql(str,
									[], myTransactionSuccessCallback,
									myTransactionErrorCallback);
					// alert("create semester table ok.");
					// tx.executeSql('CREATE TABLE foo (id, text)');
				} catch (err) {
					alert(err);
				}

				// transaction.executeSql('insert into people (name, shirt)
				// VALUES ("Joe", "Green");', [], nullDataHandler,
				// errorHandler);

			}

			);

}

function createQAMaster(classId, qaMasterName) {

	theTime=getTime();
	//alert('createQAMaster() called=' + classId+", name="+qaMasterName);
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'INSERT into  QAMaster(classId, name, dateCreated, dateModified) VALUES (?, ?, ?, ?);',
					[ classId, qaMasterName, theDateTime, theDateTime ]);
		} catch (err) {
			alert(err);
		}
	});
}

function updateQAMaster(id, name) {

	alert("updateQAMaster="+id+", name="+name);
	theTime=getTime();
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update qamaster set name=?, dateModified=? where id=?;',
					[ name, theDateTime, id ]);
		} catch (err) {
			alert(err);
		}
	});
}


function getQAMasterByName(classId, name, theCallback) {

	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM qamaster where id=? and name=?;', [classId, name], theCallback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getAllQAMastersForClass(classId, callback) {

//	alert('getAllNotesForClass() called='+classId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM qamaster where classId=?;', [classId], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getQAMasterById(qaId, callback) {

    //alert('getQAMasterById() called='+qaId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM qamaster where id=?;', [qaId], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function createQADetailTable(db)

{
	//alert("createQADetail Table.");
	db
			.transaction(

			function(transaction) {
				try {
					var str='CREATE TABLE QADetail(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ';
					str=str+'qaId INTEGER NOT NULL , ';
					str=str+'question TEXT NOT NULL , ';
					str=str+'answer TEXT NOT NULL , ';
					str=str+'timesRun INTEGER NOT NULL , ';
					str=str+'correctCount INTEGER NOT NULL , ';
					str=str+'incorrectCount INTEGER NOT NULL , ';
					str=str+'dateCreated TEXT NOT NULL , ';
					str=str+'dateModified TEXT NOT NULL);',
					
					transaction
							.executeSql(str,
									[], myTransactionSuccessCallback,
									myTransactionErrorCallback);
				} catch (err) {
					alert(err);
				}

			}

			);

}

function createQADetail(qaId, q, a) {

	theTime=getTime();
	//alert('createQADetail() called=' + qaId+", q="+q+", a="+a);
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	count=0;
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'INSERT into  QADetail(qaId, question, answer, timesRun, correctCount, incorrectCount, dateCreated, dateModified) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
					[ qaId, q, a, count, count, count, theDateTime, theDateTime ]);
		} catch (err) {
			alert(err);
		}
	});
}

function getQADetailByMasterId(masterId, callback) {

    //alert('getQADetailByMasterId() called='+masterId);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM qadetail where qaId=?;', [masterId], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function deleteQADetailById(id, callback) {

    //alert('deleteQADetailById() called='+id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('delete FROM qadetail where id=?;', [id], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}

function getQADetailById(id, callback) {

    //alert('getQADetailById() called='+id);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql('SELECT * FROM qadetail where id=?;', [id], callback,
					myTransactionErrorCallback);
		} catch (err) {
			alert(err);
		}
	});
}


function updateDBQaDetail(id, q, a) {

	//alert("update notes="+noteId);
	theTime=getTime();
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update qadetail set question=?, answer=?, dateModified=? where id=?;',
					[ q, a, theDateTime, id ]);
		} catch (err) {
			alert(err);
		}
	});
}

function updateCorrectAnswer(id, count)
{
	//alert("updateCorrectAnswer="+id+", count="+count);
	count=count+1;
	theTime=getTime();
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update qadetail set correctCount=? where id=?;',
					[ count, id ]);
		} catch (err) {
			alert(err);
		}
	});
}
function updateIncorrectAnswer(id, count)
{
	//alert("updateIncorrectAnswer="+id+", count="+count);
	count=count+1;
	theTime=getTime();
	today=getToday();
	theDateTime=today+" "+theTime;
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update qadetail set incorrectCount=? where id=?;',
					[ count, id ]);
		} catch (err) {
			alert(err);
		}
	});
}

function dateFormatter(inDate)
{
	var theDate = new Date();
	year=inDate.substring(0,4);
	month=inDate.substring(4,6);
	month=month-1;
	day=inDate.substring(6,8);
	
	theDate.setFullYear(year);
	theDate.setMonth(month);
	theDate.setDate(day);
	strDate=theDate.toString('dd, MM ,yy');
	
	//alert(strDate);
	
	return strDate;
}

function updateSemester(id, sname)
{
	//alert("updateSemester="+id+", name="+sname);
	var db = initDB();
	db.transaction(function(tx) {
		try {
			tx.executeSql(
					'update semester set sname=? where id=?;',
					[ sname, id ]);
		} catch (err) {
			alert(err);
		}
	});
}