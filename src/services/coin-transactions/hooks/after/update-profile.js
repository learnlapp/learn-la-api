module.exports = function updateProfile() {
  return async context => {
    const { type, amount, ownerType, studentId, teacherId } = context.result;
    console.log('hi');

    if (type === 'in' && ownerType === 'student') {
      context.app
        .service('students')
        .patch(studentId, { $inc: { coin: amount } });
      return context;
    }

    if (type === 'in' && ownerType === 'teacher') {
      context.app
        .service('teachers')
        .patch(teacherId, { $inc: { coin: amount } });
      return context;
    }

    if (type === 'out' && ownerType === 'student') {
      context.app
        .service('students')
        .patch(studentId, { $inc: { coin: -amount } });
      return context;
    }

    if (type === 'out' && ownerType === 'teacher') {
      context.app
        .service('teachers')
        .patch(teacherId, { $inc: { coin: -amount } });
      return context;
    }
  };
};
