import cors from "cors";

export const crossOrigin = (app) => {
  if (process.env.NODE_ENV === "production") {
    //! Development environment
    app.use(
      cors({
        origin: process.env.CLIENT_DEV_URL,
      }),
    );
  } else {
    //! Production environment
    app.use(
      cors({
        origin: process.env.CLIENT_PROD_URL,
      }),
    );
  }
};
