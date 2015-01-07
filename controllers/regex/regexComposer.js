var firstName = '',
    middleName = '',
    lastName = '';
var names;
var firstAndMiddle;

var arrangedByLast = new RegExp("[a-z]+,\\s*[a-z]+", "gi");

exports.parse = function(name){
    if(name.match(arrangedByLast)){
        names = name.split(',');
        firstAndMiddle = names[1].trim().split(' ');
        lastName = names[0];
        firstName = firstAndMiddle.splice(0,1);
        middleName = firstAndMiddle.join(' ');

    } else {
        names = name.split(' ');
        firstName = names.splice(0,1);
        lastName = names.splice(names.length,1);
        middleName = names.join(' ');
    }

    return {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        fullName: firstName + ' ' + middleName + ' ' + lastName
    };
};