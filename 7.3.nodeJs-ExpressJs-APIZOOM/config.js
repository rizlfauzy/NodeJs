const env = 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  production: {
    APIKey: "UNziKiEPTYylh_Cj1b1m2Q",
    APISecret: "92aSQ8YYe36HdwSXdiSdB6Z6P6S6rR6wDA7E",
  },
};

module.exports = config[env]
