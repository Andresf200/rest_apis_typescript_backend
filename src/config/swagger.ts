import { SwaggerUiOptions } from './../../node_modules/@types/swagger-ui-express/index.d';
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'Api operations related to products'
            }
        ],
        info: {
            title: 'Rest API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "Api Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const SwaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    /* Oculta el logo original */
    .topbar-wrapper .link {
        display: none;
    }

    .topbar-wrapper .link {
        background-image: url('https://img.icons8.com/?size=100&id=12268&format=png&color=000000');
        background-repeat: no-repeat;
        background-position: left center;
        background-size: contain;
        width: 140px;
        height: 40px;
    }
  `
};
export default swaggerSpec;
export {
    SwaggerUiOptions
}