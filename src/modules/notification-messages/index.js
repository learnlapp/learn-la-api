module.exports = {
  student: {
    achievement: {
      headings: '`{ "en": "成就發展解鎖" }`',
      contents: '`{ "en": "已解鎖新成就發展，回來領取你的獎勵！" }`',
      data: { route: 'ProfileAchievementsScreen' },
    },
    //
    //
    matchingLog: {
      invitationMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents: '`{ "en": "${m_from}向你自薦教學，請即回來交換聯絡電話！" }`',
        data: { route: 'ChatScreen' },
      },
      phoneExchangedMsg: {
        headings: '`{ "en": "收到答覆"}`',
        contents:
          '`{ "en": "${m_from}同意與你交換電話進一步溝通，立即回來與他通電！" }`',
        data: { route: 'ChatScreen' },
      },
      requestPhoneMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents:
          '`{ "en": "${m_from}希望與你交換電話進一步溝通，請即回來確認！" }`',
        data: { route: 'ChatScreen' },
      },
      requestVerificationMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents:
          '`{ "en": "${m_from}請你提供${m_verificationType}認證，請即回來提交以便確認個案！" }`',
        data: { route: 'ChatScreen' },
      },
      viewVerificationMsg: {
        headings: '`{ "en": "收到答覆"}`',
        contents:
          '`{ "en": "${m_from}已按你要求，提交${m_verificationType}認證，並經由我們審核通過！立即回來查看！" }`',
        data: { route: 'ChatScreen' },
      },
    },
    //
    //
    verification: {
      approved: {
        headings: '{ en: `收到審核結果` }',
        contents: '`{ en: `${m_verificationType}認證已通過審核。` }`',
        data: { route: 'ProfileVerificationsScreen' },
      },
      rejected: {
        headings: { en: '收到審核結果' },
        contents: {
          en: '`${m_verificationType}認證未能通過審核，請回來重新提交。`',
        },
        data: { route: 'ProfileVerificationsScreen' },
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
    //
    //
    matchingLog: {
      invitationMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents:
          '`{ "en": "${m_from}向你發出教學請求，請即回來交換聯絡電話！" }`',
        data: { route: 'ChatScreen' },
      },
      phoneExchangedMsg: {
        headings: '`{ "en": "收到答覆"}`',
        contents:
          '`{ "en": "${m_from}同意與你交換電話進一步溝通，立即回來與他通電！" }`',
        data: { route: 'ChatScreen' },
      },
      requestPhoneMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents:
          '`{ "en": "${m_from}希望與你交換電話進一步溝通，請即回來確認！" }`',
        data: { route: 'ChatScreen' },
      },
      requestVerificationMsg: {
        headings: '`{ "en": "收到請求"}`',
        contents:
          '`{ "en": "${m_from}請你提供${m_verificationType}認證，請即回來提交以便確認個案！" }`',
        data: { route: 'ChatScreen' },
      },
      viewVerificationMsg: {
        headings: '`{ "en": "收到答覆"}`',
        contents:
          '`{ "en": "${m_from}已按你要求，提交${m_verificationType}認證，並經由我們審核通過！立即回來查看！" }`',
        data: { route: 'ChatScreen' },
      },
    },
    //
    //
    verification: {
      approved: {
        headings: '`{ "en": "收到審核結果" }`',
        contents: '`{ "en": "${m_verificationType}認證已通過審核。" }`',
        data: { route: 'ProfileVerificationsScreen' },
      },
      rejected: {
        headings: { en: '收到審核結果' },
        contents: {
          en: '`${m_verificationType}認證未能通過審核，請回來重新提交。`',
        },
        data: { route: 'ProfileVerificationsScreen' },
      },
    },
  },
};
