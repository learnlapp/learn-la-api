module.exports = function isPlatform(platform) {
  return context => {
    if (platform === 'teacher' && context.params.payload.teacherId) {
      return context;
    }

    if (platform === 'student' && context.params.payload.student) {
      return context;
    }
  };
};
