var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const cors = require("cors");
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    user: Employee
    organization : Organization
}
type Employee {
    name : String
    age : Int
    address : Address
    organization : Organization
}
type Organization {
    name : String
}
type Address {
    country : String
    city : String
    pin : Int
  }
`);

// Can be refactor by taking out dependecy (like address) out
// address can be resolver or can be a function
var graphQLResolver = {
  user: () => {
    return {
      name: "Ravi",
      age: 29,
      address: graphQLResolver.address,
      organization: graphQLResolver.organization
    };
  },
  organization: () => {
    return {
      name: "xyz"
    };
  },
  address: () => {
    return {
      country: () => {
        return "Netherlands";
      },
      city: () => {
        return "Amsterdam";
      },
      pin: () => {
        return 1881;
      }
    };
  }
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: graphQLResolver,
    graphiql: true
  })
);

var port = process.env.PORT || 3000;
app.listen(port);
console.log(
  "Running a GraphQL API server at http://localhost:" + port + "/graphql"
);
