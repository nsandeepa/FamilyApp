const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.taskCreatedNotification = functions.database.ref("/tasks/{taskId}").onCreate((userRecord, context)=> {
    const adminEmail = userRecord.toJSON().adminEmail;
    const adminNotificationTokenPromise = admin.database().ref("/admins").orderByChild("email").equalTo(adminEmail).once('value');
    return Promise.all([adminNotificationTokenPromise])
        .then((result)=> {
            const valueObject = result[0].val();
            const key = Object.keys(valueObject);
            const adminNotificationToken = valueObject[key].notificationToken;
            const message = {
                notification: {
                    title: 'FamilyApp',
                    body: 'New task has been created!',
                },
                android: {
                    ttl: 3600 * 1000,
                    notification: {
                        color: '#ff812d',
                        sound: 'default',
                    },
                },
                token: adminNotificationToken
            };
            return admin.messaging().send(message);
    });
});
exports.taskAssignedNotification = functions.database.ref("/tasks/{taskId}").onUpdate((change, context)=> {
    const beforeAssignedVal = change.before.toJSON().isAssigned;
    const afterAssignedVal = change.after.toJSON().isAssigned;
    if(!beforeAssignedVal && afterAssignedVal) {
        const assignedUserEmail = change.after.toJSON().assignedTo;
        const assignedUserNotificationTokenPromise = admin.database().ref("/users").orderByChild("emaiil").equalTo(assignedUserEmail).once('value');
        return Promise.all([assignedUserNotificationTokenPromise])
            .then((result)=> {
                const valueObject = result[0].val();
                const key = Object.keys(valueObject);
                const assignedUserNotificationToken = valueObject[key].notificationToken;
                const message = {
                    notification: {
                        title: 'FamilyApp',
                        body: 'You have a new task!',
                    },
                    android: {
                        ttl: 3600 * 1000,
                        notification: {
                            color: '#ff812d',
                            sound: 'default',
                        },
                    },
                    token: assignedUserNotificationToken
                };
                return admin.messaging().send(message);
            });
    } else {
        return Promise.resolve();
    }
});