
var userModel = require('./userModel')

module.exports.getDataFromDBService = () => {
    return new Promise(function checkURL(resolve, reject){
        userModel.find({}, function retturnData(error, result){
            if(error){
                reject(false);
            } else {
                resolve(result);
            }
        });
        
    });
}


// module.exports.createUserDBService = (userDetails) => {
//     return new Promise(function myFn(resolve, reject){
//         var userModelData = new userModel();
//         userModelData.subject = userDetails.subject,
//         userModelData.question = userDetails.question,
//         userModelData.options = userDetails.options,
//         userModelData.correct_option = userDetails.correct_option,
//         userModelData.difficulty_level = userDetails.difficulty_level

//         userModelData.save(function resultHandle(error, result){
//             if(error){
//                 reject(false);
//             } else {
//                 resolve(result);
//             }
//         });
//     });

// }

// module.exports.createUserDBService = (userDetails) => {
//     return new Promise(function myFn(resolve, reject){
//         // Check if userDetails is undefined or null
//         if (!userDetails) {
//             reject(false);
//             return;
//         }

//         // Check if the required properties exist in userDetails
//         if (!userDetails.subject ||
//             !userDetails.question ||
//             !userDetails.options ||
//             !userDetails.correct_option ||
//             !userDetails.difficulty_level) {
//             reject(false);
//             return;
//         }

//         // If no errors, proceed with creating and saving userModelData
//         var userModelData = new userModel();
//         userModelData.subject = userDetails.subject;
//         userModelData.question = userDetails.question;
//         userModelData.options = userDetails.options;
//         userModelData.correct_option = userDetails.correct_option;
//         userModelData.difficulty_level = userDetails.difficulty_level;

//         userModelData.save(function resultHandle(error, result){
//             if(error){
//                 reject(false);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }

module.exports.createUserDBService = (userDetails) => {
    return new Promise(function myFn(resolve, reject){
        // Check if userDetails is undefined or null
        if (!userDetails) {
            reject('userDetails is undefined or null');
            return;
        }

        // Check if the required properties exist in userDetails
        if (!userDetails.subject ||
            !userDetails.question ||
            !userDetails.options ||
            !userDetails.correct_option ||
            !userDetails.difficulty_level) {
            reject('Missing required properties in userDetails');
            return;
        }

        // If no errors, proceed with creating and saving userModelData
        var userModelData = new userModel();
        userModelData.subject = userDetails.subject;
        userModelData.question = userDetails.question;
        userModelData.options = userDetails.options;
        userModelData.correct_option = userDetails.correct_option;
        userModelData.difficulty_level = userDetails.difficulty_level;

        userModelData.save(function resultHandle(error, result){
            if(error){
                reject(error); // Reject with the error message
            } else {
                resolve(result);
            }
        });
    }).catch(error => {
        // Handle the rejection here
        console.error('Error in createUserDBService:', error);
        throw error; // Re-throw the error to maintain the unhandled promise rejection
    });
}

