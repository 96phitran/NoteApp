const dev = {
  s3: {
    REGION: "ap-southeast-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-13il53n0oquxw"
  },
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "https://u62qrcsi3h.execute-api.ap-southeast-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_cbToCpTgR",
    APP_CLIENT_ID: "1vlpc1e260fcuoi3hl62cnajgn",
    IDENTITY_POOL_ID: "ap-southeast-1:563fe8c2-d6b0-4bce-ac8c-2bf1e1170b99"
  }
};

const prod = {
  s3: {
    REGION: "ap-southeast-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1l6xjhjazfxx7"
  },
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "https://qy1cz1hfpk.execute-api.ap-southeast-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_tRFOUstPI",
    APP_CLIENT_ID: "7rk6t7onhuf7o955st8qpr1r5a",
    IDENTITY_POOL_ID: "ap-southeast-1:d60c938e-f2a4-4e36-8466-23d5fc02ef76"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};