// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLAmazon: "https://www.sophosstore.net/callback",
  URLAmazonDev: "http://localhost:4200/callback",
  URLCatalog: "http://localhost:18080",
  URLSecurity: "http://a5131db78474c11eaad3c0ed862d58a0-2137216374.us-east-1.elb.amazonaws.com:13010",
  URLCard: "http://ac092b734463411eaad3c0ed862d58a0-866023728.us-east-1.elb.amazonaws.com:18080",
  URLOrder: "http://abde11fb3463011eaad3c0ed862d58a0-1117631635.us-east-1.elb.amazonaws.com:18080",
  URLPayment: "http://a84e0fb66462a11eaa8f10a0732c80aa-406404051.us-east-1.elb.amazonaws.com:18080",
  URLNotification: "https://rocvv27qe2.execute-api.us-east-2.amazonaws.com",
  endPointCatalog: "/api/products/catalog/",
  endPointDetailProduc: "/api/products/product/",
  endPointReserveProduct: "/api/products/reserve/",
  endPointGenerateToken: "/oauth/token",
  endPointCreateUser: "/user",
  endPointVerifyToken: "/prod/services/security/verifyJwtToken/",
  endPointUpdateCart: "/gestioncarrito/updatecart",
  endPointGetCart: "/prod/gestioncarrito/getcart/",
  endPointGetPayment: "/api/payment/add",
  endPointGetOrder: "/api/orden/add",
  endPointNotification: "/prod/api/sendMail",
  userOauth: "cristian",
  passOauth: "pin",
  errorInyectado: true,
  cantProducts: 5
};
