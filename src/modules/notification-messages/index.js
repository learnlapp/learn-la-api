module.exports = {
  student: {
    achievement: {
      headings: '`{ "en": "成就發展解鎖" }`',
      contents: '`{ "en": "已解鎖新成就發展，回來領取你的獎勵！" }`',
      data: { route: 'ProfileAchievementsScreen' },
    },
    matchingLog: {},
    verification: {
      approved: {
        headings: '{ en: `收到審核結果` }',
        contents: '`{ en: `${m_verificationType}認證已通過審核。` }`',
        data: {},
      },
      rejected: {
        headings: { en: '收到審核結果' },
        contents: {
          en: '`${m_verificationType}認證未能通過審核，請回來重新提交。`',
        },
        data: {},
      },
    },
  },
  //
  //
  //
  //
  //
  teacher: {
    achievement: {
      headings: '`{ "en": "成就發展解鎖" }`',
      contents: '`{ "en": "已解鎖新成就發展，回來領取你的獎勵！" }`',
      data: { route: 'ProfileAchievementsScreen' },
    },
    matchingLog: {},
    verification: {
      approved: {
        headings: '`{ "en": "收到審核結果" }`',
        contents: '`{ "en": "${m_verificationType}認證已通過審核。" }`',
        data: {},
      },
      rejected: {
        headings: { en: '收到審核結果' },
        contents: {
          en: '`${m_verificationType}認證未能通過審核，請回來重新提交。`',
        },
        data: {},
      },
    },
  },
};
