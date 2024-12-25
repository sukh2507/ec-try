import cron from "node-cron";
import User from "../models/userModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";
import dotenv from "dotenv";

dotenv.config();
cron.schedule(process.env.CRON_TIME, async () => {
  try {
    const now = new Date();

    //! Find Unverified Users
    const unverifiedUsers = await User.find({
      verificationTokenExpires: { $lt: now },
    });

    if (unverifiedUsers.length > 0) {
      const unverifiedUserIds = unverifiedUsers.map((user) => user._id);

      //! Delete Unverified Users
      const deleteUnverifiedUsers = await User.deleteMany({
        _id: { $in: unverifiedUserIds },
      });
      console.log(
        `Deleted ${deleteUnverifiedUsers.deletedCount} unverified users.`,
      );

      //! Delete Associated Teachers
      const deleteAssociatedTeachers = await Teacher.deleteMany({
        userId: { $in: unverifiedUserIds },
      });
      console.log(
        `Deleted ${deleteAssociatedTeachers.deletedCount} associated teachers.`,
      );

      //! Delete Associated Students
      const deleteAssociatedStudents = await Student.deleteMany({
        userId: { $in: unverifiedUserIds },
      });
      console.log(
        `Deleted ${deleteAssociatedStudents.deletedCount} associated students.`,
      );
    } else {
      console.log("No unverified users to delete.");
    }

    //! Update Unverified Change Email Requests
    const updateUnverifiedChangeEmails = await User.updateMany(
      { newEmailExpires: { $lt: now } },
      { $unset: { newEmail: 1, newEmailExpires: 1, newEmailToken: 1 } },
    );
    if (updateUnverifiedChangeEmails.modifiedCount > 0) {
      console.log(
        `Updated ${updateUnverifiedChangeEmails.modifiedCount} uncompleted change email requests.`,
      );
    } else {
      console.log("No uncompleted change email requests to update.");
    }

    //! Update Unverified Change Password Requests
    const updateUnverifiedChangePwds = await User.updateMany(
      { forgetPasswordExpires: { $lt: now } },
      { $unset: { forgetPasswordExpires: 1, forgetPasswordToken: 1 } },
    );
    if (updateUnverifiedChangePwds.modifiedCount > 0) {
      console.log(
        `Updated ${updateUnverifiedChangePwds.modifiedCount} uncompleted change password requests.`,
      );
    } else {
      console.log("No uncompleted change password requests to update.");
    }
  } catch (error) {
    console.error("Error in Cleanup Job:", error);
  }
});
